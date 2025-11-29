declare module 'iyzipay' {
    export default class Iyzipay {
        constructor(config: {
            apiKey: string;
            secretKey: string;
            uri: string;
        });

        payment: {
            create: (params: any, callback: (err: any, result: any) => void) => void;
        };

        checkoutFormInitialize: {
            create: (params: any, callback: (err: any, result: any) => void) => void;
        };

        checkoutForm: {
            retrieve: (params: { token: string }, callback: (err: any, result: any) => void) => void;
        };
    }
}
