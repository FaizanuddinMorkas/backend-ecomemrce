import Product from '../models/product'; // Adjust the path as necessary

// Function to retrieve all products
export const getProductList = async () => {
    try {
        const products = await Product.find({}); // Fetch all products
        return products; // Return the product list
    } catch (error: any) {
        throw new Error('Error retrieving products: ' + error.message);
    }
};

// Function to checkout products
export const checkout = async (items: { id: string; quantity: number }[]) => {
    const results: string[] = [];

    for (const item of items) {
        const product = await Product.findById(item.id);
        if (!product) {
            results.push(`Product with ID ${item.id} not found.`);
            continue;
        }

        if (product.stock < item.quantity) {
            results.push(`Insufficient stock for ${product.name}.`);
            continue;
        }

        product.stock -= item.quantity;
        await product.save();
        results.push(`Checked out ${item.quantity} of ${product.name}.`);
    }

    return results;
};
