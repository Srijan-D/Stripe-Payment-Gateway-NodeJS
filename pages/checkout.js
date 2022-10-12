import React, { useState } from 'react'
// import Head from 'next/head'
// import Script from 'next/script'
import { loadStripe } from '@stripe/stripe-js'
//changed the next config file to include the stripe public key
import { useSession } from 'next-auth/react'
import axios from 'axios';
const stripePromise = loadStripe("pk_test_51LmOdOSAsh4SL9T9mfjv7LKDsi72utAsVX3DiAVO4Hsog65gXHk4NvrScY9aEKG74Hs3NL7KxVQNKwBkax5yXzOD008szCbldg");
// const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items = [{
        name: "T-shirt",
        price: 1000,
        quantity: 1,
        description: " This is a t-shirt",
    }, {
        name: " Jeans",
        price: 2000,
        quantity: 1,
        description: " This is a jeans ", 
    }];

    const email = "abcd@gmail.com"
    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        //backend:
        const checkoutSession = await axios.post("/api/create-checkout-session",
            {
                items: items,
                // email: session.user.email
                email: email

            })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        // redirect to stripe checkout
        if (result.error) {
            alert(result.error.message);
        }
        

    }

    return (
        <>
            <h1>Checkout Page</h1>
            <button onClick={createCheckoutSession}>Proceed to Checkout</button>
        </>
    )
}

export default Checkout




