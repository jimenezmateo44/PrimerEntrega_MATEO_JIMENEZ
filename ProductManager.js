const fs = require("fs");


class Product {
    constructor(title, description, code, price, status, stock, category, thumbnails) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

        if (fs.existsSync(this.path)) {
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch(error) {
                console.log("Error al leer el archivo:", error);
            }
        }
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnails) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        product.id = newId;

        this.products.push(product);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Se agregó el producto correctamente");
        } catch (error) {
            console.log("Error al escribir en el archivo:", error);
        }
    }
    
    getProducts() {
        return this.products;
    }

    getProductsById(idProduct) {
        const product = this.products.find((product) => product.id == idProduct);

        if (!product) {
            console.log("No se encuentra el producto");
            return;
        }

        return product; 
    }

    async deleteProduct(idProduct) {
        const productIndex = this.products.findIndex((product) => product.id == idProduct);

        if (productIndex == -1) {
            console.log("No se encontró el producto");
            return;
        }

        this.products.splice(productIndex, 1);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Se eliminó el producto correctamente");
        } catch(error) {
            console.log("Error al escribir en el archivo:", error);
        }
    }

    async updateProduct(idProduct, updatedProduct) {
        const productIndex = this.products.findIndex((product) => product.id == idProduct);

        if (productIndex == -1) {
            console.log("No se encontró el producto");
            return;
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedProduct,
        };

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Se actualizó el producto correctamente");
        } catch(error) {
            console.log("Error al escribir en el archivo:", error);
        }
    }
}

module.exports = new ProductManager("./data/products.json");


// const manager = new ProductManager("./data/products.json");

// manager.addProduct(
//     new Product("producto 1", "descripcion", "1231", 1231, true, 10, "campera", [] )
// );

// console.log(manager.getProducts());