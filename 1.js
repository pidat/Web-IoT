const firebaseConfig = {
    apiKey: "AIzaSyCBvLkgt6LqJI-cSKnG_C_eYPhMulz00Fs",
    authDomain: "iot-duydat.firebaseapp.com",
    databaseURL: "https://iot-duydat-default-rtdb.firebaseio.com",
    projectId: "iot-duydat",
    storageBucket: "iot-duydat.appspot.com",
    messagingSenderId: "990507859265",
    appId: "1:990507859265:web:437bcd5c9dca9278abf5c0",
    measurementId: "G-RMXNPQXJF6"
  };
  // // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let a=[];
let b=[];
  let firebaseRef = firebase.database().ref("iots");
firebaseRef.on("value", function (snapshot) {
  snapshot.forEach(function (element){
    a.push(element.val())
    b[0]=a[0]
    b[1]=a[1]
    b[2]=a[2]
});
    console.log(b)
    a.splice(0,3)
    

})