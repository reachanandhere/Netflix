import { initializeApp } from "firebase/app";
      import { getAnalytics } from 'firebase/analytics';
      import { getAuth } from "firebase/auth";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyDCRjME8nE4oRu4wcb5UMrE-yB9oNYgGaM",
        authDomain: "netflix4u-3fc9a.firebaseapp.com",
        projectId: "netflix4u-3fc9a",
        storageBucket: "netflix4u-3fc9a.appspot.com",
        messagingSenderId: "155790174796",
        appId: "1:155790174796:web:093476c1388ba6c5e122e9",
        measurementId: "G-HZDMTPV02E"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      export const auth = getAuth()