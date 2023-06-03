const express = require('express');
const firebase=require('firebase');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyCL5niQngTaMC5NpzBCFK0XXt_Btemt-Zw",
    authDomain: "demo1-9efcc.firebaseapp.com",
    projectId: "demo1-9efcc",
    storageBucket: "demo1-9efcc.appspot.com",
    messagingSenderId: "601543509268",
    appId: "1:601543509268:web:ba2de6805c26c81d646e01",
    measurementId: "G-5PWRJ09B6Z"
  };

  firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000"
}));

app.post('/store', async (req, res) => {
await db.collection('Numbers').doc("xqlNR5tC7WPewV1oCzDF").update(req.body.numbers).then(result=>
    {
        res.status(200).send("Data Updated Successfully");
    }).catch(err=>{
        res.status(404).send("Data Updation Failed");
    });
});

app.get('/retrieve', async (req, res) => {
    await db.collection('Numbers').doc("xqlNR5tC7WPewV1oCzDF").get().then(result=>{
        res.status(200).send(result.data());
   }).catch(err=>{
       console.log(err)
   })
});

app.listen(4000, () => {
    console.log("Server is listening at port 4000");
})