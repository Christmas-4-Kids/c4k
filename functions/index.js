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

admin.initializeApp()

// TWILIO: send user their verification code
exports.verifyNumber = functions.https.onCall(async (phoneNumber, context) => {
  const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
  twilioClient.verify
    .services(process.env.TWILIO_SERVICESID)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      console.log('verified user phone', verification)
      return verification
    })
    .catch((err) => {
      console.log(err)
    })
})

// TWILIO: verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
  return twilioClient.verify
    .services(process.env.TWILIO_SERVICESID)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then((data) => {
      console.log('verified user code', data)
      return data.status
    })
    .catch((err) => {
      console.log(err)
    })
})

exports.checkIfRegistered = functions.https.onCall(async (email, context) => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: process.env.MAILCHIMP_SERVER,
  })
  const allDayChaperonesListId = process.env.MAILCHIMP_ALLDAYCHAPERONESLISTID
  const driversListId = process.env.MAILCHIMP_DRIVERSLISTID
  const eveningChaperonesListId = process.env.MAILCHIMP_EVENINGCHAPERONESLISTID
  const lebanonChaperonesListId = process.env.MAILCHIMP_LEBANONCHAPERONESLISTID
  const sundayChaperonesListId = process.env.MAILCHIMP_SUNDAYCHAPERONESLISTID
  const memberListIds = [allDayChaperonesListId, driversListId, eveningChaperonesListId, lebanonChaperonesListId, sundayChaperonesListId]

  const response = await mailchimp.searchMembers.search(email)
  let mailchimpMember = response?.exact_matches?.members.find((member) => memberListIds.includes(member.list_id))
  if (email.toLowerCase() === "c4kchaperones@gmail.com") {
    return response?.exact_matches?.members[0]
  }
  return mailchimpMember
})

exports.createMailchimpUserInFirestore = functions.region("us-central1").https.onCall(async (mailchimpMember, context) => {
  const volunteer = createVolunteer(mailchimpMember)
  let documentRef = admin.firestore().doc("volunteers/" + mailchimpMember.id)
  return documentRef
    .set(volunteer)
    .then((res) => {
      return { user: volunteer }
    })
    .catch((err) => {
      return { error: `Failed to create document: ${err}` }
    })
})

exports.fetchRules = functions.https.onCall(async () => {
  let rules = []
  await firestore
    .collection("rules")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        rules.push(doc.data())
      })
    })
  return rules
})

exports.textVolunteers = functions.https.onCall(async ({ checkedIn, refId }) => {
  await firestore.collection("volunteers")
    .get()
    .then((querySnapshot) => {
      const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
      twilioClient.messages
        .create({
          body: 'Sending text to volunteers: ' + querySnapshot.length,
          from: '+16158821980',
          to: '+16063444079'
        })
        .then(message => console.log(`sent nudge to self`, message.sid))
        .done()
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const volunteer = doc.date()
        if (!volunteer.checkedIn) {
          // send text
          twilioClient.messages
            .create({
              body: 'If you were having issues logging in, please try again now.',
              from: '+16158821980',
              to: '+1' + volunteer.phoneNumber.replace(/\D/g, "")
            })
            .then(message => console.log(`sent nudge to ${volunteer.phoneNumber}`, message.sid))
            .done()
        }
      })
    })
})

exports.updateVolunteerCheckedIn = functions.https.onCall(async ({ checkedIn, refId }) => {
  await firestore.collection("volunteers").doc(refId).update({
    checkedIn: checkedIn,
  })
})

exports.syncMailchimpVolunteers = functions.https.onCall(async () => {
  try {
    await syncVolunteersFromMailchimp()
  } catch (err) {
    console.log("Something went wrong syncing mailchimp volunteers", err)
  }
})

//retrieve schedule from firestore
exports.fetchSchedule = functions.https.onCall(async () => {
  let events = []
  await firestore
    .collection("schedule")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data())
      })
    })
  return events
})

exports.scheduledFunction = functions.pubsub.schedule("every 5 minutes").onRun(async (context) => {
  try {
    await syncVolunteersFromMailchimp()
  } catch (err) {
    console.log("Something went wrong syncing mailchimp volunteers")
  }
})

const syncVolunteersFromMailchimp = async () => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: process.env.MAILCHIMP_SERVER,
  })

  const mailchimpVolunteers = new Map()
  const mapMailchimpVolunteers = (volunteers) => {
    for (const volunteer of volunteers) {
      mailchimpVolunteers.set(volunteer.id, volunteer)
    }
  }
  // get all mailchimp users for all 4 list ids
  try {
    const opts = { count: 1000 }
    const { members: allDayList } = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_ALLDAYCHAPERONESLISTID, opts)
    console.log(`got ${allDayList.length} all day chaps`)
    mapMailchimpVolunteers(allDayList)
    const { members: eveningList } = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_EVENINGCHAPERONESLISTID, opts)
    console.log(`got ${eveningList.length} evening chaps`)
    mapMailchimpVolunteers(eveningList)
    const { members: lebanonList } = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_LEBANONCHAPERONESLISTID, opts)
    console.log(`got ${lebanonList.length} lebanon chaps`)
    mapMailchimpVolunteers(lebanonList)
    const { members: sundayList } = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_SUNDAYCHAPERONESLISTID, opts)
    console.log(`got ${sundayList.length} sunday chaps`)
    mapMailchimpVolunteers(sundayList)
    const { members: driversList } = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_DRIVERSLISTID, opts)
    console.log(`got ${driversList.length} drivers`)
    mapMailchimpVolunteers(driversList)
  } catch (err) {
    console.log("Failed to fetch mailchimp list(s)", err)
  }

  // get all volunteers in firebase
  let firebaseVolunteers = new Map()
  await firestore
    .collection("volunteers")
    .get()
    .then((querySnapshot) => {
      console.log(`found ${querySnapshot.length} volunteers`)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const volunteer = doc.data()
        firebaseVolunteers.set(volunteer.id, volunteer)
      })
    })
    .catch((err) => {
      console.log(err)
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
    documentRef.set(volunteer).then((res) => {
      console.log('set volunteer', volunteer)
    }).catch((err) => {
      return { error: `Failed to create document: ${err}` }
    })
  }
}

const getVolunteerType = (mailchimpMember) => {
  const listId = mailchimpMember.list_id
  if (listId === process.env.MAILCHIMP_ALLDAYCHAPERONESLISTID) {
    return "2023_ALL_DAY_CHAPERONE"
  } else if (listId === process.env.MAILCHIMP_EVENINGCHAPERONESLISTID) {
    return "2023_EVENING_CHAPERONE"
  } else if (listId === process.env.MAILCHIMP_LEBANONCHAPERONESLISTID) {
    return "2023_LEBANON_CHAPERONE"
  } else if (listId === process.env.MAILCHIMP_SUNDAYCHAPERONESLISTID) {
    return "2023_SUNDAY_CHAPERONE"
  } else if (listId === process.env.MAILCHIMP_DRIVERSLISTID) {
    return "2023_DRIVER"
  } else {
    if (mailchimpMember.email_address.toLowerCase() === "c4kchaperones@gmail.com") {
      return "2023_ADMIN"
    }
    return "2023_INVALID"
  }
}

const createVolunteer = (mailchimpMember) => {
  const isMedical = (medicalField) => {
    if (!!medicalField && medicalField !== "None") {
      return medicalField
    }
    return "None"
  }
  const volunteer = {
    checkedIn: false,
    volunteerType: getVolunteerType(mailchimpMember),
    volunteerYear: "2023",
    driversLicense: mailchimpMember.merge_fields.DLNUMBER ?? "",
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
    medical: isMedical(mailchimpMember.merge_fields.MEDICAL),
    mailchimpMemberInfo: mailchimpMember,
  }
  return volunteer
}
