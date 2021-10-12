const functions = require("firebase-functions")
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const mailchimp = require('@mailchimp/mailchimp_marketing');



mailchimp.setConfig({
    apiKey: functions.config().mailchimp.apikey,
    server: functions.config().mailchimp.server
});
// const mailchimpServer = functions.config().mailchimp.server
// const mailchimpBaseURL = `https://${mailchimpServer}.api.mailchimp.com/3.0/`

const getMailchimpList = async () => {
  //TODO: need list_id
    const response = await mailchimp.lists.getListMembersInfo("6711fa8de4", {fields: ['members.merge_fields']});
    console.log(response);


  return response
};

exports.checkIfRegistered = functions.https.onCall(async (data, context) => {
    const list = await getMailchimpList()
    const userRegistered = list.filter(member => data.phoneNumber === member.merge_fields.PHONE)
    return userRegistered.length ? true : false
})