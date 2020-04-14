const mailOptions = (email) =>{
    let date = new Date();
    let day = date.getDate();
    let monthJS = date.getMonth();
    let month = (parseInt(monthJS) + 1).toString()
    let year = date.getFullYear();
    let options = {
        from: 'isiticketbusiness@gmail.com',
        to : `${email}`,
        subject: `Fatura - ${year}-${month}-${day}`,
        text : `Fatura da compra feita em - ${year}-${month}-${day}`,
        attachments: [{
            filename : 'Fatura.pdf',
            path : '../../fatura.pdf'
        }]
    }
    return options;
}

exports.mailOptions = mailOptions;