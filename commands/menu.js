async function menuCommand(sock, chatId, message) {
    try {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const menuImage = "https://i.ibb.co/Lz4B07d0/money-heist-mask.jpg";
        const menuText = `
🌍⊕───•◦●◦•───⊕
││││
││ ☆✦°❀
│ ☠️
✧ Cassius~ᰔᩚ🎶
╭───────────◍
│ 🏠 MAIN MENU
╰───────────◍
╭─◍◍◍◍◍◍◍◍
│ OWNER - CASSIUS TECH HUB
│ VERSION - 1.0.1
│ COMMANDS - 119
│ PREFIX - [ . , ]
│ ACTIVE BOTS - ${hours}h ${minutes}m
│ WEB - cassius.tech
│ MEDIA - https://whatsapp.com/channel/0029VbDeT5tKwqSM5FGMaK3p
╰─◍◍◍◍◍◍◍
┌─『 Reply Number ➡️ 』
│ 1️⃣ OWNER MENU
│ 2️⃣ SOCIAL MENU
│ 3️⃣ AI MENU
│ 4️⃣ GROUP MENU
│ 5️⃣ TOOLS MENU
│ 6️⃣ EDUCATION MENU
│ 7️⃣ CHANNEL MENU
╰─────────────◍◍

📍 _Reply 1-7 to open_

cassiustech.hub </> *Powered by CASSIUS TECH*`;

        await sock.sendMessage(chatId, { image: { url: menuImage }, caption: menuText }, { quoted: message });
        global.cassiusMenuState = global.cassiusMenuState || {};
        global.cassiusMenuState[chatId] = true;
    } catch (e) { console.log("MENU ERROR:", e); }
}
async function handleMenuReply(sock, chatId, message, num) {
    let t = "";
    if(num=="1") t=`╭─〔 OWNER MENU 〕─\n│ • .mode public/private\n│ • .autostatus on/off\n│ • .antidelete on/off\n│ • .ban / .unban\n│ • .clearsession\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="2") t=`╭─〔 SOCIAL MENU 〕─\n│ • .tiktok <link>\n│ • .fb <link>\n│ • .ig <link>\n│ • .play <song>\n│ • .song <song>\n│ • .video <name>\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="3") t=`╭─〔 AI MENU 〕─\n│ • .ai <q>\n│ • .gpt <q>\n│ • .imagine <prompt>\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="4") t=`╭─〔 GROUP MENU 〕─\n│ • .tagall\n│ • .kick @\n│ • .promote @\n│ • .antilink on/off\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="5") t=`╭─〔 TOOLS MENU 〕─\n│ • .sticker / .s\n│ • .url\n│ • .ss <link>\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="6") t=`╭─〔 EDUCATION MENU 〕─\n│ • .bible <verse>\n│ • .weather <city>\n│ • .news\n╰──\n© CASSIUS TECH 1.0.1`;
    if(num=="7") t=`╭─〔 CHANNEL MENU 〕─\n│ • https://whatsapp.com/channel/0029VbDeT5tKwqSM5FGMaK3p\n│ • Owner: 27686836786\n│ • Version: 1.0.1\n│ Tap the link to join channel!\n╰──\n© CASSIUS TECH HUB 1.0.1`;
    if(t) await sock.sendMessage(chatId, { text: t }, { quoted: message });
}
module.exports = { menuCommand, handleMenuReply };
module.exports.execute = menuCommand;
