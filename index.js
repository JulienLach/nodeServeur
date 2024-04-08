// Méthodes et objets natif de Node.js
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const server = http
  .createServer((requete, reponse) => {
    reponse.write("Test argjson");
    reponse.end();
  })
  .listen(3000);
console.log("Serveur ouvert sur le port 3000");
