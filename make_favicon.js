const sharp = require("sharp");
sharp("site/favicon.svg").resize(32, 32).png().toFile("site/favicon.png");
sharp("site/favicon.svg").resize(180, 180).png().toFile("site/apple-touch-icon.png");
