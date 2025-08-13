import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                products: resolve(__dirname, 'src/products/products.html'),
                productsList: resolve(__dirname, 'src/products/product-details.html'),
                checkout: resolve(__dirname, 'src/checkout/index.html'),
                confirmation: resolve(__dirname, 'src/checkout/thankyou.html'),
                cart: resolve(__dirname, 'src/cart/index.html'),
                aboutus: resolve(__dirname, 'src/aboutUs/about-us.html'),

            }
        }
    }
});
