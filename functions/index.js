const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const twilio = require("twilio");
const Firestore = require("@google-cloud/firestore");
const PROJECTID = "c4k-events";

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

admin.initializeApp(functions.config().firebase);

// mailchimp constants
const mailchimpServer = functions.config().mailchimp.server;
const mailchimpApiKey = functions.config().mailchimp.key;
const allDayChaperonesListId = functions.config().mailchimp.alldaychaperoneslistid;
const driversListId = functions.config().mailchimp.driverslistid;
const eveningChaperonesListId = functions.config().mailchimp.eveningchaperoneslistid;
const lebanonChaperonesListId = functions.config().mailchimp.lebanonchaperoneslistid;
mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServer,
});
const memberListIds = [allDayChaperonesListId, driversListId, eveningChaperonesListId, lebanonChaperonesListId];

// twilio constants
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const serviceSid = functions.config().twilio.servicesid;
const twilioClient = new twilio(accountSid, authToken);

// TWILIO: send user their verification code
exports.verifyNumber = functions.https.onCall(async (phoneNumber, context) => {
  twilioClient.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      return verification;
    })
    .catch((err) => {
      console.log(err);
    });
});

// TWILIO: verify user's code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  return twilioClient.verify
    .services(serviceSid)
    .verificationChecks.create({ to: data.phoneNumber, code: data.code })
    .then((data) => {
      return data.status;
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.checkIfRegistered = functions.https.onCall(async (email, context) => {
  const response = await mailchimp.searchMembers.search(email);
  let mailchimpMember = response?.exact_matches?.members.find((member) => memberListIds.includes(member.list_id));
  if (email.toLowerCase() === "c4kchaperones@gmail.com") {
    return response?.exact_matches?.members[0];
  }
  return mailchimpMember;
});

exports.createMailchimpUserInFirestore = functions.region("us-central1").https.onCall(async (mailchimpMember, context) => {
  const volunteer = createVolunteer(mailchimpMember);
  let documentRef = admin.firestore().doc("volunteers/" + mailchimpMember.id);
  return documentRef
    .set(volunteer)
    .then((res) => {
      return { user: volunteer };
    })
    .catch((err) => {
      return { error: `Failed to create document: ${err}` };
    });
});

exports.fetchRules = functions.https.onCall(async () => {
  let rules = [];
  await firestore
    .collection("rules")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        rules.push(doc.data());
      });
    });
  return rules;
});

exports.updateVolunteerCheckedIn = functions.https.onCall(async ({ checkedIn, refId }) => {
  await firestore.collection("volunteers").doc(refId).update({
    checkedIn: checkedIn,
  });
});

exports.syncMailchimpVolunteers = functions.https.onCall(async () => {
  const mailchimpVolunteers = new Map();
  const mapMailchimpVolunteers = (volunteers) => {
    for (const volunteer of volunteers) {
      mailchimpVolunteers.set(volunteer.id, volunteer);
    }
  };
  // get all mailchimp users for all 4 list ids
  const opts = { count: 1000 };
  const { members: allDayList } = await mailchimp.lists.getListMembersInfo(allDayChaperonesListId, opts);
  mapMailchimpVolunteers(allDayList);
  const { members: eveningList } = await mailchimp.lists.getListMembersInfo(eveningChaperonesListId, opts);
  mapMailchimpVolunteers(eveningList);
  const { members: lebanonList } = await mailchimp.lists.getListMembersInfo(lebanonChaperonesListId, opts);
  mapMailchimpVolunteers(lebanonList);
  const { members: driversList } = await mailchimp.lists.getListMembersInfo(driversListId, opts);
  mapMailchimpVolunteers(driversList);

  // get all volunteers in firebase
  let firebaseVolunteers = new Map();
  await firestore
    .collection("volunteers")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const volunteer = doc.data();
        firebaseVolunteers.set(volunteer.id, volunteer);
      });
    });

  // if mailchimp user is not in list of volunteers then create user
  let membersInMailchimpNotInFirebase = [];
  for (const [key, value] of mailchimpVolunteers) {
    const firebaseVolunteer = firebaseVolunteers.get(key);
    if (!firebaseVolunteer) {
      membersInMailchimpNotInFirebase.push(value);
    }
  }

  for (const member of membersInMailchimpNotInFirebase) {
    const volunteer = createVolunteer(member);
    let documentRef = admin.firestore().doc("volunteers/" + member.id);
    documentRef.set(volunteer).catch((err) => {
      return { error: `Failed to create document: ${err}` };
    });
  }
});

//retrieve schedule from firestore
exports.fetchSchedule = functions.https.onCall(async () => {
  let events = [];
  await firestore
    .collection("schedule")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
    });
  return events;
});

const getVolunteerType = (mailchimpMember) => {
  const listId = mailchimpMember.list_id;
  if (listId === allDayChaperonesListId) {
    return "2022_ALL_DAY_CHAPERONE";
  } else if (listId === eveningChaperonesListId) {
    return "2022_EVENING_CHAPERONE";
  } else if (listId === lebanonChaperonesListId) {
    return "2022_LEBANON_CHAPERONE";
  } else if (listId === driversListId) {
    return "2022_DRIVER";
  } else {
    if (mailchimpMember.email_address.toLowerCase() === "c4kchaperones@gmail.com") {
      return "2022_ADMIN";
    }
    return "2022_INVALID";
  }
};

const createVolunteer = (mailchimpMember) => {
  const volunteer = {
    checkedIn: false,
    volunteerType: getVolunteerType(mailchimpMember),
    volunteerYear: "2022",
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
  };
  return volunteer;
};
