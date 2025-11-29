import { NextResponse } from "next/server";
import { iyzico } from "@/lib/iyzico";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token, status, paymentId, conversationId } = body;

        // iyzico callback'ten gelen token'ı doğrula
        if (!token) {
            return new NextResponse("Token is required", { status: 400 });
        }

        // Ödeme sonucunu kontrol et
        const result: any = await new Promise((resolve, reject) => {
            iyzico.checkoutForm.retrieve({ token }, (err: any, result: any) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Ödeme başarılı mı kontrol et
        if (result.status === "success" && result.paymentStatus === "SUCCESS") {
            const userId = result.basketId; // basketId olarak userId gönderdik

            if (!userId) {
                return new NextResponse("User id is required", { status: 400 });
            }

            // Kullanıcıyı güncelle
            await prisma.user.update({
                where: {
                    externalId: userId,
                },
                data: {
                    stripeCustomerId: result.paymentId, // iyzico payment ID'sini saklıyoruz
                    isSubscribed: true,
                    subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
                },
            });

            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new NextResponse("Payment failed", { status: 400 });
    } catch (error: any) {
        console.error("iyzico webhook error:", error);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }
}
