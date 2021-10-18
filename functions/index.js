const functions = require("firebase-functions")
const admin = require("firebase-admin")
const mailchimp = require("@mailchimp/mailchimp_marketing")
const twilio = require("twilio")
const Firestore = require("@google-cloud/firestore")
const PROJECTID = "c4k-events"
const COLLECTION_NAME = "rules"

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
})

admin.initializeApp(functions.config().firebase)

// mailchimp constants
const mailchimpServer = functions.config().mailchimp.server
const mailchimpApiKey = functions.config().mailchimp.key
const currentListId = functions.config().mailchimp.currentlistid
mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServer,
})

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
    .then((verification) => {
      return verification
    })
})

// TWILIO: verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  return twilioClient.verify
    .services(serviceSid)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then((data) => {
      return data.status
    })
})

exports.checkIfRegistered = functions.https.onCall(async (email, context) => {
  const response = await mailchimp.searchMembers.search(email)
  const mailchimpMember = response?.exact_matches?.members.find(
    (member) => member.list_id === currentListId
  )
  return mailchimpMember
})

exports.createMailchimpUserInFirestore = functions.https.onCall(
  async (mailchimpMember, context) => {
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
  }
)

exports.fetchRules = functions.https.onCall(async () => {
  let rules = []
  await firestore
    .collection(COLLECTION_NAME)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        rules.push(doc.data())
      })
    })
  return rules
})

const createVolunteer = (mailchimpMember) => {
  const volunteer = {
    checkedIn: false,
    volunteerType: mailchimpMember.list_id,
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
