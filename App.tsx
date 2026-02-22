
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  Users, 
  User, 
  Wallet, 
  CheckSquare, 
  Sparkles,
  ChevronRight,
  Menu as MenuIcon,
  Bell,
  Plus,
  ArrowRight,
  Star,
  Search,
  Heart,
  Mail,
  Phone,
  ArrowLeft,
  Check,
  Music,
  Gift,
  Users as GuestsIcon,
  X,
  CreditCard,
  DollarSign,
  ShieldCheck,
  MapPin,
  TrendingUp
} from 'lucide-react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

type View = 'splash' | 'onboarding' | 'auth' | 'dashboard' | 'vendorProfile' | 'profile' | 'finalizedVendors' | 'checklist' | 'packageCustomizer' | 'budgetTracker' | 'shagunTracker' | 'guestList' | 'playlists';

const App: React.FC = () => {
  const [view, setView] = useState<View>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => setView('onboarding'), 5000); // Extended for mantra reading
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleLoginSuccess = () => {
    setView('dashboard');
    setActiveTab('home');
  };

  const navigateTo = (newView: View, tab?: string) => {
    setView(newView);
    if (tab) setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const renderView = () => {
    switch (view) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <Onboarding step={onboardingStep} setStep={setOnboardingStep} onFinish={() => setView('auth')} />;
      case 'auth': return <AuthScreen onLogin={handleLoginSuccess} />;
      case 'dashboard': return (
        <div className="flex flex-col h-screen overflow-hidden">
          <Header onMenuClick={() => setIsDrawerOpen(true)} onProfileClick={() => navigateTo('profile', 'profile')} />
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <ClientDashboard onVendorSelect={() => navigateTo('vendorProfile')} />
          </div>
          <BottomNav activeTab={activeTab} setActiveTab={(t) => {
            setActiveTab(t);
            if (t === 'home') setView('dashboard');
            if (t === 'vendors') setView('packageCustomizer');
            if (t === 'plan') setView('checklist');
            if (t === 'profile') setView('profile');
          }} />
        </div>
      );
      case 'profile': return (
        <div className="flex flex-col h-screen overflow-hidden">
          <Header onMenuClick={() => setIsDrawerOpen(true)} />
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <ProfileView onFinalizedClick={() => navigateTo('finalizedVendors')} />
          </div>
          <BottomNav activeTab="profile" setActiveTab={(t) => {
            setActiveTab(t);
            if (t === 'home') setView('dashboard');
            if (t === 'vendors') setView('packageCustomizer');
            if (t === 'plan') setView('checklist');
            if (t === 'profile') setView('profile');
          }} />
        </div>
      );
      case 'finalizedVendors': return (
        <div className="flex flex-col h-screen">
          <FinalizedVendorsView onBack={() => navigateTo('profile')} />
          <BottomNav activeTab="profile" setActiveTab={(t) => {
            setActiveTab(t);
            if (t === 'home') setView('dashboard');
            if (t === 'vendors') setView('packageCustomizer');
            if (t === 'plan') setView('checklist');
            if (t === 'profile') setView('profile');
          }} />
        </div>
      );
      case 'packageCustomizer': return (
        <div className="flex flex-col h-screen overflow-hidden">
          <Header onMenuClick={() => setIsDrawerOpen(true)} />
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <PackageCustomizer onBack={() => navigateTo('dashboard', 'home')} />
          </div>
          <BottomNav activeTab="vendors" setActiveTab={(t) => {
            setActiveTab(t);
            if (t === 'home') setView('dashboard');
            if (t === 'vendors') setView('packageCustomizer');
            if (t === 'plan') setView('checklist');
            if (t === 'profile') setView('profile');
          }} />
        </div>
      );
      case 'checklist': return (
        <div className="flex flex-col h-screen overflow-hidden">
          <Header onMenuClick={() => setIsDrawerOpen(true)} />
          <ChecklistScreen onBack={() => navigateTo('dashboard', 'home')} />
          <BottomNav activeTab="plan" setActiveTab={(t) => {
            setActiveTab(t);
            if (t === 'home') setView('dashboard');
            if (t === 'vendors') setView('packageCustomizer');
            if (t === 'plan') setView('checklist');
            if (t === 'profile') setView('profile');
          }} />
        </div>
      );
      case 'budgetTracker': return <BudgetTrackerView onBack={() => navigateTo('dashboard', 'home')} />;
      case 'shagunTracker': return <ShagunTrackerView onBack={() => navigateTo('dashboard', 'home')} />;
      case 'guestList': return <GuestListView onBack={() => navigateTo('dashboard', 'home')} />;
      case 'playlists': return <PlaylistView onBack={() => navigateTo('dashboard', 'home')} />;
      case 'vendorProfile': return <VendorProfile onBack={() => navigateTo('dashboard', 'home')} />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2E5C5] max-w-md mx-auto overflow-hidden flex flex-col font-sans">
      <AnimatePresence>
        {isDrawerOpen && (
          <Drawer 
            onClose={() => setIsDrawerOpen(false)} 
            onNavigate={navigateTo}
          />
        )}
      </AnimatePresence>
      
      {view !== 'splash' && <div className="fixed inset-2 border border-[#C6A14A]/10 pointer-events-none z-40 rounded-[2.5rem]" />}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 h-full flex flex-col"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Drawer Component ---
const Drawer = ({ onClose, onNavigate }: { onClose: () => void, onNavigate: (v: View) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-start"
    onClick={onClose}
  >
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      className="w-4/5 h-full bg-[#5C1A1B] p-10 flex flex-col"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-serif text-2xl text-white tracking-widest">MENU</h2>
        <button onClick={onClose} className="p-2 text-[#C6A14A]"><X size={24}/></button>
      </div>
      <div className="space-y-8">
        {[
          { label: 'Budget Tracker', view: 'budgetTracker', icon: <Wallet size={20}/> },
          { label: 'Shagun Tracker', view: 'shagunTracker', icon: <Gift size={20}/> },
          { label: 'Guest List', view: 'guestList', icon: <GuestsIcon size={20}/> },
          { label: 'Function Playlists', view: 'playlists', icon: <Music size={20}/> },
          { label: 'My Checklist', view: 'checklist', icon: <CheckSquare size={20}/> },
          { label: 'Elite Vendors', view: 'packageCustomizer', icon: <Users size={20}/> },
        ].map(item => (
          <button 
            key={item.label} 
            onClick={() => onNavigate(item.view as View)}
            className="flex items-center gap-4 text-white/80 hover:text-[#C6A14A] transition-colors group"
          >
            <span className="text-[#C6A14A] group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto border-t border-white/10 pt-8">
        <p className="text-[10px] text-[#C6A14A] uppercase tracking-[0.3em] font-bold">TheShaadiDesk</p>
        <p className="text-[11px] text-white/40 italic mt-2">v 2.4.0 • Luxury Edition</p>
      </div>
    </motion.div>
  </motion.div>
);

// --- Profile View ---
const ProfileView = ({ onFinalizedClick }: { onFinalizedClick: () => void }) => {
  const user = {
    name: 'Rhea Kapoor',
    phone: '+91 98765 43210',
    email: 'rhea.kapoor@heritage.com',
    weddingDate: '12th Dec 2025',
    city: 'Udaipur',
    fianceName: 'Aman Mehra',
    fiancePhone: '+91 99999 88888'
  };

  return (
    <div className="p-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-[0.03] scale-150 -translate-y-1/2 translate-x-1/2 pointer-events-none">
        <MandalaIcon size={400} />
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full border-2 border-[#C6A14A] p-1 mb-4">
          <div className="w-full h-full rounded-full bg-[#5C1A1B] flex items-center justify-center text-white font-serif text-3xl">RK</div>
        </div>
        <h2 className="font-serif text-3xl text-[#5C1A1B]">{user.name}</h2>
        <p className="text-[10px] text-[#C6A14A] uppercase tracking-[0.3em] font-bold mt-1">Bride-to-be</p>
      </div>

      <div className="space-y-6 relative z-10">
        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-[#550B18]/40 font-bold mb-4">Wedding Profile</h3>
          <div className="bg-white rounded-[2rem] p-6 luxury-shadow space-y-4">
            <div className="flex justify-between items-center border-b border-[#C6A14A]/10 pb-3">
              <span className="text-[10px] uppercase font-bold text-[#550B18]/60">Wedding Date</span>
              <span className="font-serif text-[#5C1A1B]">{user.weddingDate}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#C6A14A]/10 pb-3">
              <span className="text-[10px] uppercase font-bold text-[#550B18]/60">Destination</span>
              <span className="font-serif text-[#5C1A1B]">{user.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-[#550B18]/60">Phone</span>
              <span className="font-serif text-[#5C1A1B]">{user.phone}</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-[#550B18]/40 font-bold mb-4">Better Half</h3>
          <div className="bg-[#5C1A1B] rounded-[2rem] p-6 text-white luxury-shadow space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-bold text-white/40">Fiancé Name</span>
              <span className="font-serif text-[#C6A14A]">{user.fianceName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-white/40">Fiancé Phone</span>
              <span className="font-serif text-[#C6A14A]">{user.fiancePhone}</span>
            </div>
          </div>
        </section>

        <section>
          <button 
            onClick={onFinalizedClick}
            className="w-full bg-white rounded-[2rem] p-6 luxury-shadow border border-[#C6A14A]/20 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F2E5C5] rounded-xl text-[#5C1A1B]"><ShieldCheck size={24}/></div>
              <div className="text-left">
                <h4 className="font-serif text-lg text-[#5C1A1B]">Finalized Vendors</h4>
                <p className="text-[9px] text-[#C6A14A] uppercase font-bold tracking-widest">Payments & Status</p>
              </div>
            </div>
            <ChevronRight className="text-[#C6A14A] group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
};

// --- Finalized Vendors View ---
const FinalizedVendorsView = ({ onBack }: { onBack: () => void }) => {
  const vendors = [
    { name: 'Taj Lake Palace', category: 'Venue', total: '₹45,00,000', paid: '₹20,00,000', status: 'Due', nextDue: 'Oct 15, 2025' },
    { name: 'Khosla Decor', category: 'Decor', total: '₹8,50,000', paid: '₹8,50,000', status: 'Done', nextDue: '-' },
    { name: 'Gourmet Heritage', category: 'Catering', total: '₹12,00,000', paid: '₹5,00,000', status: 'Due', nextDue: 'Nov 01, 2025' },
  ];

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
      <button onClick={onBack} className="text-[#C6A14A] text-[10px] uppercase font-bold tracking-widest mb-6 flex items-center gap-2"><ArrowLeft size={14} /> Back to Profile</button>
      <h2 className="font-serif text-3xl text-[#5C1A1B] mb-8">Confirmed Services</h2>
      
      <div className="space-y-6 pb-24">
        {vendors.map((v, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-6 luxury-shadow border border-[#C6A14A]/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[9px] text-[#C6A14A] uppercase font-bold tracking-widest mb-1">{v.category}</p>
                <h4 className="font-serif text-xl text-[#5C1A1B]">{v.name}</h4>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${v.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-[#5C1A1B] text-white'}`}>
                {v.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-[#C6A14A]/10">
              <div>
                <p className="text-[9px] text-[#550B18]/40 uppercase font-bold tracking-widest">Paid</p>
                <p className="font-serif text-[#5C1A1B] text-lg">{v.paid}</p>
              </div>
              <div>
                <p className="text-[9px] text-[#550B18]/40 uppercase font-bold tracking-widest">Total</p>
                <p className="font-serif text-[#5C1A1B] text-lg">{v.total}</p>
              </div>
            </div>

            {v.status === 'Due' && (
              <div className="bg-[#F2E5C5]/50 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-[9px] text-[#5C1A1B] font-bold uppercase tracking-widest">Next Due</span>
                <span className="text-[10px] text-[#5C1A1B] font-bold">{v.nextDue}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BudgetTrackerView ---
const BudgetTrackerView = ({ onBack }: any) => (
  <div className="p-6 h-screen flex flex-col">
    <button onClick={onBack} className="text-[#C6A14A] mb-8"><ArrowLeft/></button>
    <h1 className="font-serif text-4xl text-[#5C1A1B] mb-4">Detailed Budget</h1>
    <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-[#C6A14A]/10 luxury-shadow">
      <Wallet size={48} className="text-[#C6A14A] mb-4 opacity-20"/>
      <p className="text-[#5C1A1B]/60 italic text-center">Comprehensive breakdown of all your wedding expenses and pending allocations.</p>
    </div>
  </div>
);

// --- ShagunTrackerView ---
const ShagunTrackerView = ({ onBack }: any) => (
  <div className="p-6 h-screen flex flex-col">
    <button onClick={onBack} className="text-[#C6A14A] mb-8"><ArrowLeft/></button>
    <h1 className="font-serif text-4xl text-[#5C1A1B] mb-4">Shagun Logs</h1>
    <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-[#C6A14A]/10 luxury-shadow">
      <Gift size={48} className="text-[#C6A14A] mb-4 opacity-20"/>
      <p className="text-[#5C1A1B]/60 italic text-center">Keep track of every token of love and gift received during each ceremony.</p>
    </div>
  </div>
);

// --- GuestListView ---
const GuestListView = ({ onBack }: any) => (
  <div className="p-6 h-screen flex flex-col">
    <button onClick={onBack} className="text-[#C6A14A] mb-8"><ArrowLeft/></button>
    <h1 className="font-serif text-4xl text-[#5C1A1B] mb-4">Master Guest List</h1>
    <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-[#C6A14A]/10 luxury-shadow">
      <GuestsIcon size={48} className="text-[#C6A14A] mb-4 opacity-20"/>
      <p className="text-[#5C1A1B]/60 italic text-center">Manage RSVPs, family groups, and seating assignments across functions.</p>
    </div>
  </div>
);

// --- PlaylistView ---
const PlaylistView = ({ onBack }: any) => (
  <div className="p-6 h-screen flex flex-col">
    <button onClick={onBack} className="text-[#C6A14A] mb-8"><ArrowLeft/></button>
    <h1 className="font-serif text-4xl text-[#5C1A1B] mb-4">Event Playlists</h1>
    <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-[#C6A14A]/10 luxury-shadow">
      <Music size={48} className="text-[#C6A14A] mb-4 opacity-20"/>
      <p className="text-[#5C1A1B]/60 italic text-center">Curated sets for Mehendi, Sangeet, Bridal Entry, and the Reception Vibe.</p>
    </div>
  </div>
);

// --- SplashScreen with Gayatri Mantra ---
const SplashScreen = () => (
  <div className="flex-1 bg-gradient-to-b from-[#5C1A1B] to-[#550B18] flex flex-col items-center justify-center h-screen px-10 text-center relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <MandalaIcon size={600} />
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center z-10"
    >
      <div className="mb-8 p-6 border border-[#C6A14A]/20 rounded-full">
         <Sparkles className="text-[#C6A14A]" size={32} />
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="text-[#C6A14A] text-lg font-serif mb-12 italic leading-relaxed"
      >
        ॐ भूर्भुवः स्वः <br/>
        तत्सवितुर्वरेण्यं <br/>
        भर्गो देवस्य धीमहि <br/>
        धियो यो नः प्रचोदयात् ॥
      </motion.p>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 3, duration: 1 }}
        className="flex flex-col items-center"
      >
        <h1 className="font-serif text-5xl text-white tracking-[0.2em] shimmer-text">TSD</h1>
        <p className="text-[#C6A14A] text-xs tracking-[0.4em] uppercase mt-4 font-bold">TheShaadiDesk</p>
      </motion.div>
    </motion.div>
  </div>
);

const Onboarding = ({ step, setStep, onFinish }: any) => (
  <div className="flex-1 p-10 flex flex-col justify-between h-screen text-center bg-[#F2E5C5] relative">
     <div className="absolute top-0 left-0 opacity-[0.05] pointer-events-none">
        <MandalaIcon size={200} />
     </div>
    <div className="mt-20">
      <h2 className="font-serif text-3xl text-[#5C1A1B] mb-4">Luxury Planning</h2>
      <p className="text-[#550B18]/70 leading-relaxed text-sm font-medium">Curated heritage experiences for your special day.</p>
    </div>
    <button onClick={onFinish} className="bg-[#5C1A1B] text-white w-full py-4 rounded-full font-bold tracking-widest luxury-shadow active:scale-95 transition-transform mb-10">GET STARTED</button>
  </div>
);

const AuthScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [value, setValue] = useState('');

  return (
    <div className="flex-1 p-8 flex flex-col justify-between h-screen">
      <div className="flex flex-col">
        <div className="text-center mb-12 mt-12">
          <h1 className="font-serif text-4xl text-[#5C1A1B]">{step === 'input' ? 'Namaste' : 'Verification'}</h1>
          <p className="text-[#C6A14A] text-xs tracking-[0.3em] uppercase mt-2 font-bold">From To-Do to 'I Do.'</p>
        </div>

        {step === 'input' ? (
          <div className="space-y-8">
             <div className="flex border-b border-[#C6A14A]/20">
                <button onClick={() => setMethod('phone')} className={`flex-1 py-3 text-[10px] font-bold uppercase transition-all ${method === 'phone' ? 'text-[#5C1A1B] border-b-2 border-[#5C1A1B]' : 'text-[#550B18]/40'}`}>Phone</button>
                <button onClick={() => setMethod('email')} className={`flex-1 py-3 text-[10px] font-bold uppercase transition-all ${method === 'email' ? 'text-[#5C1A1B] border-b-2 border-[#5C1A1B]' : 'text-[#550B18]/40'}`}>Email</button>
              </div>
              <input 
                type="text" 
                placeholder={method === 'phone' ? '98765 00000' : 'rhea@example.com'} 
                className="w-full bg-transparent border-b border-[#C6A14A]/40 py-3 text-lg outline-none text-[#5C1A1B] font-medium"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={() => setStep('otp')} className="w-full bg-[#5C1A1B] text-white py-4 rounded-full font-bold tracking-widest luxury-shadow active:scale-95 transition-transform">REQUEST OTP</button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between gap-3 px-4">
              {[1, 2, 3, 4].map((i) => <input key={i} type="text" maxLength={1} defaultValue={i} className="w-14 h-14 bg-white rounded-2xl border border-[#C6A14A]/20 text-center text-2xl font-serif text-[#5C1A1B] luxury-shadow outline-none focus:border-[#C6A14A]" />)}
            </div>
            <button onClick={onLogin} className="w-full bg-[#5C1A1B] text-white py-4 rounded-full font-bold tracking-widest luxury-shadow active:scale-95 transition-transform">VERIFY & LOGIN</button>
          </div>
        )}
      </div>
      <div className="text-center pb-8">
        <p className="text-[11px] text-[#550B18]/60 italic mb-4 font-medium uppercase tracking-widest">Connect with Socials</p>
        <div className="flex gap-4">
           <button onClick={onLogin} className="flex-1 py-3 rounded-xl bg-white border border-[#C6A14A]/20 text-[10px] font-bold text-[#5C1A1B] luxury-shadow active:scale-95 transition-all">GMAIL</button>
           <button onClick={onLogin} className="flex-1 py-3 rounded-xl bg-white border border-[#C6A14A]/20 text-[10px] font-bold text-[#5C1A1B] luxury-shadow active:scale-95 transition-all">MOBILE ID</button>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = ({ onVendorSelect }: any) => {
  const vendorSuggestions = [
    { title: 'Event Manager', img: 'v1' },
    { title: 'Caterer', img: 'v2' },
    { title: 'Anchor', img: 'v3' },
    { title: 'Bridal Stylist', img: 'v4' },
    { title: 'Photographer', img: 'v5' },
    { title: 'Decor Expert', img: 'v6' }
  ];

  return (
    <div className="flex flex-col gap-8 py-4 px-6 relative overflow-hidden">
       <div className="absolute top-0 right-0 opacity-[0.02] scale-150 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <MandalaIcon size={300} />
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#5C1A1B] rounded-[2.5rem] p-8 text-white relative overflow-hidden luxury-shadow">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4">
           <MandalaIcon size={180} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
             <Heart size={14} className="text-[#C6A14A]" fill="currentColor" />
             <p className="text-[#C6A14A] text-[10px] uppercase tracking-[0.4em] font-bold">Rhea & Aman's Wedding</p>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-6xl leading-none">128</span>
            <span className="text-sm uppercase tracking-[0.2em] opacity-60 font-semibold">Days To Go</span>
          </div>

          <div className="flex items-center gap-2 text-white/70 mb-8 group cursor-pointer">
             <MapPin size={14} className="text-[#C6A14A]" />
             <span className="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-0.5 group-hover:border-[#C6A14A] transition-colors">The Oberoi Udaivilas, Udaipur</span>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between text-[9px] mb-2 font-bold uppercase tracking-widest text-white/50">
               <span>Wedding Readiness</span>
               <span className="text-[#C6A14A]">65% COMPLETE</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '65%' }} 
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-[#C6A14A]" 
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
           <h2 className="font-serif text-2xl text-[#5C1A1B]">Elite Recommendations</h2>
           <Sparkles className="text-[#C6A14A] opacity-30" size={16} />
        </div>
        {vendorSuggestions.map((v, idx) => (
          <motion.div 
            key={v.title} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            onClick={onVendorSelect} 
            className="bg-white rounded-[2rem] p-2 flex items-center gap-4 luxury-shadow border border-[#C6A14A]/5 cursor-pointer group hover:border-[#C6A14A]/40 transition-all active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden bg-gray-100 flex-shrink-0 border border-[#C6A14A]/10">
               <img src={`https://picsum.photos/seed/${v.img}/100/100`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={v.title} />
            </div>
            <div className="flex-1">
               <h4 className="font-serif text-lg text-[#5C1A1B] leading-tight">{v.title}</h4>
               <p className="text-[9px] text-[#C6A14A] uppercase font-bold tracking-widest mt-1">Verified Expert Choice</p>
            </div>
            <div className="mr-4 p-2 bg-[#F2E5C5]/30 rounded-full text-[#C6A14A] group-hover:bg-[#C6A14A] group-hover:text-white transition-all">
               <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
        <div className="h-24" />
      </div>
    </div>
  );
};

const PackageCustomizer = ({ onBack }: any) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const services = [
    { id: 'event', name: 'Event Manager', price: '₹1,50,000' },
    { id: 'cater', name: 'Elite Catering', price: '₹5,00,000' },
    { id: 'decor', name: 'Royal Decor', price: '₹3,50,000' },
    { id: 'photo', name: 'Cinematography', price: '₹2,00,000' },
    { id: 'anchor', name: 'Celebrity Anchor', price: '₹80,000' },
    { id: 'stylist', name: 'Bridal Stylist', price: '₹1,20,000' },
  ];

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col p-6 h-full relative overflow-hidden">
      <div className="absolute bottom-0 left-0 opacity-[0.03] rotate-180 pointer-events-none translate-x-[-20%] translate-y-[20%]">
         <MandalaIcon size={400} />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="font-serif text-2xl text-[#5C1A1B]">Elite Package Builder</h2>
        <Sparkles className="text-[#C6A14A]" size={20} />
      </div>
      <p className="text-[10px] text-[#550B18]/60 uppercase tracking-widest mb-8 font-bold relative z-10">Handpick services to curate your heritage wedding</p>

      <div className="space-y-4 flex-1 pb-40 relative z-10 overflow-y-auto hide-scrollbar">
        {services.map(service => (
          <motion.div 
            key={service.id}
            onClick={() => toggleService(service.id)}
            whileTap={{ scale: 0.98 }}
            className={`p-5 rounded-[2rem] border transition-all cursor-pointer flex items-center gap-4 ${
              selectedServices.includes(service.id) ? 'bg-[#5C1A1B] text-white border-transparent luxury-shadow' : 'bg-white border-[#C6A14A]/10 text-[#5C1A1B]'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
              selectedServices.includes(service.id) ? 'bg-[#C6A14A] border-transparent' : 'border-[#C6A14A]/30'
            }`}>
              {selectedServices.includes(service.id) && <Check size={14} className="text-white" />}
            </div>
            <div className="flex-1">
               <h4 className="font-serif text-lg leading-tight">{service.name}</h4>
               <p className={`text-[10px] mt-1 font-bold ${selectedServices.includes(service.id) ? 'text-white/60' : 'text-[#C6A14A]'}`}>Est. {service.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-24 left-6 right-6 p-6 bg-white rounded-[2.5rem] luxury-shadow border border-[#C6A14A]/10 z-30">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] text-[#550B18]/60 uppercase font-bold tracking-widest">Total Services: {selectedServices.length}</p>
          <p className="font-serif text-xl text-[#5C1A1B]">Luxury Selection</p>
        </div>
        <button className="w-full bg-[#5C1A1B] text-white py-4 rounded-full font-bold tracking-widest luxury-shadow active:scale-95 transition-transform flex items-center justify-center gap-2">
           CONFIRM PLAN <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

const ChecklistScreen = ({ onBack }: any) => (
  <div className="p-6 relative overflow-hidden h-full">
    <div className="absolute top-0 right-0 opacity-[0.03] scale-150 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <MandalaIcon size={300} />
     </div>
    <button onClick={onBack} className="text-[#C6A14A] text-[10px] uppercase font-bold tracking-widest mb-6 flex items-center gap-2 relative z-10 hover:opacity-70 transition-opacity">
       <ArrowLeft size={14} /> Back to Desk
    </button>
    <h2 className="font-serif text-3xl text-[#5C1A1B] mb-8 relative z-10">Your Milestone Checklist</h2>
    <div className="space-y-4 relative z-10">
       {['Book Udaipur Palace Venue', 'Finalize Master Guest List', 'Curate Bridal Outfits', 'Heritage Catering Tasting', 'Invitation Suite Design'].map((task, i) => (
         <div key={i} className="bg-white p-5 rounded-[2rem] luxury-shadow flex items-center gap-4 border border-[#C6A14A]/5 group cursor-pointer active:scale-[0.98] transition-all">
           <div className={`w-6 h-6 rounded-full border border-[#C6A14A] flex items-center justify-center transition-all ${i < 2 ? 'bg-[#C6A14A]' : 'group-hover:bg-[#F2E5C5]'}`}>
             {i < 2 && <Check size={12} className="text-white"/>}
           </div>
           <span className={`font-medium text-sm ${i < 2 ? 'text-[#5C1A1B]/30 line-through italic' : 'text-[#5C1A1B]'}`}>{task}</span>
         </div>
       ))}
    </div>
  </div>
);

const VendorProfile = ({ onBack }: any) => (
  <div className="h-screen flex flex-col bg-[#F2E5C5]">
    <div className="h-2/5 relative">
      <img src="https://picsum.photos/seed/elite/800/800" className="w-full h-full object-cover" alt="Elite Vendor" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#5C1A1B]/80 via-transparent to-transparent" />
      <button onClick={onBack} className="absolute top-10 left-6 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 active:scale-90 transition-transform"><ArrowLeft size={20} /></button>
      <div className="absolute bottom-6 left-8">
         <h1 className="font-serif text-4xl text-white">Heritage Planner</h1>
         <p className="text-[#C6A14A] text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Verified Gold Partner</p>
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex gap-1 mb-4">
           {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#C6A14A]" fill="currentColor" />)}
        </div>
        <p className="text-sm text-[#550B18]/70 leading-relaxed italic font-medium">Elite wedding management for the modern royal. We bring centuries of tradition to life with refined precision and elegance.</p>
      </div>
      <button className="w-full bg-[#5C1A1B] text-white py-5 rounded-full font-bold tracking-widest luxury-shadow active:scale-95 transition-transform flex items-center justify-center gap-3">
         REQUEST EXCLUSIVE QUOTE <Sparkles size={16} />
      </button>
    </div>
  </div>
);

const MandalaIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    <circle cx="50" cy="50" r="48" />
    <circle cx="50" cy="50" r="35" />
    <circle cx="50" cy="50" r="15" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <React.Fragment key={angle}>
        <path d="M50 50 L100 50" transform={`rotate(${angle} 50 50)`} strokeOpacity="0.5" />
        <circle cx="90" cy="50" r="2" transform={`rotate(${angle} 50 50)`} fill="currentColor" />
      </React.Fragment>
    ))}
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(0 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(90 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(135 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(180 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(225 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(270 50 50)" />
    <path d="M50 10 Q55 25 50 40 Q45 25 50 10" stroke="currentColor" strokeWidth="0.5" transform="rotate(315 50 50)" />
  </svg>
);

export default App;
