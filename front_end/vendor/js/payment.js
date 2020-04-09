function paypal() {
  var data = {
      ticketID : document.getElementById('ticketID').value,
      quantity : 1
  }
  console.log(data);
  fetch('http://localhost:5000/paypal/pay', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
  }).then(function (res) {
      console.log(res.url);
      window.location.href = res.url;
      //return res.json();
  })


}
