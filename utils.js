const fs = require("fs");

function writeDateToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  writeDateToFile,
};
