async function getTickets() {
    // let response = await fetch('http://localhost:5000/test/getSales');
    let response = await fetch('https://isi-ticket-api.herokuapp.com/test/getSales');

    let data = await response.json()
    return data;
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    this.getTickets().then(tickets => {
        console.log(tickets)
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Senhas Simples', tickets.simples],
            ['Senhas Completas', tickets.completa],
            ['Pack de Senhas', tickets.pack],
            ['Senha Grill', tickets.grill],
            ['Senha Rampa B', tickets.rampaB]
        ]);

        var options = {

            title: 'Número de senhas compradas',
            colors: ['#5dd39e', '#4ecdc4', '#ff6b6b', '#f8961e', '#ffe66d'],
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);

    })

}