import crypto from 'crypto';

const IYZICO_API_KEY = process.env.IYZICO_API_KEY || '';
const IYZICO_SECRET_KEY = process.env.IYZICO_SECRET_KEY || '';
const IYZICO_BASE_URL = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

// Generate authorization header
function generateAuthString(url: string, body: any) {
    const randomString = crypto.randomBytes(16).toString('hex');
    const bodyString = JSON.stringify(body);

    const dataToHash = [
        IYZICO_API_KEY,
        randomString,
        IYZICO_SECRET_KEY,
        bodyString
    ].join('');

    const hash = crypto.createHash('sha256').update(dataToHash, 'utf8').digest('base64');

    return {
        authorization: `IYZWS ${IYZICO_API_KEY}:${hash}`,
        'x-iyzi-rnd': randomString,
    };
}

// Make iyzico API request
async function iyzicoRequest(endpoint: string, body: any) {
    const url = `${IYZICO_BASE_URL}${endpoint}`;
    const authHeaders = generateAuthString(url, body);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...authHeaders,
        },
        body: JSON.stringify(body),
    });

    return response.json();
}

// Create checkout form
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
    return iyzicoRequest('/payment/iyzipos/checkoutform/initialize/auth/ecom', params);
}

// Retrieve checkout form result
export async function retrieveCheckoutForm(token: string) {
    return iyzicoRequest('/payment/iyzipos/checkoutform/auth/ecom/detail', {
        locale: 'tr',
        conversationId: Date.now().toString(),
        token
    });
}

