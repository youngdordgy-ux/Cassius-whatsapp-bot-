require('dotenv').config();

global.APIs = {
    xteam: 'https://api.xteam.xyz',
    dzx: 'https://api.dhamzxploit.my.id',
    lol: 'https://api.lolhuman.xyz',
    violetics: 'https://violetics.pw',
    neoxr: 'https://api.neoxr.my.id',
    zenzapis: 'https://zenzapis.xyz',
    akuari: 'https://api.akuari.my.id',
    akuari2: 'https://apimu.my.id',
    nrtm: 'https://fg-nrtm.ddns.net',
    bg: 'http://bochil.ddns.net',
    fgmods: 'https://api-fgmods.ddns.net'
};

global.APIKeys = {
    'https://api.xteam.xyz': 'd90a9e986e18778b',
    'https://api.lolhuman.xyz': '85faf717d0545d140',
    'https://api.neoxr.my.id': 'yourkey',
    'https://violetics.pw': 'beta',
    'https://zenzapis.xyz': 'yourkey',
    'https://api-fgmods.ddns.net': 'fg-dylux'
};

// ===== CASSIUS MD V1.0.1 - PROFESSIONAL BRANDING =====
global.botName = "CASSIUS MD V1.0.1";
global.ownerName = "Cassius";
global.ownerNumber = "27686836786"; // change to your number
global.prefix = ".";
global.packName = "CASSIUS MD";
global.packAuthor = "By Cassius Tech";
global.watermark = "© CASSIUS MD V1.0.1";
global.author = "Cassius Tech";
global.footer = "Powered by Cassius Tech";
global.channelLink = "https://whatsapp.com/channel/0029VbDeT5tKwqSM5FGMaK3p";
global.menuImage = "https://files.catbox.moe/kknq4e.jpg.jpg"; // <-- PUT YOUR IMAGE LINK HERE
global.botImage = "https://files.catbox.moe/kknq4e.jpg.jpg";

module.exports = {
    WARN_COUNT: 3,
    APIs: global.APIs,
    APIKeys: global.APIKeys,
    botName: global.botName,
    ownerName: global.ownerName,
    packName: global.packName,
    watermark: global.watermark
};
