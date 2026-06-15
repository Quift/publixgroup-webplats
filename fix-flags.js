const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./site', function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\?\?\?\? EN/g, '🇬🇧 EN');
        content = content.replace(/\?\?\?\? SV/g, '🇸🇪 SV');
        content = content.replace(/\?\?\?\? DA/g, '🇩🇰 DA');
        content = content.replace(/\?\?\?\? NO/g, '🇳🇴 NO');
        content = content.replace(/\?\?\?\? FI/g, '🇫🇮 FI');
        content = content.replace(/\?\?\?\? DE/g, '🇩🇪 DE');
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log('Fixed flags via Node.js');
