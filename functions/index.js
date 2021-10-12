const functions = require("firebase-functions")
const admin = require("firebase-admin")
const mailchimp = require("@mailchimp/mailchimp_marketing")
const twilio = require("twilio")

admin.initializeApp(functions.config().firebase)

// mailchimp constants
const mailchimpServer = functions.config().mailchimp.server
const mailchimpApiKey = functions.config().mailchimp.apikey
mailchimp.setConfig({
  // use functions.config().mailchimp.apikey to grab and replace "YOUR_API_KEY"
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
  console.log(phoneNumber)
  twilioClient.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then(verification => {
      return verification
    })
})

// TWILIO: verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  //I can't make this promise return properly
  return twilioClient.verify
    .services(serviceSid)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then(data => {
      return data.status
    })
})

exports.checkIfRegistered = functions.https.onCall(async (phoneNumber, context) => {
  const listId = ""
  const response = await mailchimp.lists.getListMembersInfo(listId)
  // TODO: find the user with the phoneNumber
  const mailchimpUser = response.filter(member => phoneNumber === member.merge_fields.phone)
  return mailchimpUser
})

// TODO: build out this method
exports.createMailchimpUserInFirestore = functions.https.onCall(async (mailchimpMember, context) => {})
