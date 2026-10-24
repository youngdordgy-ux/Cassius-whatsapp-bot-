const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const bannedPath = path.join(dataDir, 'banned.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(bannedPath)) {
    fs.writeFileSync(bannedPath, '[]');
}

function isBanned(sender) {
    try {
        const data = fs.readFileSync(bannedPath, 'utf8');
        const banned = JSON.parse(data);
        return banned.includes(sender);
    } catch (e) {
        return false;
    }
}

module.exports = isBanned;
module.exports.isBanned = isBanned;
module.exports.banUser = (sender) => {
    let banned = JSON.parse(fs.readFileSync(bannedPath));
    if (!banned.includes(sender)) {
        banned.push(sender);
        fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));
    }
};
module.exports.unbanUser = (sender) => {
    let banned = JSON.parse(fs.readFileSync(bannedPath));
    banned = banned.filter(x => x !== sender);
    fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));
};
