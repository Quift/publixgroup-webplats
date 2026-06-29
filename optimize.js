const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = './site';

async function processDir(currentPath) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      try {
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
          const tempPath = fullPath + '.tmp';
          if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(fullPath).jpeg({ quality: 75, progressive: true }).toFile(tempPath);
          } else if (ext === '.png') {
            await sharp(fullPath).png({ quality: 80, compressionLevel: 9, adaptiveFiltering: true }).toFile(tempPath);
          }
          fs.renameSync(tempPath, fullPath);
          console.log('Optimized: ' + fullPath);
        }
      } catch (err) {
        console.error('Error processing ' + fullPath, err);
      }
    }
  }
}

processDir(dir).catch(console.error);
