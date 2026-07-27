import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_development', {
  apiVersion: '2024-06-20',
  typescript: true,
});
