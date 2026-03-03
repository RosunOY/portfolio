import fs from "fs";
import pdf from "pdf-parse";

const dataBuffer = fs.readFileSync("./AI游戏开发-欧阳志胜.pdf");
pdf(dataBuffer)
  .then((data) => {
    console.log(data.text);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
