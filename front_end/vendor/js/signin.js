var profileTest;
window.onload = renderButton();

function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn,
      'onfailure': onFailure
    });
  }

  function onFailure(error) {
    console.log(error);
  }
function signOut(){

    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
      });
}

/*function onSignIn(googleUser){

    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    window.location.href='../pages/perfil.html';
    
}*/

function onSignIn(googleUser){

    profile = googleUser.getBasicProfile();
    

    var data = {
        "email" : profile.getEmail()
    }
    console.log(data);
    fetch('http://localhost:5000/signin',{
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
        }).then(function(res){ return res.json(); 
        }).then(function(data){
            console.log(JSON.stringify(data));
            let response = JSON.stringify(data);
            if(data.exists == true) {
                localStorage.setItem('profile', response);
                window.location.href='./vendor/pages/perfil.html'
            }else{
                localStorage.setItem("email", profile.getEmail());
                localStorage.setItem("firstname", profile.getGivenName());
                localStorage.setItem("lastname", profile.getFamilyName());
            };
        });

    //window.location.href='./vendor/pages/perfil.html';
    
}