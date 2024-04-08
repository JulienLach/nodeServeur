const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const server = http.createServer((requete, reponse) => {
  if (requete.url === "/api/products" && requete.method === "GET") {
    getProducts(requete, reponse);
  } else if (
    requete.url.match(/\/api\/products\/([0-9]+)/) &&
    requete.method === "GET"
  ) {
    const id = requete.url.split("/")[3]; // extraire l'id de l'URL 3 est l'index de l'id dans l'URL
    getProduct(requete, reponse, id);
  } else if (
    requete.url.match(/\/api\/products\/([0-9]+)/) &&
    requete.method === "PUT"
  ) {
    const id = requete.url.split("/")[3];
    updateProduct(requete, reponse, id);
  } else if (
    requete.url.match(/\/api\/products\/([0-9]+)/) &&
    requete.method === "DELETE"
  ) {
    const id = requete.url.split("/")[3];
    deleteProduct(requete, reponse, id);
  } else if (requete.url === "/api/products" && requete.method === "POST") {
    createProduct(requete, reponse);
  } else {
    reponse.writeHead(404, { "Content-Type": "application/json" }); // écris dans le header de la réponse
    reponse.end(JSON.stringify({ message: "Route non trouvée" })); // envoyer la réponse au client
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server actif sur le port ${PORT}...`));
