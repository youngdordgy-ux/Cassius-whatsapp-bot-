const os = require('os');

let menuState = {};

async function handleMenuReply(sock, chatId, message, reply) {
    const num = reply.trim();
    
    const menus = {
        '1': './owner',
        '2': './social',
        '3': './download',
        '4': './group',
        '5': './fun',
        '6': './tools',
        '7': './channel'
    };
    
    try {
        if (menus[num]) {
            const cmd = require(menus[num]);
            // clear state after reply
            if (global.cassiusMenuState) delete global.cassiusMenuState[chatId];
            await cmd(sock, chatId, message);
        } else if (num === '7') {
            // If no channel.js, send channel link directly
            await sock.sendMessage(chatId, { 
                text: `*╭─「 CHANNEL MENU 」─*\n*│*\n*│* 📢 *Join our channel:*\n*│* https://whatsapp.com/channel/0029VbDeT5tKwqSM5FGMaK3p\n*│*\n*╰────────────────*` 
            }, { quoted: message });
            if (global.cassiusMenuState) delete global.cassiusMenuState[chatId];
        }
    } catch(e) {
        console.log("handleMenuReply error:", e);
        await sock.sendMessage(chatId, { text: `❌ Error opening menu ${num}` }, { quoted: message });
    }
}

module.exports = async (sock, chatId, message) => {
    // Save state so reply 1-7 works
    if (!global.cassiusMenuState) global.cassiusMenuState = {};
    global.cassiusMenuState[chatId] = true;
    
    // Auto clear after 60 seconds
    setTimeout(() => {
        if (global.cassiusMenuState && global.cassiusMenuState[chatId]) {
            delete global.cassiusMenuState[chatId];
        }
    }, 60000);

    const uptime = Math.floor(process.uptime());
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    const menuText = `
*╭─「 CASSIUS MD V1.0.1 」─*
*│*
*│* *BOT INFO:*
*│* *VERSION:* 1.0.1
*│* *OWNER:* CASSIUS
*│* *UPTIME:* ${hours}h ${minutes}m
*│* *MODE:* Public
*│* *PREFIX:* . / ,
*│*
*│* *MEDIA:*
*│* https://whatsapp.com/channel/0029VbDeT5tKwqSM5FGMaK3p
*│*
*╰────────────────*

*╭─「 MENU LIST 」─*
*│*
*│* *Reply with number:*
*│*
*│* 1️⃣ OWNER MENU
*│* 2️⃣ SOCIAL MENU
*│* 3️⃣ DOWNLOAD MENU
*│* 4️⃣ GROUP MENU
*│* 5️⃣ FUN MENU
*│* 6️⃣ TOOLS MENU
*│* 7️⃣ CHANNEL MENU
*│*
*╰────────────────*

> _Reply 1-7 to open_
`;

    // ===== TYPING ANIMATION WITH COLOR - ADDED =====
    try {
        await sock.sendPresenceUpdate('composing', chatId);
        let sent = await sock.sendMessage(chatId, { text: '▌' }, { quoted: message });
        const colors = ['🔴','🟠','🟡','🟢','🔵','🟣'];
        let displayed = '';
        for (let i = 0; i < menuText.length; i++) {
            displayed += menuText[i];
            if (i % 10 === 0) {
                const color = colors[Math.floor(i/15) % colors.length];
                await sock.sendMessage(chatId, { text: `${color} _Typing..._\n\n${displayed}▌`, edit: sent.key }).catch(()=>{});
                await new Promise(r => setTimeout(r, 55));
            }
        }
        await sock.sendMessage(chatId, { text: menuText, edit: sent.key }).catch(async () => {
            await sock.sendMessage(chatId, { text: menuText }, { quoted: message });
        });
        await sock.sendPresenceUpdate('paused', chatId);
    } catch (e) {
        await sock.sendMessage(chatId, { text: menuText }, { quoted: message });
    }
    // ===== END ANIMATION =====
};

module.exports.handleMenuReply = handleMenuReply;
