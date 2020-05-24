google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

async function getMonthlyClients(){
    let response = await fetch('http://localhost:5000/admin/monthlyClients');
    let data = await response.json()
    return data;
  }
function drawBasic() {
    this.getMonthlyClients().then(clients => {
    console.log(clients)
    var data = google.visualization.arrayToDataTable([
          ['Mês', 'Nº de Clientes da App '],
          ['Janeiro',  clients[1]],
          ['Fevereiro',  clients[2]],
          ['Março',  clients[3]],
          ['Abril',  clients[4]]
        ]);

      var options = {
          title: 'Evolução de Clientes',
          legend: { position: 'bottom' },
          colors:  ['#4ecdc4'],
        hAxis: {
          title: 'Meses'
        },
        vAxis: {
          title: 'Nº de Clientes'
          
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    })
}