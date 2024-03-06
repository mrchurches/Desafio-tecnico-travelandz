const express = require("express");
const router = express.Router();
const { auth, db } = require("../../firebase.js");

router.get("/user_details", (req, res) => {
    const { uid } = req.query;
    if (!uid) {
        res.status(400).send("Invalid or missing parameters");
        return;
    }
    const usersDataRef = db.collection("users_data");
    usersDataRef
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            res.send({ success: true, user: userData });
        } else {
            res.status(404).send("User not found");
        }
        })
        .catch((error) => {
        res.status(500).send(error.message);
        });
    });


module.exports = router;