google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function getValidInvalid() {
    //    let response = await fetch('http://localhost:5000/test/validInvalid');
    let response = await fetch('https://dashboard.heroku.com/apps/isi-ticket-api/test/validInvalid');
    let data = await response.json()
    return data;
}

function drawChart() {
    this.getValidInvalid().then(tickets => {
        console.log(tickets);
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Senhas Válidas', tickets.valid],
            ['Senhas Inválidas', tickets.invalid]

        ]);

        var options = {
            title: 'Senhas Válidas e Senhas Inválidas',
            pieHole: 0.4,
            colors: ['#4ecdc4', '#ef233c'],
            legend: { position: 'bottom' }

        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    })

}