const express = require("express");
const router = express.Router();
const { auth, db } = require("../../firebase.js");
const { createUserWithEmailAndPassword } = require("firebase/auth");
const { collection, addDoc } = require("firebase/firestore");

router.post('/', (req, res) => {
    let { email, password, fullName, country, phone } = req.body;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        try {
          const userDataRef = collection(db, "users_data");
          await addDoc(userDataRef, {
            uid: uid,
            email: email,
            fullName: fullName,
            country: country,
            confirmations: [],
          });
          
          res.send({ success: true, user });
        } catch (error) {
          res.send({ success: false, error: error.message });
        }
      })
      .catch((error) => {
        res.send({ success: false, error: error.message });
      });
  });

module.exports = router;
