const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');

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
      const shouldReconnect = (lastDisconnect?.error instanceof Boom) ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ CASSIUS MD V1.0.1 Connected!');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    try {
      const msg = m.messages[0];
      if (!msg?.message) return;
      const chatId = msg.key.remoteJid;
      const senderId = msg.key.participant || msg.key.remoteJid;
      
      let text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';
      const rawText = text.trim();
      text = text.toLowerCase().trim().replace(/\. +/g, '.').replace(/^,/, '.');

      // MENU 1-7 REPLY
      if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
        if (/^[1-7]$/.test(rawText)) {
          const menu = require('./commands/menu');
          if (menu.handleMenuReply) {
            await menu.handleMenuReply(sock, chatId, msg, rawText);
            return;
          }
        }
      }

      if (!text.startsWith('.')) return;
      if (text === '.menu' || text.startsWith('.menu ')) {
        const menu = require('./commands/menu');
        await menu(sock, chatId, msg);
      }
    } catch(e) { console.log(e); }
  });
}

startBot();const { default: makeWASocket } = require('@whiskeysockets/baileys');

function safeRequire(p) {
  try { return require(p); }
  catch(e) { console.log(`⚠️ Skipped ${p}: ${e.message}`); return null; }
}

const menuCommand = safeRequire('./commands/menu');

async function handleMessages(sock, messageUpdate) {
  try {
    const { messages, type } = messageUpdate;
    if (type !== 'notify') return;
    const message = messages[0];
    if (!message?.message) return;

    const chatId = message.key.remoteJid;
    const senderId = message.key.participant || message.key.remoteJid;
    const isGroup = chatId.endsWith('@g.us');

    let userMessage = (
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      message.message?.imageMessage?.caption ||
      message.message?.videoMessage?.caption ||
      ''
    );

    const rawText = userMessage.trim();
    userMessage = userMessage.toLowerCase().trim();
    
    // Fix prefix , and . space
    userMessage = userMessage.replace(/\. +/g, '.').replace(/^,/, '.');

    // ===== REPLY 1-7 =====
    try {
      if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
        if (/^[1-7]$/.test(rawText.trim())) {
          const menuFile = require('./commands/menu');
          if (menuFile.handleMenuReply) {
            await menuFile.handleMenuReply(sock, chatId, message, rawText.trim());
            return;
          }
        }
      }
    } catch(e){}

    if (!userMessage.startsWith('.')) return;

    // MENU COMMAND
    if (userMessage === '.menu' || userMessage.startsWith('.menu ')) {
      if (menuCommand) await menuCommand(sock, chatId, message);
      return;
    }

  } catch(e) {
    console.log("handleMessages error:", e);
  }
}

module.exports = { handleMessages };
