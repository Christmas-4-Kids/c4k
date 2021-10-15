# Running Firebase Functions Locally

Below are the important steps. For full documentation please see the [official Firebase docs](https://firebase.google.com/docs/functions/local-emulator#install_the_firebase_cli).

1. Ensure you have the Firebase CLI - `npm install -g firebase-tools`

2. Store your config locally inside yours functions folder -

   ```bash
   cd functions
   firebase functions:config:get > .runtimeconfig.json
   ```

3. Store your credentials locally

   - Follow these steps - <https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional>

   - Ensure they are saved to the `/functions` folder

4. Uncomment this line in `SignIn.tsx`

   ```javascript
   // Uncomment to run firebase functions locally
   // firebase.functions().useEmulator("localhost", 5001);
   ```

# Building & Publishing to the app stores

You can build and publish in several ways. Expo has some good documentation on this. There are essentially two ways to do it - [using Expo build servers](https://docs.expo.dev/distribution/building-standalone-apps/) or [using your own computer or CI](https://docs.expo.dev/distribution/turtle-cli/).

I have been using the Expo servers because I was never able to get the Turtle CLI to work properly for me. The only downside to using the Expo servers is that they're slower and you're at the mercy of their uptime.
