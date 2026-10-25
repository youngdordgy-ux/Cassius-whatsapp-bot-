// commands/dev.js
async function devCommand(sock, chatId, message, q) {
  try {
    const senderJid = message.key?.participant || message.key?.remoteJid || message.sender || '';
    const pushname =
      message.pushName ||
      message.message?.pushName ||
      (senderJid ? senderJid.split('@')[0] : 'there');

    const name = pushname || 'there';

    const caption = `
╭─⌈ *👨‍💻 CTPB ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ* ⌋─
│
│ 👋 Hello, *${name}*!
│
│ 🤖 I'm *CASSIUS 2009*, the creator and
│    maintainer of this smart WhatsApp bot.
│
│ 👨‍💻 *ᴅᴇᴠ ɪɴꜰᴏ:*
│ ──────────
│ 🧠 *Name:* CASSIUS 2009
│ 🎂 *Age:* +15
│ 📞 *Contact:* wa.me/270686836867
│ 📺 *YouTube:* CASSIUS Tech Hub
│     https://youtube.com/@youngdordgy
│
╰─────────

>⚡Powered By CASSIUS Tech Hub
    `.trim();

    const contextInfo = {
      mentionedJid: senderJid ? [senderJid] : [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363420656466131@newsletter",
        newsletterName: "🪀『 Cassius ᴛᴇᴄʜ ʜᴜʙ ʙᴏᴛ 』🪀",
        serverMessageId: 143
      },
      externalAdReply: {
        title: "Cassius ᴛᴇᴄʜ ʜᴜʙ ʙᴏᴛ",
        body: "Created with ❤️ by Cassius 2009",
        thumbnailUrl: "https://files.catbox.moe/suqejh.jpg",
        mediaType: 1,
        renderSmallerThumbnail: true,
        showAdAttribution: true,
        mediaUrl: "https://youtube.com/@youngdordgy",
        sourceUrl: "https://youtube.com/@youngdordgy"
      }
    };

    await sock.sendMessage(
      chatId,
      {
        image: { url: "https://files.catbox.moe/suqejh.jpg" },
        caption,
        contextInfo
      },
      { quoted: message }
    );
  } catch (err) {
    console.error("devCommand error:", err);
    await sock.sendMessage(chatId, { text: `❌ Error showing dev info: ${err.message}` }, { quoted: message });
  }
}

module.exports = devCommand;
