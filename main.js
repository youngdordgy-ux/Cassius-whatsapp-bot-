'use strict';

/*
╔══════════════════════════════════════════════════════════════╗
║                    CASSIUSV6 WHATSAPP BOT                  ║
║                         main.js                             ║
╚══════════════════════════════════════════════════════════════╝

This file is the main command/message handler.

Expected project structure:

.
├── main.js
├── settings.js
├── config.js
├── package.json
├── data/
└── commands/
    ├── menu.js
    ├── ping.js
    ├── alive.js
    ├── tiktok.js
    ├── spotify.js
    ├── instagram.js
    ├── facebook.js
    ├── youtube.js
    ├── ai.js
    └── ...

The command files must export the functions used below.
*/

const fs = require('fs');
const path = require('path');

const settings = require('./settings');
require('./config.js');

const {
    isBanned
} = require('./lib/isBanned');

const {
    addWelcome,
    delWelcome,
    isWelcomeOn,
    addGoodbye,
    delGoodBye,
    isGoodByeOn,
    isSudo
} = require('./lib/index');

const isAdmin = require('./lib/isAdmin');

const {
    handleAutotypingForMessage,
    handleAutotypingForCommand,
    showTypingAfterCommand
} = require('./commands/autotyping');

const {
    handleAutorecordingForMessage,
    handleAutorecordingForCommand,
    showRecordingAfterCommand
} = require('./commands/autorecording');

const {
    handleAutoread
} = require('./commands/autoread');

const {
    handleLinkDetection
} = require('./commands/antilink');

const {
    handleTagDetection
} = require('./commands/antitag');

const {
    handleAntiBadwordCommand,
    handleBadwordDetection
} = require('./lib/antibadword');

const {
    handleChatbotResponse
} = require('./commands/chatbot');

const {
    handleAntideleteCommand,
    handleMessageRevocation,
    storeMessage
} = require('./commands/antidelete');

const {
    handleHeart
} = require('./commands/misc');

const {
    handleStatusUpdate
} = require('./commands/autostatus');


// ══════════════════════════════════════════════════════════════
// COMMAND IMPORTS
// ══════════════════════════════════════════════════════════════

const menuCommand = require('./commands/menu');
const menu2Command = require('./commands/menu2');

const pingCommand = require('./commands/ping');
const aliveCommand = require('./commands/alive');
const ownerCommand = require('./commands/owner');

const tagAllCommand = require('./commands/tagall');
const tagCommand = require('./commands/tag');
const tagNotAdminCommand = require('./commands/tagnotadmin');
const hideTagCommand = require('./commands/hidetag');

const apkCommand = require('./commands/apk');
const luckyCommand = require('./commands/lucky');
const llama3Command = require('./commands/llama3');

const defineCommand = require('./commands/define');
const bibleCommand = require('./commands/bible');
const bibleListCommand = require('./commands/bibleList');

const countryinfoCommand = require('./commands/countryinfo');
const checkCommand = require('./commands/check');

const pairCommand = require('./commands/pair');
const eplCommand = require('./commands/epl');

const devCommand = require('./commands/dev');
const hackCommand = require('./commands/hack');
const newsletterCommand = require('./commands/newsletter');

const blockUnblockCommand = require('./commands/blockUnblock');

const banCommand = require('./commands/ban');
const unbanCommand = require('./commands/unban');

const promoteCommand = require('./commands/promote');
const demoteCommand = require('./commands/demote');

const muteCommand = require('./commands/mute');
const unmuteCommand = require('./commands/unmute');

const warnCommand = require('./commands/warn');
const warningsCommand = require('./commands/warnings');

const ttsCommand = require('./commands/tts');

const {
    tictactoeCommand,
    handleTicTacToeMove
} = require('./commands/tictactoe');

const {
    incrementMessageCount,
    topMembers
} = require('./commands/topmembers');

const deleteCommand = require('./commands/delete');

const memeCommand = require('./commands/meme');
const jokeCommand = require('./commands/joke');
const quoteCommand = require('./commands/quote');
const factCommand = require('./commands/fact');
const weatherCommand = require('./commands/weather');
const newsCommand = require('./commands/news');

const kickCommand = require('./commands/kick');

const simageCommand = require('./commands/simage');
const attpCommand = require('./commands/attp');

const {
    startHangman,
    guessLetter
} = require('./commands/hangman');

const {
    startTrivia,
    answerTrivia
} = require('./commands/trivia');

const {
    complimentCommand
} = require('./commands/compliment');

const {
    insultCommand
} = require('./commands/insult');

const {
    eightBallCommand
} = require('./commands/eightball');

const {
    lyricsCommand
} = require('./commands/lyrics');

const {
    dareCommand
} = require('./commands/dare');

const {
    truthCommand
} = require('./commands/truth');

const {
    clearCommand
} = require('./commands/clear');

const blurCommand = require('./commands/img-blur');

const welcomeCommand = require('./commands/welcome');
const goodbyeCommand = require('./commands/goodbye');

const githubCommand = require('./commands/github');

const antibadwordCommand = require('./commands/antibadword');

const takeCommand = require('./commands/take');

const {
    flirtCommand
} = require('./commands/flirt');

const characterCommand = require('./commands/character');
const wastedCommand = require('./commands/wasted');
const shipCommand = require('./commands/ship');

const groupInfoCommand = require('./commands/groupinfo');

const resetlinkCommand = require('./commands/resetlink');
const staffCommand = require('./commands/staff');

const emojimixCommand = require('./commands/emojimix');

const viewOnceCommand = require('./commands/viewonce');

const clearSessionCommand = require('./commands/clearsession');

const {
    autoStatusCommand
} = require('./commands/autostatus');

const {
    simpCommand
} = require('./commands/simp');

const {
    stupidCommand
} = require('./commands/stupid');

const stickerTelegramCommand =
    require('./commands/stickertelegram');

const textmakerCommand =
    require('./commands/textmaker');

const clearTmpCommand =
    require('./commands/cleartmp');

const setProfilePicture =
    require('./commands/setpp');

const {
    setGroupDescription,
    setGroupName,
    setGroupPhoto
} = require('./commands/groupmanage');

const instagramCommand =
    require('./commands/instagram');

const facebookCommand =
    require('./commands/facebook');

const spotifyCommand =
    require('./commands/spotify');

const playCommand =
    require('./commands/play');

const tiktokCommand =
    require('./commands/tiktok');

const songCommand =
    require('./commands/song');

const aiCommand =
    require('./commands/ai');

const urlCommand =
    require('./commands/url');

const {
    handleTranslateCommand
} = require('./commands/translate');

const {
    handleSsCommand
} = require('./commands/ss');

const {
    handleAreactCommand
} = require('./lib/reactions');

const {
    goodnightCommand
} = require('./commands/goodnight');

const {
    shayariCommand
} = require('./commands/shayari');

const {
    rosedayCommand
} = require('./commands/roseday');

const imagineCommand =
    require('./commands/imagine');

const videoCommand =
    require('./commands/video');

const sudoCommand =
    require('./commands/sudo');

const {
    animeCommand
} = require('./commands/anime');

const {
    piesCommand,
    piesAlias
} = require('./commands/pies');

const stickercropCommand =
    require('./commands/stickercrop');

const updateCommand =
    require('./commands/update');

const removebgCommand =
    require('./commands/removebg');

const {
    reminiCommand
} = require('./commands/remini');

const {
    igsCommand
} = require('./commands/igs');

const {
    anticallCommand
} = require('./commands/anticall');

const {
    pmblockerCommand
} = require('./commands/pmblocker');

const settingsCommand =
    require('./commands/settings');

const soraCommand =
    require('./commands/sora');


// ══════════════════════════════════════════════════════════════
// GLOBAL CONFIGURATION
// ══════════════════════════════════════════════════════════════

global.packname = settings.packname || 'CASSIUSV6';
global.author = settings.author || 'CASSIUSV6';

global.channelLink =
    'https://whatsapp.com/channel/0029VbAnuvT6RGJ9Qrf3NJ0L';

global.ytch = 'CASSIUSV6';

const BOT_NAME =
    settings.botName ||
    settings.name ||
    'CASSIUSV6 BOT';

const PREFIX = '.';


// ══════════════════════════════════════════════════════════════
// CHANNEL INFORMATION
// ══════════════════════════════════════════════════════════════

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid:
                '120363420656466131@newsletter',
            newsletterName:
                'CASSIUSV6 BOT',
            serverMessageId: -1
        }
    }
};


// ══════════════════════════════════════════════════════════════
// DATABASE HELPERS
// ══════════════════════════════════════════════════════════════

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, {
            recursive: true
        });
    }
}

function readJSON(file, fallback = {}) {
    try {
        ensureDataDirectory();

        const filePath =
            path.join(DATA_DIR, file);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(
                filePath,
                JSON.stringify(
                    fallback,
                    null,
                    2
                )
            );

            return fallback;
        }

        return JSON.parse(
            fs.readFileSync(
                filePath,
                'utf8'
            )
        );
    } catch (error) {
        console.error(
            `Database read error (${file}):`,
            error
        );

        return fallback;
    }
}

function writeJSON(file, data) {
    try {
        ensureDataDirectory();

        fs.writeFileSync(
            path.join(DATA_DIR, file),
            JSON.stringify(
                data,
                null,
                2
            )
        );

        return true;
    } catch (error) {
        console.error(
            `Database write error (${file}):`,
            error
        );

        return false;
    }
}


// ══════════════════════════════════════════════════════════════
// MESSAGE EXTRACTION
// ══════════════════════════════════════════════════════════════

function getMessageText(message) {
    if (!message?.message) {
        return '';
    }

    return (
        message.message.conversation ||

        message.message.extendedTextMessage?.text ||

        message.message.imageMessage?.caption ||

        message.message.videoMessage?.caption ||

        message.message.documentMessage?.caption ||

        message.message.buttonsResponseMessage?.selectedButtonId ||

        message.message.listResponseMessage?.singleSelectReply?.selectedRowId ||

        message.message.templateButtonReplyMessage?.selectedId ||

        ''
    ).trim();
}


// ══════════════════════════════════════════════════════════════
// SENDER INFORMATION
// ══════════════════════════════════════════════════════════════

function getSenderId(message) {
    return (
        message?.key?.participant ||
        message?.key?.remoteJid ||
        ''
    );
}

function getChatId(message) {
    return message?.key?.remoteJid || '';
}

function isGroupChat(chatId) {
    return (
        typeof chatId === 'string' &&
        chatId.endsWith('@g.us')
    );
}


// ══════════════════════════════════════════════════════════════
// SAFE COMMAND EXECUTION
// ══════════════════════════════════════════════════════════════

async function executeCommand(
    name,
    handler,
    sock,
    chatId,
    message,
    ...args
) {
    try {
        if (typeof handler !== 'function') {
            console.warn(
                `Command "${name}" is unavailable.`
            );

            await sock.sendMessage(
                chatId,
                {
                    text:
                        `❌ The *${name}* command is not available on this installation.`
                },
                channelInfo
            );

            return false;
        }

        await handler(
            sock,
            chatId,
            message,
            ...args
        );

        return true;

    } catch (error) {
        console.error(
            `Error in ${name}:`,
            error
        );

        await sendError(
            sock,
            chatId
        );

        return false;
    }
}


// ══════════════════════════════════════════════════════════════
// ERROR MESSAGE
// ══════════════════════════════════════════════════════════════

async function sendError(
    sock,
    chatId
) {
    try {
        await sock.sendMessage(
            chatId,
            {
                text:
                    '❌ Something went wrong while processing that command.\n\nPlease try again.'
            },
            channelInfo
        );
    } catch (error) {
        console.error(
            'Unable to send error:',
            error
        );
    }
}


// ══════════════════════════════════════════════════════════════
// MAIN MESSAGE HANDLER
// ══════════════════════════════════════════════════════════════

async function handleMessages(
    sock,
    messageUpdate,
    printLog
) {
    try {

        if (
            !messageUpdate ||
            !Array.isArray(
                messageUpdate.messages
            )
        ) {
            return;
        }

        if (
            messageUpdate.type &&
            messageUpdate.type !== 'notify'
        ) {
            return;
        }

        const message =
            messageUpdate.messages[0];

        if (
            !message ||
            !message.message
        ) {
            return;
        }

        const chatId =
            getChatId(message);

        if (!chatId) {
            return;
        }

        const senderId =
            getSenderId(message);

        const isGroup =
            isGroupChat(chatId);

        const rawText =
            getMessageText(message);

        if (!rawText) {
            return;
        }

        const userMessage =
            rawText
                .toLowerCase()
                .replace(/\.\s+/g, '.')
                .trim();

        const isCommand =
            userMessage.startsWith(PREFIX);

        // ─────────────────────────────────────────────
        // AUTOREAD
        // ─────────────────────────────────────────────

        try {
            await handleAutoread(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Autoread error:',
                error
            );
        }


        // ─────────────────────────────────────────────
        // STORE MESSAGE
        // ─────────────────────────────────────────────

        try {
            storeMessage(message);
        } catch (error) {
            console.error(
                'Store message error:',
                error
            );
        }


        // ─────────────────────────────────────────────
        // MESSAGE REVOCATION
        // ─────────────────────────────────────────────

        if (
            message.message
                ?.protocolMessage
                ?.type === 0
        ) {
            try {
                await handleMessageRevocation(
                    sock,
                    message
                );
            } catch (error) {
                console.error(
                    'Message revocation error:',
                    error
                );
            }

            return;
        }


        // ─────────────────────────────────────────────
        // SUDO
        // ─────────────────────────────────────────────

        let senderIsSudo = false;

        try {
            senderIsSudo =
                await isSudo(senderId);
        } catch (error) {
            console.error(
                'Sudo check error:',
                error
            );
        }


        // ─────────────────────────────────────────────
        // PUBLIC / PRIVATE MODE
        // ─────────────────────────────────────────────

        try {

            const messageCount =
                readJSON(
                    'messageCount.json',
                    {
                        isPublic: true
                    }
                );

            if (
                messageCount.isPublic === false &&
                !message.key.fromMe &&
                !senderIsSudo
            ) {
                return;
            }

        } catch (error) {
            console.error(
                'Access mode error:',
                error
            );
        }


        // ─────────────────────────────────────────────
        // BAN CHECK
        // ─────────────────────────────────────────────

        try {

            if (
                isBanned(senderId) &&
                !userMessage.startsWith('.unban')
            ) {
                return;
            }

        } catch (error) {
            console.error(
                'Ban check error:',
                error
            );
        }


        // ─────────────────────────────────────────────
        // LOG
        // ─────────────────────────────────────────────

        if (isCommand) {
            console.log(
                `📝 ${isGroup ? 'GROUP' : 'PRIVATE'} | ${rawText}`
            );
        }


        // ═════════════════════════════════════════════
        // AUTOMATIC FEATURES
        // ═════════════════════════════════════════════

        try {
            await handleAutotypingForMessage(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Autotyping error:',
                error
            );
        }

        try {
            await handleAutorecordingForMessage(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Autorecording error:',
                error
            );
        }

        try {
            await handleLinkDetection(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Antilink error:',
                error
            );
        }

        try {
            await handleTagDetection(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Antitag error:',
                error
            );
        }

        try {
            await handleBadwordDetection(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Badword handler error:',
                error
            );
        }

        try {
            await handleChatbotResponse(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Chatbot error:',
                error
            );
        }

        try {
            await handleHeart(
                sock,
                message
            );
        } catch (error) {
            console.error(
                'Heart handler error:',
                error
            );
        }


        // ═════════════════════════════════════════════
        // NON-COMMAND GAME HANDLERS
        // ═════════════════════════════════════════════

        try {
            await handleTicTacToeMove(
                sock,
                chatId,
                message,
                rawText
            );
        } catch (error) {
            console.error(
                'TicTacToe error:',
                error
            );
        }

        try {
            await guessLetter(
                sock,
                chatId,
                senderId,
                rawText
            );
        } catch (error) {
            console.error(
                'Hangman error:',
                error
            );
        }

        try {
            await answerTrivia(
                sock,
                chatId,
                senderId,
                rawText
            );
        } catch (error) {
            console.error(
                'Trivia error:',
                error
            );
        }


        // No command? Stop here.
        if (!isCommand) {
            return;
        }


        // ═════════════════════════════════════════════
        // COMMAND PROCESSING
        // ═════════════════════════════════════════════

        const commandText =
            userMessage.slice(
                PREFIX.length
            );

        const command =
            commandText
                .split(/\s+/)[0]
                .toLowerCase();

        const args =
            commandText
                .split(/\s+/)
                .slice(1);

        const text =
            args.join(' ');

        let commandExecuted = false;


        // ═════════════════════════════════════════════
        // BASIC COMMANDS
        // ═════════════════════════════════════════════

        if (
            command === 'menu' ||
            command === 'help'
        ) {

            await executeCommand(
                command,
                menuCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'menu2'
        ) {

            await executeCommand(
                command,
                menu2Command,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'ping'
        ) {

            await executeCommand(
                command,
                pingCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'alive'
        ) {

            await executeCommand(
                command,
                aliveCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'owner'
        ) {

            await executeCommand(
                command,
                ownerCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // DOWNLOAD COMMANDS
        // ═════════════════════════════════════════════

        else if (
            command === 'tiktok' ||
            command === 'tt'
        ) {

            await executeCommand(
                'tiktok',
                tiktokCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'instagram' ||
            command === 'ig'
        ) {

            await executeCommand(
                'instagram',
                instagramCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'facebook' ||
            command === 'fb'
        ) {

            await executeCommand(
                'facebook',
                facebookCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'spotify'
        ) {

            await executeCommand(
                'spotify',
                spotifyCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'play'
        ) {

            await executeCommand(
                'play',
                playCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'song'
        ) {

            await executeCommand(
                'song',
                songCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'apk'
        ) {

            await executeCommand(
                'apk',
                apkCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'url'
        ) {

            await executeCommand(
                'url',
                urlCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // AI COMMANDS
        // ═════════════════════════════════════════════

        else if (
            command === 'ai' ||
            command === 'ask'
        ) {

            await executeCommand(
                'ai',
                aiCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'llama3'
        ) {

            await executeCommand(
                'llama3',
                llama3Command,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'sora'
        ) {

            await executeCommand(
                'sora',
                soraCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // MEDIA
        // ═════════════════════════════════════════════

        else if (
            command === 'sticker' ||
            command === 's'
        ) {

            await executeCommand(
                'sticker',
                require('./commands/sticker'),
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'simage'
        ) {

            await executeCommand(
                'simage',
                simageCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'attp'
        ) {

            await executeCommand(
                'attp',
                attpCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'emojimix'
        ) {

            await executeCommand(
                'emojimix',
                emojimixCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'blur'
        ) {

            await executeCommand(
                'blur',
                blurCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'take'
        ) {

            await executeCommand(
                'take',
                takeCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'stickercrop'
        ) {

            await executeCommand(
                'stickercrop',
                stickercropCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'textmaker'
        ) {

            await executeCommand(
                'textmaker',
                textmakerCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'removebg'
        ) {

            await executeCommand(
                'removebg',
                removebgCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'remini'
        ) {

            await executeCommand(
                'remini',
                reminiCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'imagine'
        ) {

            await executeCommand(
                'imagine',
                imagineCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'video'
        ) {

            await executeCommand(
                'video',
                videoCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'anime'
        ) {

            await executeCommand(
                'anime',
                animeCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // INFORMATION
        // ═════════════════════════════════════════════

        else if (
            command === 'define'
        ) {

            await executeCommand(
                'define',
                defineCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'countryinfo'
        ) {

            await executeCommand(
                'countryinfo',
                countryinfoCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'weather'
        ) {

            await executeCommand(
                'weather',
                weatherCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'news'
        ) {

            await executeCommand(
                'news',
                newsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'github'
        ) {

            await executeCommand(
                'github',
                githubCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'lyrics'
        ) {

            await executeCommand(
                'lyrics',
                lyricsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'quote'
        ) {

            await executeCommand(
                'quote',
                quoteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'fact'
        ) {

            await executeCommand(
                'fact',
                factCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'joke'
        ) {

            await executeCommand(
                'joke',
                jokeCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // GROUP COMMANDS
        // ═════════════════════════════════════════════

        else if (
            command === 'tagall'
        ) {

            await executeCommand(
                'tagall',
                tagAllCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'tag'
        ) {

            await executeCommand(
                'tag',
                tagCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'tagnotadmin'
        ) {

            await executeCommand(
                'tagnotadmin',
                tagNotAdminCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'hidetag'
        ) {

            await executeCommand(
                'hidetag',
                hideTagCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'groupinfo'
        ) {

            await executeCommand(
                'groupinfo',
                groupInfoCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'kick'
        ) {

            await executeCommand(
                'kick',
                kickCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'promote'
        ) {

            await executeCommand(
                'promote',
                promoteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'demote'
        ) {

            await executeCommand(
                'demote',
                demoteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'mute'
        ) {

            await executeCommand(
                'mute',
                muteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'unmute'
        ) {

            await executeCommand(
                'unmute',
                unmuteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'groupname'
        ) {

            await executeCommand(
                'groupname',
                setGroupName,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'groupdescription'
        ) {

            await executeCommand(
                'groupdescription',
                setGroupDescription,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'groupphoto'
        ) {

            await executeCommand(
                'groupphoto',
                setGroupPhoto,
                sock,
                chatId,
                message
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // MODERATION
        // ═════════════════════════════════════════════

        else if (
            command === 'ban'
        ) {

            await executeCommand(
                'ban',
                banCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'unban'
        ) {

            await executeCommand(
                'unban',
                unbanCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'warn'
        ) {

            await executeCommand(
                'warn',
                warnCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'warnings'
        ) {

            await executeCommand(
                'warnings',
                warningsCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'delete'
        ) {

            await executeCommand(
                'delete',
                deleteCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'antibadword'
        ) {

            await executeCommand(
                'antibadword',
                antibadwordCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'antilink'
        ) {

            await executeCommand(
                'antilink',
                require('./commands/antilink'),
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // WELCOME / GOODBYE
        // ═════════════════════════════════════════════

        else if (
            command === 'welcome'
        ) {

            await executeCommand(
                'welcome',
                welcomeCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'goodbye'
        ) {

            await executeCommand(
                'goodbye',
                goodbyeCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // GAMES
        // ═════════════════════════════════════════════

        else if (
            command === 'tictactoe' ||
            command === 'ttt'
        ) {

            await executeCommand(
                'tictactoe',
                tictactoeCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'hangman'
        ) {

            await executeCommand(
                'hangman',
                startHangman,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'trivia'
        ) {

            await executeCommand(
                'trivia',
                startTrivia,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === '8ball'
        ) {

            await executeCommand(
                '8ball',
                eightBallCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'dare'
        ) {

            await executeCommand(
                'dare',
                dareCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'truth'
        ) {

            await executeCommand(
                'truth',
                truthCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // FUN
        // ═════════════════════════════════════════════

        else if (
            command === 'meme'
        ) {

            await executeCommand(
                'meme',
                memeCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'compliment'
        ) {

            await executeCommand(
                'compliment',
                complimentCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'insult'
        ) {

            await executeCommand(
                'insult',
                insultCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'flirt'
        ) {

            await executeCommand(
                'flirt',
                flirtCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'character'
        ) {

            await executeCommand(
                'character',
                characterCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'ship'
        ) {

            await executeCommand(
                'ship',
                shipCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'wasted'
        ) {

            await executeCommand(
                'wasted',
                wastedCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'simp'
        ) {

            await executeCommand(
                'simp',
                simpCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'stupid'
        ) {

            await executeCommand(
                'stupid',
                stupidCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'shayari'
        ) {

            await executeCommand(
                'shayari',
                shayariCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'goodnight'
        ) {

            await executeCommand(
                'goodnight',
                goodnightCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'roseday'
        ) {

            await executeCommand(
                'roseday',
                rosedayCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // TOOLS
        // ═════════════════════════════════════════════

        else if (
            command === 'tts'
        ) {

            await executeCommand(
                'tts',
                ttsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'translate'
        ) {

            await executeCommand(
                'translate',
                handleTranslateCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'ss'
        ) {

            await executeCommand(
                'ss',
                handleSsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'viewonce'
        ) {

            await executeCommand(
                'viewonce',
                viewOnceCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'clear'
        ) {

            await executeCommand(
                'clear',
                clearCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'cleartmp'
        ) {

            await executeCommand(
                'cleartmp',
                clearTmpCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'clearsession'
        ) {

            await executeCommand(
                'clearsession',
                clearSessionCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'igs'
        ) {

            await executeCommand(
                'igs',
                igsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'settings'
        ) {

            await executeCommand(
                'settings',
                settingsCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // BOT CONTROL
        // ═════════════════════════════════════════════

        else if (
            command === 'sudo'
        ) {

            await executeCommand(
                'sudo',
                sudoCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'update'
        ) {

            await executeCommand(
                'update',
                updateCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'dev'
        ) {

            await executeCommand(
                'dev',
                devCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'staff'
        ) {

            await executeCommand(
                'staff',
                staffCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'newsletter'
        ) {

            await executeCommand(
                'newsletter',
                newsletterCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // SPORTS
        // ═════════════════════════════════════════════

        else if (
            command === 'epl'
        ) {

            await executeCommand(
                'epl',
                eplCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // OTHER COMMANDS
        // ═════════════════════════════════════════════

        else if (
            command === 'lucky'
        ) {

            await executeCommand(
                'lucky',
                luckyCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'bible'
        ) {

            await executeCommand(
                'bible',
                bibleCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'biblelist'
        ) {

            await executeCommand(
                'biblelist',
                bibleListCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'check'
        ) {

            await executeCommand(
                'check',
                checkCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'pair'
        ) {

            await executeCommand(
                'pair',
                pairCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'readblocklist'
        ) {

            await executeCommand(
                'readblocklist',
                readBlocklistCommand,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'block'
        ) {

            await executeCommand(
                'block',
                blockUnblockCommand,
                sock,
                chatId,
                message,
                'block'
            );

            commandExecuted = true;

        } else if (
            command === 'unblock'
        ) {

            await executeCommand(
                'unblock',
                blockUnblockCommand,
                sock,
                chatId,
                message,
                'unblock'
            );

            commandExecuted = true;

        } else if (
            command === 'hack'
        ) {

            await executeCommand(
                'hack',
                hackCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'kill'
        ) {

            await executeCommand(
                'kill',
                killCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'topmembers'
        ) {

            await executeCommand(
                'topmembers',
                topMembers,
                sock,
                chatId,
                message
            );

            commandExecuted = true;

        } else if (
            command === 'autostatus'
        ) {

            await executeCommand(
                'autostatus',
                autoStatusCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'anticall'
        ) {

            await executeCommand(
                'anticall',
                anticallCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'pmblocker'
        ) {

            await executeCommand(
                'pmblocker',
                pmblockerCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'stickertelegram'
        ) {

            await executeCommand(
                'stickertelegram',
                stickerTelegramCommand,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;

        } else if (
            command === 'pies' ||
            command === 'pie'
        ) {

            await executeCommand(
                'pies',
                piesCommand || piesAlias,
                sock,
                chatId,
                message,
                text
            );

            commandExecuted = true;
        }


        // ═════════════════════════════════════════════
        // AUTO REACTION
        // ═════════════════════════════════════════════

        if (commandExecuted) {

            try {
                await handleAutotypingForCommand(
                    sock,
                    chatId,
                    message
                );
            } catch (error) {
                console.error(
                    'Command typing error:',
                    error
                );
            }

            try {
                await handleAutorecordingForCommand(
                    sock,
                    chatId,
                    message
                );
            } catch (error) {
                console.error(
                    'Command recording error:',
                    error
                );
            }

            return;
        }


        // ═════════════════════════════════════════════
        // UNKNOWN COMMAND
        // ═════════════════════════════════════════════

        await sock.sendMessage(
            chatId,
            {
                text:
                    `❌ Unknown command: *${PREFIX}${command}*\n\n` +
                    `Use *${PREFIX}menu* to view available commands.`
            },
            channelInfo
        );

    } catch (error) {

        console.error(
            'MAIN MESSAGE HANDLER ERROR:',
            error
        );

        try {
            const chatId =
                messageUpdate
                    ?.messages?.[0]
                    ?.key
                    ?.remoteJid;

            if (chatId) {
                await sendError(
                    sock,
                    chatId
                );
            }

        } catch (sendErrorException) {
            console.error(
                'Fatal response error:',
                sendErrorException
            );
        }
    }
}


// ══════════════════════════════════════════════════════════════
// GROUP PARTICIPANT EVENTS
// ══════════════════════════════════════════════════════════════

async function handleGroupParticipantUpdate(
    sock,
    update
) {

    try {

        const {
            id,
            participants,
            action
        } = update;

        if (!id || !participants?.length) {
            return;
        }

        const groupMetadata =
            await sock.groupMetadata(id);

        const groupName =
            groupMetadata.subject;

        for (
            const participant
            of participants
        ) {

            const user =
                participant.split('@')[0];

            if (
                action === 'add' &&
                isWelcomeOn(id)
            ) {

                await sock.sendMessage(
                    id,
                    {
                        text:
                            `👋 Welcome @${user} to *${groupName}*!\n\n` +
                            `Enjoy your stay and follow the group rules.`,
                        mentions: [
                            participant
                        ]
                    },
                    channelInfo
                );
            }

            if (
                action === 'remove' &&
                isGoodByeOn(id)
            ) {

                await sock.sendMessage(
                    id,
                    {
                        text:
                            `👋 Goodbye @${user}!\n\n` +
                            `Thanks for being part of *${groupName}*.`,
                        mentions: [
                            participant
                        ]
                    },
                    channelInfo
                );
            }
        }

    } catch (error) {

        console.error(
            'Group participant update error:',
            error
        );
    }
}


// ══════════════════════════════════════════════════════════════
// STATUS HANDLER
// ══════════════════════════════════════════════════════════════

async function handleStatus(
    sock,
    status
) {

    try {

        if (
            typeof handleStatusUpdate ===
            'function'
        ) {
            await handleStatusUpdate(
                sock,
                status
            );
        }

    } catch (error) {

        console.error(
            'Status handler error:',
            error
        );
    }
}


// ══════════════════════════════════════════════════════════════
// EXPORTS
// ══════════════════════════════════════════════════════════════

module.exports = {

    handleMessages,

    handleGroupParticipantUpdate,

    handleStatus

};
