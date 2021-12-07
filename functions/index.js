const functions = require("firebase-functions")
const admin = require("firebase-admin")
const mailchimp = require("@mailchimp/mailchimp_marketing")
const twilio = require("twilio")
const Firestore = require("@google-cloud/firestore")
const PROJECTID = "c4k-events"

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
})

admin.initializeApp(functions.config().firebase)

// mailchimp constants
const mailchimpServer = functions.config().mailchimp.server
const mailchimpApiKey = functions.config().mailchimp.key
const allDayChaperonesListId = functions.config().mailchimp.alldaychaperoneslistid
const driversListId = functions.config().mailchimp.driverslistid
const eveningChaperonesListId = functions.config().mailchimp.eveningchaperoneslistid
const lebanonChaperonesListId = functions.config().mailchimp.lebanonchaperoneslistid
mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServer,
})
const memberListIds = [allDayChaperonesListId, driversListId, eveningChaperonesListId, lebanonChaperonesListId]

// twilio constants
const accountSid = functions.config().twilio.sid
const authToken = functions.config().twilio.token
const serviceSid = functions.config().twilio.servicesid
const twilioClient = new twilio(accountSid, authToken)

// TWILIO: send user their verification code
exports.verifyNumber = functions.https.onCall(async (phoneNumber, context) => {
  twilioClient.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then(verification => {
      return verification
    })
})

// TWILIO: verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  return twilioClient.verify
    .services(serviceSid)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then(data => {
      return data.status
    })
})

exports.checkIfRegistered = functions.https.onCall(async (email, context) => {
  const response = await mailchimp.searchMembers.search(email)
  let mailchimpMember = response?.exact_matches?.members.find(member => memberListIds.includes(member.list_id))
  if (email.toLowerCase() === "c4kchaperones@gmail.com") {
    return response?.exact_matches?.members[0]
  }
  return mailchimpMember
})

exports.createMailchimpUserInFirestore = functions.region("us-central1").https.onCall(async (mailchimpMember, context) => {
  const volunteer = createVolunteer(mailchimpMember)
  console.log("volunteer", volunteer)
  let documentRef = admin.firestore().doc("volunteers/" + mailchimpMember.id)
  console.log(`documentRef`, documentRef)
  return documentRef
    .set(volunteer)
    .then(res => {
      return { user: volunteer }
    })
    .catch(err => {
      return { error: `Failed to create document: ${err}` }
    })
})

exports.fetchRules = functions.https.onCall(async () => {
  let rules = []
  await firestore
    .collection("rules")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        rules.push(doc.data())
      })
    })
  return rules
})

exports.syncMailchimpVolunteers = functions.https.onCall(async () => {
  const mailchimpVolunteers = new Map()
  const mapMailchimpVolunteers = volunteers => {
    for (const volunteer of volunteers) {
      mailchimpVolunteers.set(volunteer.id, volunteer)
    }
  }
  // get all mailchimp users for all 4 list ids
  const opts = { count: 1000 }
  const allDayList = await mailchimp.lists.getListMembersInfo(allDayChaperonesListId, opts)
  mapMailchimpVolunteers(allDayList)
  const eveningList = await mailchimp.lists.getListMembersInfo(eveningChaperonesListId, opts)
  mapMailchimpVolunteers(eveningList)
  const lebanonList = await mailchimp.lists.getListMembersInfo(lebanonChaperonesListId, opts)
  mapMailchimpVolunteers(lebanonList)
  const driversList = await mailchimp.lists.getListMembersInfo(driversListId, opts)
  mapMailchimpVolunteers(driversList)

  // get all volunteers in firebase
  let firebaseVolunteers = new Map()
  await firestore
    .collection("volunteers")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const volunteer = doc.data()
        firebaseVolunteers.set(volunteer.id, volunteer)
      })
    })

  // if mailchimp user is not in list of volunteers then create user
  let membersInMailchimpNotInFirebase = []
  for (const [key, value] of mailchimpVolunteers) {
    const firebaseVolunteer = firebaseVolunteers.get(key)
    if (!firebaseVolunteer) {
      membersInMailchimpNotInFirebase.push(value)
    }
  }

  for (const member of membersInMailchimpNotInFirebase) {
    const volunteer = createVolunteer(member)
    let documentRef = admin.firestore().doc("volunteers/" + member.id)
    documentRef.set(volunteer).catch(err => {
      return { error: `Failed to create document: ${err}` }
    })
  }
})

const getVolunteerType = mailchimpMember => {
  const listId = mailchimpMember.list_id
  if (listId === allDayChaperonesListId) {
    return "2021_ALL_DAY_CHAPERONE"
  } else if (listId === eveningChaperonesListId) {
    return "2021_EVENING_CHAPERONE"
  } else if (listId === lebanonChaperonesListId) {
    return "2021_LEBANON_CHAPERONE"
  } else if (listId === driversListId) {
    return "2021_DRIVER"
  } else {
    if (mailchimpMember.email_address.toLowerCase() === "c4kchaperones@gmail.com") {
      return "2021_ADMIN"
    }
    return "2021_INVALID"
  }
}

const createVolunteer = mailchimpMember => {
  const volunteer = {
    checkedIn: false,
    volunteerType: getVolunteerType(mailchimpMember),
    driversLicense: "",
    email: mailchimpMember.email_address,
    emailLower: mailchimpMember.email_address.toLowerCase(),
    firstName: mailchimpMember.merge_fields.FNAME,
    lastName: mailchimpMember.merge_fields.LNAME,
    lastNameLower: mailchimpMember.merge_fields.LNAME.toLowerCase(),
    lastUpdated: new Date().toLocaleString(),
    mailchimpMemberId: mailchimpMember.id,
    phoneNumber: mailchimpMember.merge_fields.PHONE,
    spanish: mailchimpMember.merge_fields.ESPANOL ?? "",
    verified: false,
    medical: mailchimpMember.merge_fields.MEDICAL ?? "",
    mailchimpMemberInfo: mailchimpMember,
  }
  return volunteer
}
