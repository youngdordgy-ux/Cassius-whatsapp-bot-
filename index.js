const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('CASSIUS MD V1.0.1 is Live 🔥');
}).listen(process.env.PORT || 10000, () => {
  console.log('Port bound - bot is live');
});const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true
  });
  sock.ev.on('creds.update', saveCreds);
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
      let text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';
      const rawText = text.trim();
      text = text.toLowerCase().trim().replace(/\. +/g, '.').replace(/^,/, '.');
      if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
        if (/^[1-7]$/.test(rawText)) {
          const menu = require('./commands/menu');
          if (menu.handleMenuReply) { await menu.handleMenuReply(sock, chatId, msg, rawText); return; }
        }
      }
      if (!text.startsWith('.')) return;
      if (text === '.menu') {
        const menu = require('./commands/menu');
        await menu(sock, chatId, msg);
      }
    } catch(e){ console.log(e); }
  });
}
startBot();
