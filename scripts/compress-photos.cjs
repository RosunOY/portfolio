const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const files = fs.readdirSync(publicDir);

// 找出所有个人照片和照片.png
const photoFiles = files.filter(
  (f) => f.startsWith("个人照片") && f.match(/\.(jpg|jpeg|png)$/i),
);

// 也包含照片.png
if (fs.existsSync(path.join(publicDir, "照片.png"))) {
  photoFiles.push("照片.png");
}

console.log(`Found ${photoFiles.length} photos to convert`);

async function convertToWebP() {
  for (const file of photoFiles) {
    const inputPath = path.join(publicDir, file);
    const outputFile = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const outputPath = path.join(publicDir, outputFile);

    try {
      await sharp(inputPath)
        .resize(800, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(
        1,
      );

      console.log(`✓ ${file} -> ${outputFile} (saved ${saved}%)`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }
}

convertToWebP();
