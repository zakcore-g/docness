import {
    initializeApp,
    cert,
    getApp,
    getApps,
    App,
  } from "firebase-admin/app";
  import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert('./servicekey.json'),
  });
} else {
  adminApp = getApp();
}
const admindb = getFirestore(adminApp);

export { adminApp, admindb };
