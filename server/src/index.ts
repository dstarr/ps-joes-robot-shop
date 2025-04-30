import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { Product } from './Product';

const app = express();
const port = process.env.PORT || 3000;

// Add JSON middleware
app.use(express.json());
app.use(cors());

// In-memory cart storage
let cartItems: Product[] = [];

app.get('/api/products', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'products-data.json');
        console.log('Attempting to read file from:', filePath);
        
        const data = await readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error reading products data:', errorMessage);
        res.status(500).json({ 
            error: 'Failed to fetch products',
            details: errorMessage 
        });
    }
});

// Cart routes
app.get('/api/cart', (req, res) => {
    try {
        console.log('GET /api/cart - Current cart items:', cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error('Error getting cart items:', error);
        res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
});

app.post('/api/cart', (req, res) => {
    try {
        const newItems = req.body as Product[];
        console.log('POST /api/cart - Received items:', newItems);
        cartItems = newItems;
        res.status(201).json(cartItems);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error updating cart:', errorMessage);
        res.status(400).json({ error: 'Failed to update cart', details: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
