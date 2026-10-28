const http = require('http');
http.createServer((req,res)=>{res.end('CASSIUS MD V1.0.1 is Live - QR & PAIRING READY');}).listen(process.env.PORT||10000);

const {default:makeWASocket,useMultiFileAuthState,DisconnectReason}=require('@whiskeysockets/baileys');
const {Boom}=require('@hapi/boom');
const pino=require('pino');
const qrcode=require('qrcode-terminal');

async function startBot(){
  const {state,saveCreds}=await useMultiFileAuthState('./auth');
  const sock=makeWASocket({auth:state,logger:pino({level:'silent'}),browser:['CASSIUS','Chrome','1.0']});
  sock.ev.on('creds.update',saveCreds);

  // PAIRING CODE LOGIC
  if(!sock.authState.creds.registered){
    const num=(process.env.PHONE_NUMBER||'').replace(/[^0-9]/g,'');
    if(num){
      await new Promise(r=>setTimeout(r,4000));
      try{
        const code=await sock.requestPairingCode(num);
        console.log('\n\n--------------------------');
        console.log('YOUR 8-DIGIT PAIRING CODE: '+code);
        console.log('Go to WhatsApp > Linked Devices > Link with phone number');
        console.log('--------------------------\n\n');
      }catch(e){console.log('Pairing failed, will show QR:',e.message)}
    }
  }

  sock.ev.on('connection.update',async({connection,lastDisconnect,qr})=>{
    // QR CODE LOGIC
    if(qr){
      console.log('\n\n--------------------------');
      console.log('SCAN THIS QR CODE:');
      qrcode.generate(qr,{small:true});
      console.log('--------------------------\n\n');
    }
    if(connection==='close'){
      const shouldReconnect=lastDisconnect?.error?.output?.statusCode!==DisconnectReason.loggedOut;
      if(shouldReconnect) startBot();
    }
    if(connection==='open') console.log('✅ CASSIUS MD CONNECTED!');
  });
}
startBot();
