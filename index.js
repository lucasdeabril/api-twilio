const TWILIO_ACCOUNT_SID = 'YOUR ACCOUNT SID';
const http = require('http');
const TWILIO_AUTH_TOKEN = codigo1 + codigo2;
const verifySid = 'YOUR VERIFY SID';
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
next();
});
app.options('*', (req, res) => {
res.status(200).end();
});



app.post('/teste', (req, res) =>{
    let number= req.body.number
    console.log("o body é="+ number)
    let sendVerificationCode = (number)=> {  
        console.log("o number é="+ number) 
        return client.verify.v2.services(verifySid)
        .verifications
        .create({ to: number, channel: "sms"
        }).then((data) => {
            res.status(200).send('dados enviados')
            return data.status;
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao enviar o código de verificação.');
        });
    
    }
    sendVerificationCode(req.body.number)
})

app.post('/teste1', async (req,res) =>{
    const number = req.body.number;
    const code = req.body.code;
    
    let checkVerification = async (number, code)=> {
    try{ const data = await client.verify.v2.services(verifySid)
        .verificationChecks
        .create({ to: number , code: code
        });
        console.log(data);
        res.status(200).send(`Se você está lendo isso, significa que estou melhorando no backend. Status: ${data.status}`);
            return data.status;
        }catch (error){
            console.error(error);
            res.status(500).send('Erro ao verificar o código.');
        };
    }
    await checkVerification(number,code);
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});