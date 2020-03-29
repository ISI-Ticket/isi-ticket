let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});
scanner.addListener('scan', function(content) {
    alert('Escaneou o conteudo: ' + content);
    window.open(content, "_blank");
});
Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error("Não existe câmera no dispositivo!");
    }
});


function validateTicket(content){
    let teste = content.substr(0, addy.indexOf('/'));
    console.log(teste);
    fetch('http://localhost:5000/ticket/validate',{
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
        }).then(function(res){ return res.json(); 
        }).then(function(data){
            console.log(JSON.stringify(data));
            let response = JSON.stringify(data);
            
        });



    Swal.fire({
        title: 'Senha validada com sucesso!',
        text: 'Modal with a custom image.',
        imageUrl: '../img/blueticket.png',
        imageWidth: 400,
        imageHeight: 200
      })

}