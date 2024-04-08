const Product = require("../models/productModel");

// @desc Get all products
// @route GET /api/products
async function getProducts(requete, reponse) {
  try {
    const products = await Product.findAll(); // appeler la fonction find() du modèle Product

    reponse.writeHead(200, { "Content-Type": "application/json" }); // écris dans le header de la réponse
    reponse.end(JSON.stringify(products)); // envoyer la réponse au client
  } catch (error) {
    console.log(error);
  }
}

// @desc Get single product
// @route GET /api/products/:id
async function getProduct(requete, reponse, id) {
  try {
    const product = await Product.findById(id); // appeler la fonction find() du modèle Product

    if (!product) {
      reponse.writeHead(404, { "Content-Type": "application/json" }); // écris dans le header de la réponse
      reponse.end(JSON.stringify({ message: "Produit non trouve" })); // envoyer la réponse au client
    } else {
      reponse.writeHead(200, { "Content-Type": "application/json" }); // écris dans le header de la réponse
      reponse.end(JSON.stringify(product)); // envoyer la réponse au client
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a product
// @route POST /api/products
async function createProduct(requete, reponse) {
  try {
    const product = {
      // pour tester la création d'un produit on crée un objet product avec des valeurs
      name: "Nouveau produit",
      description: "Description du nouveau produit",
      price: 100,
    };
    const newProduct = Product.create(product);
    reponse.writeHead(201, { "Content-Type": "application/json" });
    return reponse.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getProducts, getProduct };
