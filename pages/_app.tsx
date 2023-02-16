import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import userServices from "../firebase/userServices";
import { db, auth } from "../firebase/clientApp.js";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any | null>(null);
  const [FBuser, setFBuser] = useState<any | null>("base");

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const signIn = () => {
    auth.signInWithPopup(provider);
  };
  const signOut = () => {
    auth.signOut();
    setFBuser("base");
  };

  async function getUserFirebase(id: any) {
    const data = await userServices.getUser(id);
    // console.log("TeSTER", data.id);
    // var user_raw = data.data();
    var user = { ...data.data(), id: data.id };
    return user;
  }
  async function getFBFromUid() {
    const data = await userServices.getAllUsers();
    var FBusers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as any));
    // console.log(FBusers[3].uid, user.uid );
    for (let FBuser of FBusers) {
      if (FBuser.uid === user.uid) {
        return FBuser;
      }
      // console.log("no_match");
    }
    return null;
  }
  async function handleLoad() {
    // console.log("handleLoad");
    if (user) {
      var FB = await getFBFromUid();
      // console.log("Fb",FB);

      if (FB) {
        setFBuser(FB);
      } else {
        userServices
          .addUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            requests: [],
            api_key: "",
          })
          .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
            getUserFirebase(docRef.id).then((u) => {
              setFBuser(u);
            });
          });
      }
    }
  }
  async function addReq(req:any) {
    // console.log("Test", FBuser.prescriptions)
    var newRequests = FBuser.requests == undefined?[req]:FBuser.requests.concat(req);
    await userServices.updateUser(FBuser.id, {
      requests: newRequests,
    });
    // var u = await getUserFirebase(FBuser.id)
    // setFBuser(u)
    return getUserFirebase(FBuser.id).then((u) => {
      // console.log("Test", u);
      setFBuser(u);
      return u;
    });
  }
  // async function updateKey that takes in a key and updates the key in the firebase
  async function updateKey(key:any) {
    await userServices.updateUser(FBuser.id, {
      api_key: key,
    });
    return getUserFirebase(FBuser.id).then((u) => {
      // console.log("Test", u);
      setFBuser(u);
      return u;
    });
  }


  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (u) => {
      setUser(u);
    });
  }, []);

  useEffect(() => {
    handleLoad();
  }, [user]);

  return (
    <>
      <Component
      {...pageProps} 
      user={user} 
      signIn={signIn} 
      signOut={signOut} 
      FBuser={FBuser}
      addReq={addReq}
      updateKey={updateKey}

      
      />
      <Analytics />
    </>
  );
}

export default MyApp;
