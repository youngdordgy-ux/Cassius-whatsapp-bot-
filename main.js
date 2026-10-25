const settings = require('./settings');
require('./config.js');
const { isBanned } = require('./lib/isBanned');
const fs = require('fs');
const path = require('path');
const { isSudo } = require('./lib/index');
const isAdmin = require('./lib/isAdmin');

// CASSIUS BRANDED
global.packname = settings.packname || "CASSIUS";
global.author = settings.author || "CASSIUS Tech Hub";
global.channelLink = "https://whatsapp.com/channel/0029VbAnuvT6RGJ9Qrf3NJ0L";
global.ytch = "CASSIUS Tech Hub";

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363420656466131@newsletter',
            newsletterName: 'CASSIUS Tech Hub Bot',
            serverMessageId: -1
        }
    }
};

// SAFE loader - won't crash if file missing
function safeRequire(p) {
    try {
        const full = path.join(__dirname, p);
        if (fs.existsSync(full + '.js') || fs.existsSync(full)) {
            return require(p);
        }
        return null;
    } catch (e) {
        console.log(`⚠️ Skipped ${p}: ${e.message}`);
        return null;
    }
}

// Load commands safely
const menuCommand = safeRequire('./commands/menu');
const menu2Command = safeRequire('./commands/menu2');
const pingCommand = safeRequire('./commands/ping');
const aliveCommand = safeRequire('./commands/alive');
const ownerCommand = safeRequire('./commands/owner');
const stickerCommand = safeRequire('./commands/sticker');

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
    message.message?.conversation?.trim() ||
    message.message?.extendedTextMessage?.text?.trim() ||
    message.message?.imageMessage?.caption?.trim() ||
    message.message?.videoMessage?.caption?.trim() ||
    ''
).toLowerCase().replace(/\.\s+/g, '.').trim();
const rawText = (
    message.message?.conversation?.trim() ||
    message.message?.extendedTextMessage?.text?.trim() ||
    message.message?.imageMessage?.caption?.trim() ||
    message.message?.videoMessage?.caption?.trim() ||
    ''
);

// ===== CASSIUS MENU REPLY 1-7 SYSTEM =====
try {
    if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
        const numCheck = rawText.trim();
        if (/^[1-7]$/.test(numCheck)) {
            const menuFile = require('./commands/menu');
            if (menuFile.handleMenuReply) {
                await menuFile.handleMenuReply(sock, chatId, message, numCheck);
                return;
            }
        }
    }
} catch(e) {}
// ===== END MENU REPLY SYSTEM =====

if (userMessage.startsWith(',')) {
    userMessage = '.' + userMessage.slice(1);
}
let cleanRaw = rawText;
if (cleanRaw.startsWith(',')) {
    cleanRaw = '.' + cleanRaw.slice(1);
}
    message.message?.conversation?.trim() ||
    message.message?.extendedTextMessage?.text?.trim() ||
    message.message?.imageMessage?.caption?.trim() ||
    message.message?.videoMessage?.caption?.trim() ||
    ''
).toLowerCase().replace(/\.\s+/g, '.').trim();

const rawText = (
    message.message?.conversation?.trim() ||
    message.message?.extendedTextMessage?.text?.trim() ||
    message.message?.imageMessage?.caption?.trim() ||
    message.message?.videoMessage?.caption?.trim() ||
    ''
);

// ===== CASSIUS MENU REPLY 1-7 SYSTEM =====
try {
    if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
        const numCheck = rawText.trim();
        if (/^[1-7]$/.test(numCheck)) {
            const menuFile = require('./commands/menu');
            if (menuFile.handleMenuReply) {
                await menuFile.handleMenuReply(sock, chatId, message, numCheck);
                return;
            }
        }
    }
} catch(e) { console.log("Menu reply error:", e); }
// ===== END MENU REPLY SYSTEM =====

// Allow BOTH . and , prefix - and allow 1-7 replies
if (!userMessage.startsWith('.') && !userMessage.startsWith(',')) {
    if (!/^[1-7]$/.test(rawText.trim())) {
        // check if banned or not command, but allow menu replies
    }
}

// Convert ,menu to .menu
if (userMessage.startsWith(',')) {
    userMessage = '.' + userMessage.slice(1);
}
let cleanRaw = rawText;
if (cleanRaw.startsWith(',')) {
    cleanRaw = '.' + cleanRaw.slice(1);
}
            console.log(`📝 ${userMessage} from ${isGroup ? 'group' : 'private'}`);
        }

        if (isBanned(senderId) && !userMessage.startsWith('.unban')) return;

        if (!userMessage.startsWith('.')) return;

        switch (true) {
            case userMessage === '.menu' || userMessage === '.bot' || userMessage === '.list' || userMessage === '.help':
                await sock.sendMessage(chatId, { react: { text: "🤖", key: message.key } });
                if (menuCommand) {
                    try { await menuCommand(sock, chatId, message, global.channelLink); } 
                    catch (e) { 
                        await sock.sendMessage(chatId, { text: `╭━━━ CASSIUS TECH HUB ━━━\n┃ 🤖 CASSIUS MD V1.0.0\n┃ 👑 Owner: 27686836786\n┃ ⏰ Online\n╰━━━━━━━━━━━━\n\n.play .song .video\n.tiktok .fb .ig\n.gpt .ai .imagine\n.tagall .kick .promote\n.sticker .ping .alive\n\nType .allmenu for 119+ cmds\n© CASSIUS Tech Hub` }, { quoted: message });
                    }
                } else {
                    await sock.sendMessage(chatId, { text: `CASSIUS Bot Online ✅\n\n.menu works!\n.ping works!\n\nOwner: 27686836786` }, { quoted: message });
                }
                break;

            case userMessage === '.allmenu' || userMessage === '.fullmenu':
                if (menu2Command) await menu2Command(sock, chatId, message, global.channelLink);
                else await sock.sendMessage(chatId, { text: "CASSIUS Full Menu: 119+ commands loaded!" }, { quoted: message });
                break;

            case userMessage === '.ping' || userMessage === '.speed':
                await sock.sendMessage(chatId, { react: { text: "⚡", key: message.key } });
                if (pingCommand) await pingCommand(sock, chatId, message);
                else await sock.sendMessage(chatId, { text: "Pong! ⚡ CASSIUS Tech Hub - 27686836786" }, { quoted: message });
                break;

            case userMessage === '.alive':
                if (aliveCommand) await aliveCommand(sock, chatId, message);
                else await sock.sendMessage(chatId, { text: "✅ CASSIUS MD is Alive! 27686836786" }, { quoted: message });
                break;

            case userMessage === '.owner':
                if (ownerCommand) await ownerCommand(sock, chatId);
                else await sock.sendMessage(chatId, { text: "👑 Owner: CASSIUS 27686836786" }, { quoted: message });
                break;

            default:
                // Try to load any other command dynamically
                if (userMessage.startsWith('.')) {
                    const cmdName = userMessage.split(' ')[0].slice(1).split('@')[0];
                    const cmd = safeRequire(`./commands/${cmdName}`);
                    if (cmd) {
                        try {
                            if (typeof cmd === 'function') await cmd(sock, chatId, message);
                            else if (cmd.execute) await cmd.execute(sock, chatId, message);
                            else if (cmd.default) await cmd.default(sock, chatId, message);
                        } catch (e) {
                            console.log(`Error in ${cmdName}: ${e.message}`);
                            await sock.sendMessage(chatId, { text: `❌ Error in ${cmdName}: ${e.message}` }, { quoted: message });
                        }
                    }
                }
                break;
        }

    } catch (error) {
        console.error('❌ handleMessages error:', error.message);
    }
}

module.exports = { handleMessages };
