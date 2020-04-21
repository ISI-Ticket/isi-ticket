
/*window.onload = function(){
    this.getHistory().then(tickets => populate(tickets))
}
async function getHistory(){
  let response = await fetch('http://localhost:5000/test/history/26');
  let data = await response.json()
  return data;
}

function populate(tickets){
    let render  = document.getElementById('render');
    let page;
    let index = 0;
    for(ticket of tickets){
        let image = setImage(ticket.ticketID)
        for(let i = 0; i < ticket.quantity; i++){
            index += 1;
            let date = ticket.date.substring(0,10);
            page = 
            `<div class="card-panel recipe white row">
                <img src= ${image} alt="recipe thumb">
                <div class="recipe-details">
                    <div class="recipe-title">${ticket.ticketName} </div>
                    <div class="recipe-ingredients">${ticket.description} - ${date}</div>
                </div>
            </div>`
            render.innerHTML += page;
        }
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
}*/
