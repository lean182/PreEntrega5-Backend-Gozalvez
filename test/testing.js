import ProductManager from "../productManager.js";

const producto = new ProductManager();

console.log(
  producto.addProduct(
    "Celular",
    "Xiaomi Redmi Note 13 Pro+",
    880000,
    "https://img1.com",
    "f45th4",
    15
  )
);

console.log(
  producto.addProduct(
    "Celular",
    "Xiaomi Poco F5 Pro",
    1110000,
    "https://img1.com",
    "f45th6",
    10
  )
);

console.log(
  producto.addProduct(
    "Celular",
    "Xiaomi Poco F5 Pro",
    1110000,
    "https://img1.com",
    "f45th7",
    10
  )
);

/* console.log(producto.getProducts()); */

/* console.log(producto.getProductById(3)); */

/* console.log(producto.deleteProduct(3)); */

const productoActualizar= {

  "title": "Celular3",
  "description": "Xiaomi Poco F5 Pro+",
  "price": 11200,
  "stock":22
}
console.log(producto.updateProduct (3, productoActualizar));

