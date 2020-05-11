
window.onload = function(){
    this.getHistory().then(tickets => populate(tickets))
}
async function getHistory(){
  let response = await fetch('http://localhost:5000/test/history/clientisiticket@gmail.com');
  let data = await response.json()
  return data;
}

function populate(tickets){
    let render  = document.getElementById('render');
    let page;
    let index = 0;
    console.log(tickets);
    for(ticket of tickets){
        let image = setImage(ticket.ticketID)

            index += 1;
            let date = ticket.date.substring(0,10);
            page = 
            `<div class="card-panel recipe white row">
            <img src= ${image} alt="recipe thumb">
            <div class="recipe-details">
                <div class="recipe-title">${ticket.ticketName} </div>
                <div class="recipe-ingredients" style="font-size: medium;">${ticket.description} </div>
                <br>
                <div class="recipe-ingredients" style="font-size: medium;">${validationDate(ticket.validated)}</div>
            </div>
        </div>`
            render.innerHTML += page;
        
    }
   
}

function validationDate(date){
    if(date == null){
        return "Ainda por usar."
    }else{
        date = ticket.date.substring(0,10);
        return `Usado em: ${date}`
    }
}



function setImage(ticketID){
    switch (ticketID){
        case 1:
            return "../img/yellowticket.png"
        case 2: 
            return "../img/greenticket.png"
        case 3:
            return "../img/purpleticket.png"
        case 4: 
            return "../img/orangeticket.png"
    }
}
