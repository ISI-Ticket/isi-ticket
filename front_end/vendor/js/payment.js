function paypal() {
  var data = {
      "email": "profile.getEmail()"
  }
  console.log(data);
  fetch('http://localhost:5000/paypal/pay', {
      method: 'POST',
      body: JSON.stringify(data)
  }).then(function (res) {
      console.log(res.url);
      window.location.href = res.url;
      //return res.json();
  })


}
