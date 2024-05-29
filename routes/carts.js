const express = require('express');
const router = express.Router();
const cartManager = require('../CartManager');

// POST /api/carts
router.post('/', async (req, res) => {
    const newCart = await cartManager.addCart();
    res.status(201).json(newCart);
});

// GET /api/carts/:cid
router.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.status(201).json(updatedCart);
});

module.exports = router;
