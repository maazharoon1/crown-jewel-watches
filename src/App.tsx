import { useState } from 'react';
import { PRODUCTS } from './data/products';
import type { WatchProduct, CartItem } from './types/watch';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { FeaturedProducts } from './components/FeaturedProducts';
import { EditorialSection } from './components/EditorialSection';
import { CollectionGrid } from './components/CollectionGrid';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Testimonials } from './components/Testimonials';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { Reveal } from './components/Reveal';
import { MotionConfig } from 'motion/react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 initial sample item so cart is ready to demonstrate or start empty
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: WatchProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: WatchProduct) => {
    handleAddToCart(product);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smooth scroll navigation
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  const handleNavigate = (section: 'collection' | 'about' | 'contact' | 'craftsmanship') => {
    if (section === 'collection') {
      scrollToSection('collection');
    } else if (section === 'craftsmanship') {
      scrollToSection('craftsmanship');
    } else if (section === 'about') {
      setAboutOpen(true);
    } else if (section === 'contact') {
      setContactOpen(true);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-red-800 selection:text-white flex flex-col font-sans">
      
      {/* Refined Luxury Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow">
        {/* Section 1: Main Hero 100-Frame Scroll Animation */}
        <HeroSequence />

        {/* Section 2: Featured Timepieces */}
        <Reveal><FeaturedProducts
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onViewAll={() => scrollToSection('collection')}
        /></Reveal>

        {/* Section 3: Editorial Statement */}
        <Reveal><EditorialSection /></Reveal>

        {/* Section 4: Curated Collection with Filter */}
        <Reveal><CollectionGrid
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        /></Reveal>

        {/* Section 5: The Art of Precision Craftsmanship */}
        <Reveal><CraftsmanshipSection /></Reveal>

        {/* Section 6: Collector Social Proof */}
        <Reveal><Testimonials /></Reveal>

        {/* Section 7: Final CTA */}
        <Reveal><FinalCta onExploreClick={() => scrollToSection('collection')} /></Reveal>
      </main>

      {/* Minimal Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onExploreCollection={() => scrollToSection('collection')}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

    </div>
    </MotionConfig>
  );
}
