import console from "console";
import fs from "fs";

class ProductManager {
  #products;
  #path;

  constructor() {
    this.#path = "./src/data/productos.json";
    this.#products = this.#leerProductosInFile();
  }

  #asisgnarIdProducto() {
    let id = 1;
    if (this.#products.length != 0)
      id = this.#products[this.#products.length - 1].id + 1;
    return id;
  }

  #leerProductosInFile() {
    try {
      if (fs.existsSync(this.#path))
        return JSON.parse(fs.readFileSync(this.#path, "utf-8"));

      return [];
    } catch (error) {
      console.log(
        `ocurrio un error al momento de LEER el archivo de producto ${error}`
      );
    }
  }

  #guardarArchivo() {
    try {
      fs.writeFileSync(this.#path, JSON.stringify(this.#products));
    } catch (error) {
      console.log(
        `ocurrio un error al momento de GUARDAR el archivo de producto, ${error}`
      );
    }
  }

  addProduct({
    title,
    description,
    price,
    thumbnails = [],
    code,
    stock,
    category,
    status = true,
  }) {
    let result = "Ocurrio un error";

    if (!title || !description || !price || !code || !stock || !category)
      result =
        "Todos los parametros son requeridos [title, description, price, code, stock, category]";
    else {
      const codeRepetido = this.#products.some((p) => p.code == code);
      if (codeRepetido)
        result = `El codigo ${code} ya se encuentra registrado en otro producto`;
      else {
        const id = this.#asisgnarIdProducto();

        const nuevoProducto = {
          id,
          title,
          description,
          price,
          thumbnails,
          code,
          stock,
          category,
          status,
        };

        this.#products.push(nuevoProducto);
        this.#guardarArchivo();
        result = {
          msg: "Producto agregado exitosamente!!",
          producto: nuevoProducto,
        };
      }
    }

    return result;
  }

  getProducts(limit = 666) {
    limit = Number(limit);
    if (limit > 0);
    return this.#products.slice(0, limit);
    return this.#products;
  }

  getProductById(id) {
    let status = false;
    let resp = `El producto con id ${id} no existe!!`;

    const producto = this.#products.find((p) => p.id == id);
    if (producto) {
      status = true;
      resp = producto;
    }

    return { status, resp };
  }

  updateProduct(id, objetUpdate) {
    let result = `El producto con id ${id} no existe`;

    const index = this.#products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const { id, ...rest } = objetUpdate;
      const propiedadesPermitidas = [
        "title",
        "description",
        "price",
        "thumbnails",
        "code",
        "stock",
        "category",
        "status",
      ];
      const propiedadesActualizadas = Object.keys(rest)
        .filter((propiedad) => propiedadesPermitidas.includes(propiedad))
        .reduce((obj, key) => {
          obj[key] = rest[key];
          return obj;
        }, {});
      this.#products[index] = {
        ...this.#products[index],
        ...propiedadesActualizadas,
      };
      this.#guardarArchivo();
      result = {
        msg: "Producto actualizado!",
        producto: this.#products[index],
      };
    }

    return result;
  }

  deleteProduct(id) {
    let msg = `El producto con id ${id} no existe`;

    const index = this.#products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.#products = this.#products.filter((p) => p.id !== id);
      this.#guardarArchivo();
      msg = "Producto Eliminado";
    }
    return msg;
  }
}

export default ProductManager;
