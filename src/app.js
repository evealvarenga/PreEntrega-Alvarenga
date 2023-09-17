import express from 'express'
const app = express();
import ProductManager from './ProductManager.js';

const manager = new ProductManager('./src/productos.json');

// Endpoint para obtener productos
app.get('/products', async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await manager.getProducts();
  
      if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener los productos.' });
    }
  });

  // Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await manager.getProductsByID(parseInt(pid));
  
      if (typeof product === 'string') {
        res.status(404).json({ error: product });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto.' });
    }
  });
  
app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`);
});