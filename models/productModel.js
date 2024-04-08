let products = require("../data/products"); // appeler les données dans le fichier products.js
const { v4: uuidv4 } = require("uuid"); // appeler la fonction uuidv4 pour générer un id unique
const { writeDataToFile } = require("../utils"); // appeler la fonction writeDateToFile pour écrire les données dans un fichier

// déclarer la fonction findAll pour retourner tous les produits
// la fonction retourne une promesse qui sera résolue avec les produits
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id); // ici on utilise la méthode find() pour trouver un produit par son id
    // (p) correspond à chaque produit dans le tableau products ensuite fonction pour aller chercher
    // le p.id qui correspond === à l'id du produit
    resolve(product); // retourner le produit
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { ...product, id: uuidv4() }; // créer un nouveau produit avec un id unique*
    products.push(newProduct); // ajouter le nouveau produit au tableau products
    writeDataToFile("./data/products.json", products); // écrire les données dans le fichier products.json
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", products);
    }
    resolve(products[index]);
  });
}

function remove(id, product) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", products);
    resolve();
  });
}

// Exporter la fonction find pour l'appeler dans d'autres fichiers
module.exports = { findAll, findById, create, update, remove };
