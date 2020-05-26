window.onload = this.populate;

async function getYearlyEarnings(){
    let response = await fetch('http://localhost:5000/admin/getYearlyEarnings');
    let data = await response.json()
    console.log(data)
    return data;
}

async function getMonthlyEarnings(){
    let response = await fetch('http://localhost:5000/admin/getMonthlyEarnings');
    let data = await response.json()
    console.log(data)
    return data;
}

async function getDailyEarnings(){
    let response = await fetch('http://localhost:5000/admin/getDailyEarnings');
    let data = await response.json()
    console.log(data)
    return data;
}

function populate(){
    let dailyEarnings = document.getElementById("dailyEarnings")
    let monthlyEarnings = document.getElementById("monthlyEarnings")
    let yearlyEarnings = document.getElementById("yearlyEarnings")

    this.getDailyEarnings().then(data => {
        if(data.total != null) dailyEarnings.innerHTML = `${data.total}€`;
        else  dailyEarnings.innerHTML = '0€'
    })

    this.getMonthlyEarnings().then(data => {
        if(data.total != null) monthlyEarnings.innerHTML = `${data.total}€`;
        else  monthlyEarnings.innerHTML = '0€'
    })

    this.getYearlyEarnings().then(data => {
        if(data.total != null) yearlyEarnings.innerHTML = `${data.total}€`;
        else  yearlyEarnings.innerHTML = '0€'
    })
}