async function menuCommand(sock, m, args) {
let menu = `
*╭━━━ 〔 CASSIUS TECH HUB BOT 〕━━━┈⊷*
*┃* 🤖 BOT: CASSIUS MD V1.0.0
*┃* 👑 OWNER: Cassius - 27686836786
*┃* ⚡ SPEED: Super Fast
*┃* 📅 MODE: Public
*╰━━━━━━━━━━━━━━━━━━━━┈⊷*

*╭─── DOWNLOAD ───*
*│* .play, .song, .ytmp3
*│* .video, .ytmp4, .ytv
*│* .tiktok, .tt
*│* .facebook, .fb
*│* .instagram, .ig
*│* .mediafire, .mf
*│* .gdrive, .apk, .twitter
*╰──────────────*

*╭─── AI & SEARCH ───*
*│* .gpt, .ai, .gemini
*│* .imagine, .dalle, .flux
*│* .google, .wikipedia, .lyrics
*╰──────────────*

*╭─── GROUP ───*
*│* .tagall, .hidetag, .kick, .add
*│* .promote, .demote, .mute, .unmute
*│* .antilink, .welcome, .group open/close
*│* .link, .poll
*╰──────────────*

*╭─── TOOLS ───*
*│* .sticker, .s, .toimg, .tovideo
*│* .url, .ss, .translate, .calc
*│* .qr, .removebg, .enhance
*╰──────────────*

*╭─── GENERAL ───*
*│* .ping, .alive, .owner, .script
*╰──────────────*

*╭─── OWNER ───*
*│* .ban, .unban, .block, .join, .leave
*│* .restart, .broadcast, .setpp
*╰──────────────*

*Total: 119+ Commands*
> © CASSIUS Tech Hub Bot
`;
await sock.sendMessage(m.chat, { text: menu }, { quoted: m });
}

menuCommand.name = "menu";
menuCommand.alias = ["start", "help", "allmenu"];
menuCommand.category = "general";
menuCommand.execute = menuCommand;

module.exports = menuCommand;apiUrl
