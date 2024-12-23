import { Request, Response } from 'express';
import { getProductList, checkout } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getProductList();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

export const checkoutProducts = async (req: Request, res: Response) => {
    try {
        const results = await checkout(req.body.items);
        res.status(200).json({ message: 'Checkout completed.', results: results });
    } catch (error) {
        res.status(500).json({ error: 'Checkout failed.' });
    }
};
