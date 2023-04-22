
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

// Button menu

let sliderbar = document.querySelector(".sliderbar");
let sliderbarBtn = document.querySelector(".sliderbarBtn");

sliderbarBtn.onclick = function () {
    sliderbar.classList.toggle("active");
}

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Button search
let input = document.querySelector('.text');
let searchBtn = document.querySelector('.searchBtn');
searchBtn.onclick = function(){
    input.classList.toggle('active')
}

// ----------------- Chart -------------------------------
// ----------------- Bar Chart ---------------------------

let a = [];
let b = [];
let firebaseRef = firebase.database().ref("iots");
firebaseRef.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    a.push(element.val())
    b[0]=a[0]
    b[1]=a[1]
    b[2]=a[2]
    if(b[2] >= 30 ){
      firebase.database().ref('tools').update({
        'fan': true
      });
    }
    else 
    {
      firebase.database().ref('tools').update({
        'fan': false
      });
    }
    

    if(b[0] <= 60 || b[2] >= 35 ){
      firebase.database().ref('tools').update({
        'water': true
      });
    }
    else 
    {
      firebase.database().ref('tools').update({
        'water': false
      });
    }

    if(b[1] <= 200 ){
      firebase.database().ref('tools').update({
        'light': true
      });
    }
    else
    {
      firebase.database().ref('tools').update({
        'light': false
      });
    }
  });
  a.splice(0,3)
  document.querySelector('.Temp').innerHTML=b[2] + '°C';
  document.querySelector('.Humid').innerHTML=b[0]+ '%';
  document.querySelector('.Insen').innerHTML=b[1]+" "+'Lux';
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Properties", "", { role: "style" }],
      ["Temp", b[2], "color: #33ff66"],
      ["Humid", b[0], "color: #ffcc66"],
      ["Insen", b[1], "color: #77ccff"],
    ]);
    var options = {
      title: "Visualize Your Chicken Coop Stats",
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("bar-chart")
    );
    chart.draw(data, options);
  }
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
});
// ----------------------- Line Chart -------------------------------

let c = [];
let d = [];

firebaseRef.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    c.push(element.val())
    d[0]=c[0]
    d[1]=c[1]
    d[2]=c[2]
  });
  c.splice(0,3)
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Properties", "Data"],
      ["Temp", d[2]],
      ["Humid", d[0]],
      ["Insen", d[1]],
    ]);
    var options = {
      title: "Visualize Your Chicken Coop Stats",
      curveType: "function",
      legend: { position: "bottom" },
      colors: ["#CC3300"],
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("line-chart")
    );

    chart.draw(data, options);
  }
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
});

// ------------------- Button-door ---------------------------

let doorOn = document.querySelector(".toggle-door");
doorOn.onclick = function () {
  doorOn.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'door': true
  });
};
let doorOff = document.querySelector(".toggle-door-active");
doorOff.onclick = function () {
  doorOff.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'door': false
  });
};

let door = firebase.database().ref("tools/door"); 
door.on("value", function (snap){
  let doorStatus=snap.val();
  if(doorStatus == false ){
    document.getElementById("check-door").style.display="block"
    document.getElementById("check-door-active").style.display="none"
    document.querySelector('.door-img').src='./door.png'
    notify({
      title: 'Error',
      message: 'Tool is off',
      type: 'error',
      duration: 1000
    });  
  }
  else{
    document.getElementById("check-door").style.display="none"
    document.getElementById("check-door-active").style.display="block"
    document.querySelector('.door-img').src='./door1.png'
    notify({
      title: 'Success',
      message: 'Tool is on',
      type: 'success',
      duration: 1000
    });  
  }
});

// ------------------- Button-light ---------------------------

let lightOn = document.querySelector(".toggle-light");
lightOn.onclick = function () {
  lightOn.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'light': true
  });
};
let lightOff = document.querySelector(".toggle-light-active");
lightOff.onclick = function () {
  lightOff.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'light': false
  });
};

let light = firebase.database().ref("tools/light");
light.on("value", function (snap){
  let lightStatus=snap.val();
  if(lightStatus == false ){
    document.getElementById("check-light").style.display="block"
    document.getElementById("check-light-active").style.display="none"
    document.querySelector('.light-img').src='./light-bulb.png'
    notify({
      title: 'Error',
      message: 'Tool is off',
      type: 'error',
      duration: 1000
    });  
  }
  else{
    document.getElementById("check-light").style.display="none"
    document.getElementById("check-light-active").style.display="block"
    document.querySelector('.light-img').src='./light-bulb1.png'
    notify({
      title: 'Success',
      message: 'Tool is on',
      type: 'success',
      duration: 1000
    });  
  }
});

// ------------------- Button-fan ---------------------------

let fanOn = document.querySelector(".toggle-fan");
fanOn.onclick = function () {
  fanOn.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'fan': true
  });
  
};
let fanOff = document.querySelector(".toggle-fan-active");
fanOff.onclick = function () {
  fanOff.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'fan': false
  });
};

let fan = firebase.database().ref("tools/fan");
fan.on("value", function (snap){
  let fanStatus=snap.val();
  if(fanStatus == false ){
    document.getElementById("check-fan").style.display="block"
    document.getElementById("check-fan-active").style.display="none"
    document.querySelector('.fan-img').src='./fan.png';
    notify({
      title: 'Error',
      message: 'Tool is off',
      type: 'error',
      duration: 1000
    });  
  }
  else{
    document.getElementById("check-fan").style.display="none"
    document.getElementById("check-fan-active").style.display="block"
    document.querySelector('.fan-img').src='./fan.gif';
    notify({
      title: 'Success',
      message: 'Tool is on',
      type: 'success',
      duration: 1000
    })
  }
});

// ------------------- Button-water ---------------------------

let waterOn = document.querySelector(".toggle-water");
waterOn.onclick = function () {
  waterOn.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'water': true
  }
  );
};
let waterOff = document.querySelector(".toggle-water-active");
waterOff.onclick = function () {
  waterOff.classList.toggle("active"); 
  firebase.database().ref('tools').update({
    'water': false
  });
};

let water = firebase.database().ref("tools/water");
water.on("value", function (snap){
  let waterStatus=snap.val();
  if(waterStatus == false ){
    document.querySelector('.water-img').src='./water-drop.png'
    document.getElementById("check-water").style.display="block"
    document.getElementById("check-water-active").style.display="none"
    notify({
      title: 'Error',
      message: 'Tool is off',
      type: 'error',
      duration: 1000
    });  
  }
  else{
    document.getElementById("check-water").style.display="none"
    document.getElementById("check-water-active").style.display="block"
    document.querySelector('.water-img').src='./water.gif'
    notify({
      title: 'Success',
      message: 'Tool is on',
      type: 'success',
      duration: 1000
    })
  }
  }
);

//-------------------------- Notify message  -------------------------
function notify({
  title = '',
  message='',
  type='info',
  duration=3000
}) {
  const main = document.getElementById('notify');
    if(main){
      const notify = document.createElement('div');
      const icons= {
        success: "fa-solid fa-circle-check",
        error: "fa-solid fa-circle-exclamation",
      };
      const icon = icons[type];
      const delay=(duration/1000).toFixed(2);

      notify.classList.add('notify', `notify--${type}`);
      notify.style.animation=`slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
      notify.innerHTML= `
          <div class="notify-icon">
            <i class="${icon}"></i>
          </div>
          <div class="notify-body">
            <h3 class="notify-title">${title}</h3>
            <p class="notify-message">${message}</p>
          </div>
          <div class="notify-close">
            <i class="fa-solid fa-xmark"></i>
          </div>
      `;
      main.appendChild(notify);
      setTimeout(function(){
        main.removeChild(notify);
      }, duration + 1000);
    };
  }
  