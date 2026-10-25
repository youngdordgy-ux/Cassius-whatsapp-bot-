module.exports = {
name: "menu",
alias: ["start", "help", "allmenu", "commands"],
category: "general",
execute: async (sock, m) => {
let menu = `
*╭━━━ 〔 CASSIUS TECH HUB BOT 〕━━━┈⊷*
*┃* 🤖 BOT: CASSIUS MD V1.0.0
*┃* 👑 OWNER: Cassius - 27686836786
*┃* ⚡ SPEED: Super Fast
*┃* 📅 UPTIME: Online
*╰━━━━━━━━━━━━━━━━━━━━┈⊷*

*╭─── DOWNLOAD ───*
*│* .play, .song, .ytmp3
*│* .video, .ytmp4, .ytv
*│* .tiktok, .tt, .tiktokdl
*│* .facebook, .fb, .fbdl
*│* .instagram, .ig, .igdl
*│* .mediafire, .mf
*│* .gdrive
*│* .apk, .app
*│* .twitter, .xdl
*╰──────────────*

*╭─── AI & SEARCH ───*
*│* .gpt, .ai, .chatgpt
*│* .gemini, .bard
*│* .blackbox
*│* .imagine, .dalle, .flux
*│* .lyrics
*│* .google, .gsearch
*│* .wikipedia, .wiki
*╰──────────────*

*╭─── GROUP ───*
*│* .tagall, .hidetag
*│* .kick, .remove
*│* .add
*│* .promote, .demote
*│* .mute, .unmute
*│* .antilink, .antibadword
*│* .welcome, .goodbye
*│* .group open, .group close
*│* .link, .invite
*│* .poll
*╰──────────────*

*╭─── TOOLS ───*
*│* .sticker, .s, .st
*│* .toimg, .toimage
*│* .tovideo, .tomp3
*│* .url, .tourl
*│* .ss, .screenshot
*│* .translate, .trt
*│* .calc, .calculator
*│* .qr, .qrcode
*│* .removebg
*│* .enhance, .remini
*╰──────────────*

*╭─── GENERAL ───*
*│* .ping, .speed
*│* .alive, .uptime
*│* .owner, .creator
*│* .script, .sc
*│* .support, .channel
*╰──────────────*

*╭─── OWNER ───*
*│* .ban, .unban
*│* .block, .unblock
*│* .join
*│* .leave
*│* .restart, .update
*│* .broadcast, .bc
*│* .setpp, .setbio
*╰──────────────*

*╭─── FUN & FUN ───*
*│* .joke, .quote
*│* .fact
*│* .flirt
*│* .ship, .couple
*│* .truth, .dare
*╰──────────────*

*Total Commands: 119+*
> © CASSIUS Tech Hub 2026
> Type .[command] to use
`;

await sock.sendMessage(m.chat, { text: menu }, { quoted: m });
}
};
