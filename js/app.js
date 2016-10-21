
/*	ENTER YOUR APP'S JAVASCRIPT CODE HERE!	*/

// this function fires at the ready state, which is when the DOM is
// ready for Javascript to execute
$(document).ready(function() {

	// Initialize Firebase
	// NOTE: you can also copy and paste this information from your project
	//       after you initialize it


  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyDH0F3_eqLiEBFw4esqW_qjvsw71QEJdRQ",
    authDomain: "chatapp-e45f5.firebaseapp.com",
    databaseURL: "https://chatapp-e45f5.firebaseio.com",
    storageBucket: "chatapp-e45f5.appspot.com",
    messagingSenderId: "496547799051"
  };
  firebase.initializeApp(config);
  
  var provider = new firebase.auth.GoogleAuthProvider();

  $("#btn-login").click(function() {
    
    $(".login-window").hide();
    $(".main-window").show();


      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      });
    });
  


  // get/create/store UUID
    var UUID = PUBNUB.db.get('session') || (function(){ 
    var uuid = PUBNUB.uuid(); 
    PUBNUB.db.set('session', uuid); 
    return uuid; 
  })(); 
 
  // Initialize the PubNub API connection.
  var pubnub = PUBNUB.init({
    publish_key: 'pub-c-84ee8042-1f75-49a0-9941-68f75eb3b498',
    subscribe_key: 'sub-c-366cb476-96e0-11e6-94c7-02ee2ddab7fe',
    uuid: UUID,
	ssl : (('https:' == document.location.protocol) ? true : false)  
  });
 
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
      sendbtn = $('#sendbtn'),
      messageList = $('#messageList');

  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message) {
    var messageEl = $("<li class='message'>"
        + "<span class='username'>" + message.username + ": </span>"
        + message.text
        + "</li>");
    messageList.append(messageEl);
  };

  // Compose and send a message when the user clicks our send message button.
  sendbtn.click(function (event) {
    var message = messageContent.val();

    if (message != '') {
      pubnub.publish({
        channel: 'chatapp',
        message: {
          username: UUID,
          text: message
        }
      });
 
      messageContent.val("");
    }
  });
 
  messageContent.bind('keydown', function (event) {
    if((event.keyCode || event.charCode) !== 13) return true;
    sendbtn.click();
    return false;
  });
 
  // Subscribe to messages coming in from the channel.
  pubnub.subscribe({
    channel: 'chatapp',
    message: handleMessage
  });

});

  var pubnub = PUBNUB.init({
          publish_key: 'pub-c-37271fdb-3d41-44ea-9e0d-f290a9a5a591',
          subscribe_key: 'sub-c-4ed1f028-9099-11e6-a68c-0619f8945a4f',
	  ssl : (('https:' == document.location.protocol) ? true : false)
  });

    pubnub.subscribe({
    channel: 'draw',
    callback: drawFromStream,
  });

    pubnub.history({
    channel: 'draw',   
    count: 20,
    callback: function(messages) {
      pubnub.each( messages[0], drawFromStream );
    }
  });

  //spec char buttons
  //delta
  function adddel(messageContent) {
  var delta = document.getElementById('messageContent')
  delta.value += "\u0394"
  }
  //lambda
  function addlam(messageContent) {
  var lambda = document.getElementById('messageContent')
  lambda.value += "\u03BB"
  }
  //pi
  function addpi(messageContent) {
  var pipi = document.getElementById('messageContent')
  pipi.value += "\uD835\uDF0B"
  }
  //sigma
  function addsig(messageContent) {
  var sigma = document.getElementById('messageContent')
  sigma.value += "\u03A3"
  }
  //square root
  function addsqr(messageContent) {
  var sqr = document.getElementById('messageContent')
  sqr.value += "\u221A"
  }

  /* Draw on canvas */

  var canvas = document.getElementById('drawCanvas');
  var ctx = canvas.getContext('2d');
       
  ctx.lineWidth = '3';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  var color = 'black';

  canvas.addEventListener('mousedown', startDraw, false);
  canvas.addEventListener('mousemove', draw, false);
  canvas.addEventListener('mouseup', endDraw, false);

  function drawOnCanvas(color, plots) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(plots[0].x, plots[0].y);

    for(var i=1; i<plots.length; i++) {
      ctx.lineTo(plots[i].x, plots[i].y);
    }
    ctx.stroke();
  }

  function drawFromStream(message) {
    if(!message || message.plots.length < 1) return;          
    drawOnCanvas(message.color, message.plots);
  }

  var isActive = false;
  var plots = [];

  function draw(e) {
    if(!isActive) return;

    var x = e.offsetX || e.layerX - canvas.offsetLeft;
    var y = e.offsetY || e.layerY - canvas.offsetTop;

    plots.push({x: x, y: y});
    drawOnCanvas(color, plots);
  }
      
  function startDraw(e) {
    isActive = true;
  }
      
  function endDraw(e) {
    isActive = false;
    
    pubnub.publish({
      channel: 'draw',
      message: {
        color: color, 
        plots: plots
      }
    });

    plots = [];
  }
  $("#btn-logout").click(function() {

    auth.signOut().then(function() {
      $(".login-window").show();
      $(".main-window").hide();
    }, function(error) {
        alert("Oops!  Couldn't log you out.  Here's why: "+error);
    });
  });
;
	// @NOTE: it's probably a good idea to place your event 
	//		  listeners in here :)
