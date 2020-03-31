let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});
scanner.addListener('scan', function(content) {
    validateTicket(content);
});
Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error("Não existe câmera no dispositivo!");
    }
});


function validateTicket(content){
    let saleID = content.substr(0, content.indexOf('/'));
    let ticketID = content.substr(content.indexOf('/') + 1);
    let data = {saleID, ticketID};
    console.log(data);
    fetch('http://localhost:5000/ticket/validate',{
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
        }).then(function(res){ return res.json(); 
        }).then(function(data){
            console.log(data);
            showPopup(data);            
        });


}


function showPopup(response){
    console.log(response.status);
    if(response.status == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha validada previamente!',
          })
    }else{
        Swal.fire({
            title: 'Sucesso!',
            text: response.msg,
            imageUrl: '../img/blueticket.png',
            imageWidth: 200,
            imageHeight: 200
        })
    }
}