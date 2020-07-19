const fs = require("fs");
const path = require("path");

function walk(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      walk(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function addJsExtentionToImport(file) {
  const data = fs.readFileSync(file, "utf-8");
  const fixedData = data.replace(/from "(.*)"/gi, "from '$1.js'");

  fs.writeFileSync(file, fixedData, "utf-8");

  console.log(`Fixing ${file}...`);
}

walk("./dist", /\.js$/).map(addJsExtentionToImport);

console.log("Done");
