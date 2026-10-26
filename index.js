const { default: makeWASocket } = require('@whiskeysockets/baileys');

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

module.exports = { handleMessages };const { default: makeWASocket } = require('@whiskeysockets/baileys');

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
