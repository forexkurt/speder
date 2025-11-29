import Iyzipay from 'iyzipay';

export const iyzico = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || '',
    secretKey: process.env.IYZICO_SECRET_KEY || '',
    uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
});

// Helper function to create payment
export async function createPayment(params: {
    price: string;
    paidPrice: string;
    currency: string;
    basketId: string;
    paymentCard: any;
    buyer: any;
    shippingAddress: any;
    billingAddress: any;
    basketItems: any[];
}) {
    return new Promise((resolve, reject) => {
        iyzico.payment.create(params, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Helper function to create checkout form
export async function createCheckoutForm(params: {
    locale: string;
    conversationId: string;
    price: string;
    paidPrice: string;
    currency: string;
    basketId: string;
    paymentGroup: string;
    callbackUrl: string;
    enabledInstallments: number[];
    buyer: any;
    shippingAddress: any;
    billingAddress: any;
    basketItems: any[];
}) {
    return new Promise((resolve, reject) => {
        iyzico.checkoutFormInitialize.create(params, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
