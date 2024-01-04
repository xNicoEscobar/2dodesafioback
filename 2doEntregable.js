const fs = require("fs");

class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.ProductId = 1;
    this.path = "./product.JSON";
  }

  addProduct(title, description, price, thumbnail, sku, stock) {
    if (!title || !description || !price || !thumbnail || !sku || !stock) {
      console.log("todos los campos son obligatorios");
    } else if (!this.products.some((p) => p.code === sku)) {
      let newProduct = {
        id: this.ProductId++,
        title,
        description,
        price,
        thumbnail,
        code: sku,
        stock,
      };

      this.products.push(newProduct);
    } else {
      console.log(`El código ${sku} ya existe!`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsFs() {
    fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        let productString = JSON.parse(res);
        console.log(productString);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProductsById(id) {
    fs.promises.readFile(this.path, "utf-8")
      .then((res) => {
        let products = JSON.parse(res);
        let productId = products.find((product) => product.id === id);
        console.log(productId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProduct(id, contentUpdated) {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        Object.assign(products[productIndex], contentUpdated);

        await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2),"utf-8");

        console.log(`Producto con ID ${id} actualizado!.`);
      } else {
        console.log(`Producto con ID: ${id} no encontrado.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  saveProductsInFs() {
    const content = JSON.stringify(product.getProducts(), null, 2);
    try {
      fs.promises.writeFile("product.JSON", content, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id){

    try{
      const content = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(content);

    const productId = products.findIndex((product) => product.id === id);

    if(productId){
      products.splice(productId, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null , 2), 'utf-8');
      console.log(`Producto con id: ${id} eliminado!.`)

    }
    else{
      console.log(`Producto con ID: ${id} no encontrado`)
    }

    }
    catch(error){
      console.log("Error ", error);
    }

  }
}

const minimercado = new ProductManager('NicoShop');

minimercado.addProduct('Lechelita', 'Leche deslactosada', 800, 'soy_una_leche_xd.png', '#5293', 10 );
minimercado.addProduct('JackDaniels', 'Un poco de prestigio', 300000, 'soy_super_expensive.png', '#1223', 4 );
minimercado.addProduct('Pitusas', 'Las galletitas mas nobles del mundo', 400, 'pitusas.png', '#2593', 4 );
minimercado.addProduct('Coca Cola', 'Formula ultrasecreta pero deliciosa 😋', 600, 'soy_una_coca.png', '#1269', 4 );