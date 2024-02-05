export const config = {
    public_key: process.env.FLUTTERWAVE_PUBLIC_KEY ?? "",
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
        email: "user@gmail.com",
        phone_number: "070********",
        name: "john doe",
    },
    customizations: {
        title: "My store",
        description: "Payment for items in cart",
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
};