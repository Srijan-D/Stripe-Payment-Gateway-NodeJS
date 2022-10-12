import React, { useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
//changed the next config file to include the stripe public key
import { useSession } from 'next-auth/react'
import axios from 'axios';
const stripePromise = loadStripe("Stripe public key");
//Enter your stripe Public key here


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
        //calling the backend:
        const checkoutSession = await axios.post("/api/create-checkout-session",
            {
                items: items,
                // email: session.user.email
               // for the time being useSession hook was not used
                email: email

            })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        // redirect to stripe checkout page
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




