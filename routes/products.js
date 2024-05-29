const express = require('express');
const router = express.Router();
const productManager = require('../ProductManager');

// GET /api/products
router.get('/', (req, res) => {
    const products = productManager.getProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// GET /api/products/:pid
router.get('/:pid', (req, res) => {
    const product = productManager.getProductsById(req.params.pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// POST /api/products
router.post('/', async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    const newProduct = new Product(title, description, code, price, status, stock, category, thumbnails);
    await productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    const updatedProduct = req.body;
    await productManager.updateProduct(req.params.pid, updatedProduct);
    res.json(updatedProduct);
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(req.params.pid);
    res.status(204).send();
});

module.exports = router;
