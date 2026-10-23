// commands/cassius.js - CASSIUS TECH BOT
const axios = require("axios");

async function cassiusCommand(sock, chatId, message, q) {
  try {
    if (!q) {
      return await sock.sendMessage(
        chatId,
        {
          text: "⚠️ Please provide a query.\n\n📌 Example: .cassius how to code a WhatsApp bot?\n\n💜 CASSIUS TECH BOT",
        },
        { quoted: message }
      );
    }

    // React ⏳ while processing
    await sock.sendMessage(chatId, { react: { text: "⏳", key: message.key } });

    const apiUrl = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { headers: { "User-Agent": "Mozilla/5.0" } });

    const aiResponse = response.data?.result?.prompt || response.data?.result || "No response";
    const AI_IMG = "https://files.catbox.moe/suqejh.jpg";

    await sock.sendMessage(
      chatId,
      {
        image: { url: AI_IMG },
        caption: `🤖 *CASSIUS AI Response:*\n\n${aiResponse}\n\n> 💙 Powered by CASSIUS TECH BOT - Advanced Edition 2025`,
        contextInfo: { mentionedJid: [message.sender] },
      },
      { quoted: message }
    );

    // React ✅ on success
    await sock.sendMessage(chatId, { react: { text: "✅", key: message.key } });
  } catch (error) {
    console.error("cassiusCommand error:", error);

    await sock.sendMessage(
      chatId,
      {
        text: `❌ Failed to fetch Cassius AI response.\n\nError: ${error.message}\n\n💜 Try again later - CASSIUS TECH`,
      },
      { quoted: message }
    );

    // React ❌ on error
    await sock.sendMessage(chatId, { react: { text: "❌", key: message.key } });
  }
}

module.exports = cassiusCommand;
