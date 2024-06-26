const Product = require("../models/productModel");
const { getPostData } = require("../utils");

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
    const body = await getPostData(requete); // appeler la fonction getPostData pour extraire le body de la requête

    const { name, description, price } = JSON.parse(body); // extraire les données du body

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    reponse.writeHead(201, { "Content-Type": "application/json" });
    return reponse.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc Update product
// @route PUT /api/products/:id
async function updateProduct(requete, reponse, id) {
  try {
    const product = await Product.findById(id); // appeler la fonction find() du modèle Product
    if (!product) {
      reponse.writeHead(404, { "Content-Type": "application/json" }); // écris dans le header de la réponse
      reponse.end(JSON.stringify({ message: "Produit non trouve" }));
    } else {
      const body = await getPostData(requete); // appeler la fonction getPostData pour extraire le body de la requête

      const { name, description, price } = JSON.parse(body); // extraire les données du body

      const productData = {
        name: name || product.name, // pour ne pas être oligé de remplir tous les champs pour faire le update
        description: description || product.description,
        price: price || product.price,
      };

      const updateProduct = await Product.update(id, productData);

      reponse.writeHead(200, { "Content-Type": "application/json" });
      return reponse.end(JSON.stringify(updateProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete product
// @route DELETE /api/products/:id
async function deleteProduct(requete, reponse, id) {
  try {
    const product = await Product.findById(id); // appeler la fonction find() du modèle Product

    if (!product) {
      reponse.writeHead(404, { "Content-Type": "application/json" }); // écris dans le header de la réponse
      reponse.end(JSON.stringify({ message: "Produit non trouve" })); // envoyer la réponse au client
    } else {
      await Product.remove(id); // appeler la fonction remove() du modèle Product
      reponse.writeHead(200, { "Content-Type": "application/json" }); // écris dans le header de la réponse
      reponse.end(
        JSON.stringify({ message: `Le produit ${id} a été supprimé` })
      ); // envoyer la réponse au client
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
