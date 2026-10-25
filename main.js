const fs = require('fs');
const path = require('path');

const commands = new Map();

// Safe reaction - won't crash
async function addCommandReaction(sock, m) {
    try {
        if (!m?.key) return;
        await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch {}
}

// Load all commands from commands folder
function loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const altPath = path.join(__dirname, './commands');
    let dir = fs.existsSync(commandsPath) ? commandsPath : altPath;
    
    // Also check src/commands if exists
    if (!fs.existsSync(dir)) {
        const srcCmd = path.join(__dirname, 'commands');
        if (fs.existsSync(srcCmd)) dir = srcCmd;
    }

    if (!fs.existsSync(dir)) {
        console.log('No commands folder found at', dir);
        return;
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('Cassius'));
    console.log(`Loading ${files.length} commands...`);
    
    for (const file of files) {
        try {
            const filePath = path.join(dir, file);
            delete require.cache[require.resolve(filePath)];
            const cmd = require(filePath);
            const name = (cmd.name || file.replace('.js','')).toLowerCase();
            commands.set(name, cmd);
            if (cmd.alias && Array.isArray(cmd.alias)) {
                for (const a of cmd.alias) commands.set(a.toLowerCase(), cmd);
            }
            console.log(`✅ Loaded: ${name}`);
        } catch (e) {
            console.log(`❌ Failed to load ${file}:`, e.message);
        }
    }
}

loadCommands();

async function handleMessages(sock, m) {
    try {
        if (!m) return;
        const msg = m.message;
        if (!msg) return;
        
        // Get text
        let userMessage = m.body || m.text || '';
        if (!userMessage) {
            userMessage = msg.conversation || msg.extendedTextMessage?.text || msg.imageMessage?.caption || msg.videoMessage?.caption || '';
        }
        if (!userMessage) return;
        
        userMessage = userMessage.trim();
        if (!userMessage.startsWith('.')) return;

        const args = userMessage.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const cmd = commands.get(commandName);
        if (!cmd) {
            // console.log(`Command not found: ${commandName}`);
            return;
        }

        console.log(`Executing: ${commandName} from ${m.sender}`);
        
        try {
            await addCommandReaction(sock, m);
        } catch {}

        // Execute - support both function and .execute
        if (typeof cmd === 'function') {
            await cmd(sock, m, args, userMessage);
        } else if (cmd.execute && typeof cmd.execute === 'function') {
            await cmd.execute(sock, m, args, userMessage);
        } else {
            console.log(`Invalid command structure: ${commandName}`);
        }

    } catch (err) {
        console.error('❌ Error in handleMessages:', err.message);
        try {
            if (m?.chat) {
                await sock.sendMessage(m.chat, { text: `❌ Error: ${err.message}` }, { quoted: m });
            }
        } catch {}
    }
}

module.exports = { handleMessages, commands, loadCommands, addCommandReaction };
