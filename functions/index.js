const functions = require("firebase-functions")
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// TODO: Integrating mailchimp API called from SignIn screen

const mailchimp = require("mailchimp-marketing");
const twilio = require("twilio");

//will need to run firebase functions:config:set mailchimp.key="MAILCHIMP_API_KEY" mailchimp.server="SERVER_PREFIX" 
mailchimp.setConfig({
    // use functions.config().mailchimp.apikey to grab and replace "YOUR_API_KEY"
    apiKey: "YOUR_API_KEY",
    server: "YOUR_SERVER_PREFIX",
});
const mailchimpServer = functions.config().mailchimp.server
const mailchimpBaseURL = `https://${mailchimpServer}.api.mailchimp.com/3.0/`

export const getMailchimpList = async () => {
  //TODO: need list_id
    const response = await mailchimp.lists.getListMembersInfo("list_id");
  console.log(response);
//   return response
};
