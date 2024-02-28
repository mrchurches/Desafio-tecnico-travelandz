const express = require("express");
const router = express.Router();
const { auth } = require("../../firebase.js");
const { signInWithEmailAndPassword } = require("firebase/auth");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // El inicio de sesión fue exitoso, envía una respuesta exitosa
      res.send({ success: true, user: userCredential.user });
    })
    .catch((error) => {
      // Si hay algún error durante el inicio de sesión, envía un mensaje de error
      res.send({ success: false, error: error.message });
    });
});

module.exports = router;
