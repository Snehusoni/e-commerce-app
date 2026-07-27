import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Toast } from '@/components/Toast';
import { SmartAIAssistant } from '@/components/SmartAIAssistant';

export const metadata: Metadata = {
  title: 'AuraStore | Luxury Tech & Smart AI E-Commerce',
  description: 'Experience next-level luxury e-commerce with AI smart recommendations, Next.js, Tailwind CSS, MongoDB, and Stripe Payments.',
  keywords: ['e-commerce', 'next.js', 'stripe payments', 'ai recommendations', 'audio', 'mechanical keyboard', 'wearables', 'mongodb'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <Toast />
          <SmartAIAssistant />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
