const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const twilio = require("twilio");
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = new twilio(accountSid, authToken);

//send user their verification code
exports.verifyNumber = functions.https.onCall(async (data, context) => {
  client.verify
    .services("VA21d1dc82e23ec460e2917460dccb242f")
    .verifications.create({ to: data, channel: "sms" })
    .then((verification) => {
      return verification;
    });
});

//verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  //I can't make this promise return properly
  return client.verify
    .services("VA21d1dc82e23ec460e2917460dccb242f")
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then((data) => {
      console.log(data.status);
      return data.status;
    });
});
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

export const getMailchimpList = async () => {
  //TODO: need list_id
  const response = await mailchimp.lists.getListMembersInfo("list_id");
  console.log(response);
  //   return response
};
*/
