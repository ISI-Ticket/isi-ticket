google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Compras'],
    ['11:00h',  123,],
    ['12:00h',  1170,],
    ['13:00h',  1500,],
    ['14:00h',  660,],
    ['15:00h',  6,]
  ]);

  var options = {
    title: 'Afluência nas Horas',
    colors:  ['#4ecdc4'],
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}