const functions = require("firebase-functions")
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// TODO: Integrating mailchimp API called from SignIn screen

const mailchimp = require("mailchimp-marketing");
const twilio = require("twilio");
/*
//will need to run firebase functions:config:set mailchimp.key="MAILCHIMP_API_KEY" mailchimp.server="SERVER_PREFIX"
client.setConfig({
    // use functions.config().mailchimp.key to grab and replace "YOUR_API_KEY"
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});

const run = async () => {
  const response = await client.lists.getListMembersInfo("list_id");
  console.log(response);
};

run();
*/
