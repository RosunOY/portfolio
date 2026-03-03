const fs = require("fs");
const pdfParse = require("pdf-parse");

const dataBuffer = fs.readFileSync("./AI游戏开发-欧阳志胜.pdf");
const pdf = pdfParse.default || pdfParse;

pdf(dataBuffer)
  .then((data) => {
    console.log(data.text);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
