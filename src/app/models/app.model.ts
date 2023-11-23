export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    comments: userComment[];
}

export interface PaymentData {
    name: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

export interface userComment {
    name: string;
    id: number;
    email: string;
    body: string;
    postId: number;
}