const express = require("express");
const router = express.Router();
const { auth, db } = require("../../firebase.js");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { collection, query, where, getDocs } = require("firebase/firestore");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // El inicio de sesión fue exitoso, envía una respuesta exitosa
      //quiero traer la info del usuario de mi base de datos de firebase, tengo una collecion que se llama users_data
      //con el uid  hay que filtrar y traer solo el doc de uid igual al del usuario logueado que viene de userCredential.uid
      // console.log(userCredential.user.uid)
      const uid = userCredential.user.uid;
      const usersDataRef = collection(db, "users_data");
      const q = query(usersDataRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("User data:", userData);
        
        res.send({ success: true, user: userData, accessToken: userCredential.user.stsTokenManager.accessToken });
      }
      // res.send({ success: true, user: userCredential.user });
    })
    .catch((error) => {
      console.log("entro en error", error)
      // Si hay algún error durante el inicio de sesión, envía un mensaje de error
      res.send({ success: false, error: error.message });
    });
});

module.exports = router;
