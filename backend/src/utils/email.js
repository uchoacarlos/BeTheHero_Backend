const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

function enviarEmail(id, email) {

const transporter = nodemailer.createTransport({
    host:"smtp.mail.yahoo.com",
    port: 587,
    secure: false,
    auth: {
        user: "carlosuchoa22@yahoo.com.br",
        pass: "sfjhthouvmprunll"
    }, 
    tls: {
        rejectUnauthorized: false
    }
});

/*transporter.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/views'),
    extName: '.hbs'
}));*/

const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'src/views',
      layoutsDir: 'src/views',
      defaultLayout: 'email.handlebars',
    },
    viewPath: 'src/views',
    extName: '.handlebars',
  };
  
  transporter.use('compile', hbs(handlebarOptions));

transporter.sendMail({
    to: email,
    from: 'carlosuchoa22@yahoo.com.br',
    subject: "oi sou carlos e o envio de email funcionou!!!",
    text: "Olá, sou o carlos e aqui é o conteudo",
    template: 'email',
    context: { id }

}).then((message) => {
    console.log(message);
}).catch((err) => {
    console.log(err);
});
}


module.exports = enviarEmail;
