const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Stripe checkout session endpoint
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { services, formData, pricing } = req.body;

    // Create line items
    const lineItems = services.map(service => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: service.name,
          description: `${service.category} service`,
        },
        unit_amount: Math.round(service.basePrice * 100), // Convert to cents
      },
      quantity: 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/cancel`,
      customer_email: formData.contactEmail,
      metadata: {
        businessName: formData.businessName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        websiteUrl: formData.websiteUrl,
        yearsActive: formData.yearsActive,
        subtotal: pricing.subtotal.toString(),
        discount: pricing.discounts.total.toString(),
        total: pricing.total.toString(),
        depositAmount: pricing.deposit.toString(),
      },
    });

    console.log('✅ Checkout session created:', session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] API running on http://localhost:${PORT}`);
});
