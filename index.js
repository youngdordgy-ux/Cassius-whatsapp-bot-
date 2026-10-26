const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('CASSIUS MD V1.0.1 is Live');
}).listen(process.env.PORT || 10000, () => {
  console.log('Port bound - bot is live');
});

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ['CASSIUS MD', 'Chrome', '1.0']
  });

  sock.ev.on('creds.update', saveCreds);

  if (!sock.authState.creds.registered) {
    const phoneNumber = (process.env.PHONE_NUMBER || '').replace(/[^0-9]/g, '');
    if (phoneNumber) {
      console.log('Waiting 3 seconds to request pairing code...');
      await new Promise(r => setTimeout(r, 3000));
      try {
        const code = await sock.requestPairingCode(phoneNumber);
        console.log('====================================');
        console.log('PAIRING CODE: ' + code);
        console.log('For number: ' + phoneNumber);
        console.log('====================================');
      } catch (e) {
        console.log('Failed to get pairing code:', e.message);
      }
    } else {
      console.log('Add PHONE_NUMBER in Render Environment to get pairing code');
    }
  }

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error instanceof Boom ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('CASSIUS MD V1.0.1 Connected!');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    try {
      const msg = m.messages[0];
      if (!msg?.message) return;
      const chatId = msg.key.remoteJid;
      let text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      text = text.trim().toLowerCase();
      if (!text.startsWith('.')) return;
      if (text === '.menu') {
        await sock.sendMessage(chatId, { text: 'CASSIUS MD V1.0.1 Menu\n\n.menulive' });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

startBot();
