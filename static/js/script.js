Parse.initialize("qLW3u3c0SK9XuyBF6lIeiFRc83kLU5Oj5xB6UgMf", "okeGyP0jil6ZJyPjPJjIJVTCOBy5vzB184MsMs1I");


  var you;
  var loggedIn = false;
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
  	console.log('statusChangeCallback');
  	console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $("#fbLogin").hide();
      
      $("#successfulLogin").show();
      $("#signIn").hide();
      $("#fbLogout").show();

      
      loggedIn = true;
      you = response.authResponse.accessToken;
      linkToParse();
  } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      fbLogout();
      document.getElementById('status').innerHTML = 'Please log ' +
      'in with Facebook.';

  }
}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
  	FB.getLoginStatus(function(response) {
  		statusChangeCallback(response);
  	});
  }


window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '1094688440545035',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });




  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };
  // Load the SDK asynchronously
  (function(d, s, id) {
  	var js, fjs = d.getElementsByTagName(s)[0];
  	if (d.getElementById(id)) return;
  	js = d.createElement(s); js.id = id;
  	js.src = "//connect.facebook.net/en_US/sdk.js";
  	fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.

  function linkToParse() {


  	Parse.FacebookUtils.logIn(null, {
  		success: function(swapUserWithLocation) {
  			if (!swapUserWithLocation.existed()) {
          alert("download the app bitch");
          $("#downloadUserView").show();
          $("#signIn").hide();
          $("#fbLogin").show();
          $("#fbLogout").show();
          
  			} else {
         

          $("#showAllUsers").show();
          $("#showYourSwaps").show();
  			}
        you = swapUserWithLocation.id;

        //if in DB show stuff, if not go sign up //
  			
  		},
  		error: function(swapUserWithLocation, error) {
  			
  		}
  	});





  	FB.api('/me', function(response) {
  		
  	});
  }

  function fbLogout() {
  	FB.logout(function (response) {
            //Do what ever you want here when logged out like reloading the page
          $("#showAllUsers").hide();
          $("#showYourSwaps").hide();
          $("#fbLogin").show();

            window.location.reload();
        });
  }
function fbLogin() {
FB.login(function(response) {
   if (response.authResponse) {
     $("#fbLogin").hide();
     $("#fbLogout").show();
     linkToParse();
     window.location.reload();
   } else {
     
   }
 });
}

// FB.Event.subscribe("auth.logout", function() {window.location = '/logout'});






