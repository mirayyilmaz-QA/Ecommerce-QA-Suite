export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    stock: number;
}

export interface Cart {
    products: {
        id: number;
        quantity: number;
    }[];
    total: number;
}

