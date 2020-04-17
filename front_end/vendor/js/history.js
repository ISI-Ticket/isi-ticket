
window.onload = function(){
    this.getHistory().then(tickets => populate(tickets))
}
async function getHistory(){
  let response = await fetch('http://localhost:5000/test/history/23');
  let data = await response.json()
  return data;
}

function populate(tickets){
    let render  = document.getElementById('render');
    let page;
    let index = 0;
    for(ticket of tickets){
        let qrcode = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=22/${ticket.ticketID}-${ticket.reference}" alt="" title="" />`
        for(let i = 0; i < ticket.quantity; i++){
            index += 1;
            let date = ticket.date.substring(0,10);
            page = 
            `<div class="card-panel recipe white row">
            <img src="../img/greenticket.png" alt="recipe thumb">
            <div class="recipe-details">
                <div class="recipe-title">${ticket.ticketName} </div>
                <div class="recipe-ingredients">${ticket.description} - ${date}</div>
            </div>
        </div>`
            render.innerHTML += page;
        }
    }
   
}



