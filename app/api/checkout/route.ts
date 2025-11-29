import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createCheckoutForm } from "@/lib/iyzico";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { planName, price } = await req.json();

        // iyzico checkout form parametreleri
        const checkoutFormParams = {
            locale: "tr",
            conversationId: `${userId}-${Date.now()}`,
            price: price.toString(),
            paidPrice: price.toString(),
            currency: "TRY",
            basketId: userId, // userId'yi basketId olarak kullanıyoruz
            paymentGroup: "SUBSCRIPTION" as any,
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/iyzico`,
            enabledInstallments: [1],
            buyer: {
                id: userId,
                name: "Test",
                surname: "User",
                gsmNumber: "+905350000000",
                email: "test@test.com",
                identityNumber: "11111111111",
                registrationAddress: "Test Address",
                ip: "85.34.78.112",
                city: "Istanbul",
                country: "Turkey",
                zipCode: "34732"
            },
            shippingAddress: {
                contactName: "Test User",
                city: "Istanbul",
                country: "Turkey",
                address: "Test Address",
                zipCode: "34732"
            },
            billingAddress: {
                contactName: "Test User",
                city: "Istanbul",
                country: "Turkey",
                address: "Test Address",
                zipCode: "34732"
            },
            basketItems: [
                {
                    id: "1",
                    name: planName,
                    category1: "Subscription",
                    itemType: "VIRTUAL" as any,
                    price: price.toString()
                }
            ]
        };

        const result: any = await createCheckoutForm(checkoutFormParams);

        if (result.status === "success") {
            return NextResponse.json({
                checkoutFormContent: result.checkoutFormContent,
                token: result.token,
                paymentPageUrl: result.paymentPageUrl
            });
        } else {
            return new NextResponse("Payment initialization failed", { status: 400 });
        }
    } catch (error: any) {
        console.error("Checkout error:", error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
