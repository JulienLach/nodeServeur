const fs = require("fs");

// Fonction pour écrire les données dans le fichier JSON des produits
function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// Fonction pour extraire le body de la requête
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
