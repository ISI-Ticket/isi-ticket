window.onload = this.populate;

async function getYearlyEarnings() {
    // let response = await fetch('http://localhost:5000/admin/getYearlyEarnings');
    let response = await fetch('https://isi-ticket-api.herokuapp.com/admin/getYearlyEarnings');
    let data = await response.json()
    console.log("ANO")
    console.log(data)
    return data;
}

async function getMonthlyEarnings() {
    //   let response = await fetch('http://localhost:5000/admin/getMonthlyEarnings');
    let response = await fetch('https://isi-ticket-api.herokuapp.com/admin/getMonthlyEarnings');
    let data = await response.json()
    console.log(data)
    return data;
}

async function getDailyEarnings() {
    //  let response = await fetch('http://localhost:5000/admin/getDailyEarnings');
    let response = await fetch('https://isi-ticket-api.herokuapp.com/admin/getDailyEarnings');
    let data = await response.json()
    console.log(data)
    return data;
}

function populate() {
    console.log("CHEGA")
    let dailyEarnings = document.getElementById("dailyEarnings")
    let monthlyEarnings = document.getElementById("monthlyEarnings")
    let yearlyEarnings = document.getElementById("yearlyEarnings")

    this.getDailyEarnings().then(data => {
        if (data.total != null) dailyEarnings.innerHTML = `<br>${data.total}€`;
        else dailyEarnings.innerHTML = '<br>0€'
    })

    this.getMonthlyEarnings().then(data => {
        if (data.total != null) monthlyEarnings.innerHTML = `<br>${data.total}€`;
        else monthlyEarnings.innerHTML = '<br>0€'
    })

    this.getYearlyEarnings().then(data => {
        if (data.total != null) yearlyEarnings.innerHTML = `<br>${data.total}€`;
        else yearlyEarnings.innerHTML = '<br>0€'
    })
}