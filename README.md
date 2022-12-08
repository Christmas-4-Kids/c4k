![c4k-horizontal](https://user-images.githubusercontent.com/68450309/155401405-cd59fd70-dc84-4438-96ed-1264ac21f321.png)

For over 35 years, Christmas 4 Kids has given the joy of Christmas to thousands of Middle Tennessee children that might not otherwise experience it. Each December, local businesses, volunteers, celebrities, recording artists, and their bus drivers set aside two days from their busy schedules for these special children.

## The Biggest Christmas Party In Town

The entire year’s efforts come together when the buses pick up over 400 children and bring them to a Christmas Party held in their honor. Santa and Mrs. Claus host the party, which provides lunch (donated by Garth Brooks), live music, dancing and a lot of fun!! After the party, the children get back on the buses for a parade, led by the Nashville Trolley carrying Santa and Mrs. Claus, that stretches nearly five miles and features more than 70 Tour Buses, ending at Super Walmart in Hendersonville. Each child is met by his or her own chaperone, and they’re given $150.00 to buy anything they want. Plus, Christmas 4 Kids gives every child a brand new winter coat.

## Volunteer!

Want to lend your time to providing Christmas Spirit to thousands of children? Click [here](https://christmas4kids.org/volunteer/) to volunteer! C4K would love to have your help!

## Donate!

C4K is made possible by generous donors just like you! Your donations put smiles on childrens' faces as they cross items off their Christmas list. Donate [here!](https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A)

---

# Christmas 4 Kids Comapanion App

This app was built to aid volunteers on the day of the C4K event. The app checks volunteers in by scanning their driver's license, saving organizers' time by not manually checking in each volunteer. The app also has use information such as event rules, event schedule, organizers' contact information, and a store map.

[Play Store Link](https://play.google.com/store/apps/details?id=com.c4k.shoppingeventmanager&hl=en_US&gl=US) --- [App Store Link](https://apps.apple.com/ng/app/christmas-4-kids/id1491062275)

<img height="700px" src="https://user-images.githubusercontent.com/68450309/155424804-a562c1dd-c244-4a06-bbd8-ffdac290ac7f.gif" />

### Tech Stack

```
• React Native
• Expo
• TypeScript
• FireBase
• Twilio
```

## How to install and run the app locally

### 1. Clone the repo

• `git clone https://github.com/Christmas-4-Kids/c4k.git`

### 2. Change directory to C4K

• `cd C4K`

### 3. Install dependencies

• `yarn`

### 4. Start app

• `yarn start`

Expo Developer Tools opens on `localhost:19002`

---

### [Download](https://developer.android.com/studio/?gclid=Cj0KCQiA09eQBhCxARIsAAYRiykJEPi1qfKv5Xmd1nPFXcQKFUy7_-LOP91bMxP7p8-ykpcuf6UPIG8aAlJoEALw_wcB&gclsrc=aw.ds) and [Install](https://developer.android.com/studio/install) Android Studio to run and [emulate and Android device](https://developer.android.com/studio/run/emulator)

or

### [Download](https://apps.apple.com/us/app/xcode/id497799835?mt=12) and install Xcode to emulate an IOS device

---

## Running Firebase Functions Locally

Below are the important steps. For full documentation please see the [official Firebase docs](https://firebase.google.com/docs/functions/local-emulator#install_the_firebase_cli).

1. Ensure you have the Firebase CLI - `npm install -g firebase-tools`

2. Store your config locally inside your functions folder -

   ```bash
   cd functions
   firebase functions:config:get > .runtimeconfig.json
   ```

3. Store your credentials locally

   - Follow these steps - <https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional>

   - Ensure they are saved to the `/functions` folder

4. Uncomment this line in `services/firestore.service.js`

   ```javascript
   // Uncomment to run firebase functions locally
   // firebase.functions().useEmulator("localhost", 5001);
   ```

---

## Roadmap

- [x] Convert map to be url based
- [ ] Allow the app to work without being logged in (Countdown, socials, Store, events)
- [ ] Add registration to app
- [ ] Collect data on user activity
- [ ] Create bus assignment app
- [ ] Add custom calculator to shopping tab
- [ ] Merge persistent rules
- [x] Update README
- [ ] Set up proper database access rules
- [ ] Allow Organizers to register volunteers by scanning DL and asking questions
- [ ] Add search to volunteer list
- [ ] Allow user to edit personal information (phone, name, address)
- [ ] Feature to share your experience the day after
- [ ] Tooltips on how to use the app
- [ ] Storage DL data and image tied to Volunteer

## Contributing

Feel free to open an issue or contact a [contributer](https://github.com/orgs/Christmas-4-Kids/people) to get involved with development

## Building & Publishing to the app stores

You can build and publish in several ways. Expo has some good documentation on this. There are essentially two ways to do it - [using Expo build servers](https://docs.expo.dev/distribution/building-standalone-apps/) or [using your own computer or CI](https://docs.expo.dev/distribution/turtle-cli/).

I have been using the Expo servers because I was never able to get the Turtle CLI to work properly for me. The only downside to using the Expo servers is that they're slower and you're at the mercy of their uptime.
