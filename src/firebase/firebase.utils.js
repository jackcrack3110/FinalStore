import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAzWzJ8TtG1ioo45OE9HB4opR2MLHsSNq0",
    authDomain: "crwn-db-8321c.firebaseapp.com",
    databaseURL: "https://crwn-db-8321c.firebaseio.com",
    projectId: "crwn-db-8321c",
    storageBucket: "crwn-db-8321c.appspot.com",
    messagingSenderId: "369697593354",
    appId: "1:369697593354:web:8877d66d9e4f43c7a4e7f3",
    measurementId: "G-DJJSCDBS28"
  };
  export const createUserProfileDocument = async (userAuth,additionalData) => {
      if(!userAuth)  return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists){
          const { displayName, email}=userAuth;
          const createAt=new Date();

          try{
               await userRef.set(
                   {
                       displayName,
                       email,
                       createAt,
                       ...additionalData
                   }
               )

          }
          catch(error){
             console.log('error creating user',error.message );
          }
          
        
      }
      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;
 