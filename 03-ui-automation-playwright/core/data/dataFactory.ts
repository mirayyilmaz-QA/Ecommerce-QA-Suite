import { productPool } from './product.pool';
import { createGuestUser, createRegisteredUser } from './user.factory';

function pickRandomProduct() {
    return productPool[Math.floor(Math.random() * productPool.length)];
}

export function createCheckoutData() {
    const rawProduct = pickRandomProduct();

    return {
        product: {
            name: rawProduct.name,     // visible product title text in UI
            size: rawProduct.size,     // aria-label value
            color: rawProduct.color    // aria-label value
        },

        guest: {
            shipping: createGuestUser()
        },

        registered: {
            account: createRegisteredUser().account,
            shipping: createRegisteredUser().shipping
        }
    };
}
