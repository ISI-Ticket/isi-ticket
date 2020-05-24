google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function getClientAffluence(){
  let response = await fetch('http://localhost:5000/admin/getClientAffluence');
  let data = await response.json()
  return data;
}

function drawChart() {
  this.getClientAffluence().then(clientAffluence => {
  console.log(clientAffluence)
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Compras'],
    ['11:00h',  clientAffluence[11],],
    ['12:00h',  clientAffluence[12],],
    ['13:00h',  clientAffluence[13],],
    ['14:00h',  clientAffluence[14],],
    ['15:00h',  clientAffluence[15],]
  ]);

  var options = {
    title: 'Afluência nas Horas',
    colors:  ['#4ecdc4'],
    curveType: 'function',
    legend: { position: 'bottom' }
  };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  })
}