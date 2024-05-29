const express = require('express');
const app = express();
const PORT = 8800;

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

