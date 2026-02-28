
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import HeroCarousel from './components/HeroCarousel';
import FeaturedSection from './components/FeaturedSection';
import PlanningFlow from './components/PlanningFlow';
import VendorBazaar from './components/VendorBazaar';
import BudgetTracker from './components/BudgetTracker';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PackageCustomizer from './components/PackageCustomizer';
import PremiumSection from './components/PremiumSection';
import PaymentModal from './components/PaymentModal';
import OffersSection from './components/OffersSection';
import VendorDashboard from './components/dashboards/VendorDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import RoleSwitcher from './components/RoleSwitcher';
import SplashScreen from './components/SplashScreen';
import { Vendor } from './types';

export type UserRole = 'guest' | 'user' | 'vendor' | 'admin';
export type AppView = 'home' | 'vendors' | 'budget' | 'dashboard' | 'about';

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState<AppView>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [searchParams, setSearchParams] = useState({ search: '', city: 'All Cities', offersOnly: false });
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowAbout(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showAbout) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-2xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center shadow-lg">
              <Heart className="text-saffron w-8 h-8 fill-current" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-maroon">
            Plan Smart. <br />
            <span className="text-saffron">Spend Smart.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            WedCircle helps you plan your dream wedding without breaking the bank. 
            Find affordable vendors, track your expenses, and manage your big day with ease.
          </p>
          <button 
            onClick={() => setShowAbout(false)}
            className="px-12 py-4 bg-maroon text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const handleExplore = (search?: string, city?: string, offersOnly?: boolean) => {
    setSearchParams({ 
      search: search || '', 
      city: city || 'All Cities',
      offersOnly: offersOnly || false
    });
    setActiveTab('vendors');
  };

  const toggleWishlist = (vendorId: string) => {
    setWishlist(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId) 
        : [...prev, vendorId]
    );
  };

  const handleCategorySelect = (category: string) => {
    setSearchParams({ search: category, city: 'All Cities', offersOnly: false });
    setActiveTab('vendors');
  };

  const handleCarouselAction = (category?: string, tab?: string) => {
    if (tab === 'budget') {
      handleTabChange('budget');
    } else if (category) {
      handleCategorySelect(category);
    }
  };

  const handleBuyPremium = () => {
    if (currentRole === 'guest') {
      setAuthMessage("Please login to upgrade to Premium.");
      setIsAuthOpen(true);
      return;
    }
    setIsPaymentOpen(true);
  };

  const handleTabChange = (tab: AppView) => {
    if (tab === 'budget' && currentRole === 'guest') {
      setAuthMessage("Please login to access your budget dashboard.");
      setIsAuthOpen(true);
      return;
    }
    setAuthMessage('');
    setActiveTab(tab);
  };

  const handleRoleChange = (role: UserRole, name?: string) => {
    setCurrentRole(role);
    if (role === 'user') {
      setCurrentUserId('user-1');
      setUserName(name || 'Rahul Sharma');
    } else if (role === 'vendor') {
      setCurrentUserId('1'); // Saffron Spices Catering
      setUserName(name || 'Saffron Spices');
    } else if (role === 'admin') {
      setCurrentUserId('admin-1');
      setUserName(name || 'Admin');
    } else {
      setCurrentUserId('');
      setUserName('');
    }
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case 'vendor':
        return <VendorDashboard vendorId={currentUserId} />;
      case 'user':
        return <UserDashboard userId={currentUserId} userName={userName} isPremium={isPremium} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Hero onExplore={handleExplore} />;
    }
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onExplore={handleExplore} />
            
            <OffersSection 
              isPremium={isPremium} 
              onClaim={(offer) => handleExplore(offer.vendorName)} 
            />

            <CategoryNav onCategorySelect={handleCategorySelect} />
            <HeroCarousel onAction={handleCarouselAction} />
            
            <FeaturedSection 
              title="Featured Vendors" 
              subtitle="Handpicked premium services for your big day"
              onViewAll={() => handleExplore()}
            >
              <VendorBazaar limit={4} isHorizontal wishlist={wishlist} onToggleWishlist={toggleWishlist} isPremium={isPremium} />
            </FeaturedSection>

            <PackageCustomizer />
            <PremiumSection onBuy={handleBuyPremium} isPremium={isPremium} />

            <FeaturedSection 
              title="Trending Wedding Services" 
              subtitle="What's hot in the wedding world right now"
            >
              <div className="flex space-x-6">
                {[
                  { name: 'Destination Weddings', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400' },
                  { name: 'Sustainable Decor', img: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400' },
                  { name: 'Cinematic Films', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400' },
                  { name: 'Gourmet Catering', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400' }
                ].map((item, i) => (
                  <div key={i} className="min-w-[280px] group cursor-pointer">
                    <div className="h-40 rounded-2xl overflow-hidden mb-3">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                  </div>
                ))}
              </div>
            </FeaturedSection>

            <FeaturedSection 
              title="Budget Friendly Packages" 
              subtitle="Grand celebrations at affordable prices"
              onViewAll={() => handleExplore('budget')}
            >
              <VendorBazaar limit={4} isHorizontal wishlist={wishlist} onToggleWishlist={toggleWishlist} isPremium={isPremium} />
            </FeaturedSection>

            <FeaturedSection 
              title="Real Wedding Inspirations" 
              subtitle="Stories of love and beautiful celebrations"
            >
              <div className="flex space-x-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[320px] bg-pink-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={`https://picsum.photos/seed/wedding${i}/400/250`} alt="wedding" className="w-full h-60 object-cover" />
                    <div className="p-6">
                      <h4 className="font-serif font-bold text-xl text-maroon">Aditi & Rahul</h4>
                      <p className="text-sm text-gray-500">The Leela Palace, Udaipur</p>
                    </div>
                  </div>
                ))}
              </div>
            </FeaturedSection>

            <Countdown />
            <PlanningFlow />
          </>
        );
      case 'vendors':
        return (
          <div className="pt-24 pb-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-4xl font-serif text-maroon mb-8 text-center">The Vendor Bazaar</h1>
              <VendorBazaar 
                initialSearch={searchParams.search} 
                initialCity={searchParams.city} 
                initialOffersOnly={searchParams.offersOnly}
                wishlist={wishlist} 
                onToggleWishlist={toggleWishlist} 
                isPremium={isPremium}
              />
            </div>
          </div>
        );
      case 'budget':
        return (
          <div className="pt-24 pb-16 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl font-serif text-maroon mb-8 text-center">Budget Tracker</h1>
              <BudgetTracker />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-saffron selection:text-white">
      {!isAuthOpen && (
        <Navbar 
          onAuthClick={() => {
            setAuthMessage('');
            setIsAuthOpen(true);
          }} 
          onLogout={() => {
            setCurrentRole('guest');
            setUserName('');
            setActiveTab('home');
          }}
          activeTab={activeTab} 
          setActiveTab={(tab) => handleTabChange(tab as AppView)} 
          currentRole={currentRole}
          userName={userName}
          isPremium={isPremium}
        />
      )}
      
      <main>
        {renderContent()}
      </main>

      {!isAuthOpen && activeTab !== 'dashboard' && <Footer />}

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={(role, name) => {
          handleRoleChange(role, name);
          setActiveTab('dashboard');
          setAuthMessage('');
        }}
        message={authMessage}
      />

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => setIsPremium(true)}
        amount={2000}
      />

      <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />
    </div>
  );
};

export default App;
