const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const bannedPath = path.join(dataDir, 'banned.json');

// Create data folder if not exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Create banned.json if not exists
if (!fs.existsSync(bannedPath)) {
    fs.writeFileSync(bannedPath, '[]');
}

function isBanned(sender) {
    try {
        const banned = JSON.parse(fs.readFileSync(bannedPath));
        return banned.includes(sender);
    } catch (e) {
        return false;
    }
}

module.exports = isBanned;
