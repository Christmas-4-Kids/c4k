const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)

const twilio = require("twilio")
const accountSid = functions.config().twilio.sid
const authToken = functions.config().twilio.token
const serviceSid = functions.config().twilio.servicesid

const twilioClient = new twilio(accountSid, authToken)

//send user their verification code
exports.verifyNumber = functions.https.onCall(async (phoneNumber, context) => {
  console.log(phoneNumber)
  twilioClient.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then(verification => {
      return verification
    })
})

//verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  //I can't make this promise return properly
  return twilioClient.verify
    .services(serviceSid)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then(data => {
      return data.status
    })
})
/*
// TODO: Integrating mailchimp API called from SignIn screen

const mailchimp = require("mailchimp-marketing");

//will need to run firebase functions:config:set mailchimp.key="MAILCHIMP_API_KEY" mailchimp.server="SERVER_PREFIX"
mailchimp.setConfig({
  // use functions.config().mailchimp.apikey to grab and replace "YOUR_API_KEY"
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});
const mailchimpServer = functions.config().mailchimp.server;
const mailchimpBaseURL = `https://${mailchimpServer}.api.mailchimp.com/3.0/`;

const getMailchimpList = async () => {
  //TODO: need list_id
  const response = await mailchimp.lists.getListMembersInfo("list_id");
  console.log(response);
  //   return response
};
*/
