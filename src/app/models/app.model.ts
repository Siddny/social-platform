export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PaymentData {
    name: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}