const fs = require("fs");

class Cart {
    constructor() {
        this.id = 0; // Se actualizará en `addCart`
        this.products = [];
    }
}

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

        if (fs.existsSync(this.path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                console.log("Error al leer el archivo:", error);
            }
        }
    }

    async addCart() {
        const newId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
        const newCart = new Cart();
        newCart.id = newId;

        this.carts.push(newCart);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"));
            console.log("Se agregó el carrito correctamente");
            return newCart;
        } catch (error) {
            console.log("Error al escribir en el archivo:", error);
        }
    }

    getCartById(idCart) {
        const cart = this.carts.find((cart) => cart.id == idCart);

        if (!cart) {
            console.log("No se encuentra el carrito");
            return;
        }

        return cart;
    }

    async addProductToCart(idCart, idProduct) {
        const cart = this.getCartById(idCart);

        if (!cart) {
            console.log("No se encontró el carrito");
            return;
        }

        const productInCart = cart.products.find(p => p.product == idProduct);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: idProduct, quantity: 1 });
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"));
            console.log("Se agregó el producto al carrito correctamente");
            return cart;
        } catch (error) {
            console.log("Error al escribir en el archivo:", error);
        }
    }
}

module.exports = new CartManager("./data/carts.json");
