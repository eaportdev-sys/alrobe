import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Parts from './pages/Parts';
import { Cars, CarDetail } from './pages/Cars';
import Imports from './pages/Imports';
import Logistics from './pages/Logistics';
import Warehouse from './pages/Warehouse';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Track from './pages/Track';
import Admin from './pages/Admin';
import { StoreProvider } from './lib/store';
import { waLink } from './lib/whatsapp';

export default function App(){
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/parts" element={<Parts/>}/>
              <Route path="/cars" element={<Cars/>}/>
              <Route path="/cars/:id" element={<CarDetail/>}/>
              <Route path="/imports" element={<Imports/>}/>
              <Route path="/logistics" element={<Logistics/>}/>
              <Route path="/warehouse" element={<Warehouse/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/track" element={<Track/>}/>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
          </main>
          <Footer/>
          <a href={waLink('Hello ALROBE! I need help with parts / cars / logistics.')} target="_blank" rel="noreferrer"
            className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition flex items-center gap-2 font-bold">
            <MessageCircle /> <span className="hidden sm:inline text-sm">Chat Sales</span>
          </a>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
