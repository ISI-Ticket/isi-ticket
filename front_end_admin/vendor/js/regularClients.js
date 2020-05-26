google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawSeriesChart);

async function getRegularClients(){
    let response = await fetch('http://localhost:5000/admin/getRegularClients');
    let data = await response.json()
    return data;
}

function drawSeriesChart() {
    this.getRegularClients().then(months => {
        var data = google.visualization.arrayToDataTable([
        ['ID', 'Clientes Registados', 'Clientes Habituais'],
        ['Janeiro',    months[1].regularClients, months[1].nonRegularClients],
        ['Fevereiro',    months[2].regularClients,              months[2].nonRegularClients],
        ['Março',    months[3].regularClients,               months[3].nonRegularClients],
        ['Abril',    months[4].regularClients,              months[4].nonRegularClients],
        ['Maio',    months[5].regularClients,              months[5].nonRegularClients],
        ['Junho',    months[6].regularClients,              months[6].nonRegularClients],
        ['Julho',    months[7].regularClients,              months[7].nonRegularClients],
        ['Agosto',    months[8].regularClients,              months[8].nonRegularClients],
        ['Setembro',    months[9].regularClients,               months[9].nonRegularClients],
        ['Outubro',    months[10].regularClients,              months[10].nonRegularClients],
        ['Novembro',    months[11].regularClients,              months[11].nonRegularClients],
        ['Dezembro',    months[12].regularClients,              months[12].nonRegularClients]
        ]);

        var options = {
        title: 'Clientes Registados vs Clientes Habituais',
        hAxis: {title: 'Clientes Registados'},
        colors: ['#4ecdc4', '#5dd39e'],
        vAxis: {title: 'Clientes Habituais'},
        bubble: {textStyle: {fontSize: 11}}      };

        var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
        chart.draw(data, options);
    })
}