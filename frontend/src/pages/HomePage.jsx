import React from 'react';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Benefits from '../components/sections/Benefits';
import NewsFeed from '../components/sections/NewsFeed';
import Footer from '../components/layout/Footer';
import PromoPopup from '../components/sections/PromoPopup'; // Don't forget this from the previous code!

const HomePage = () => {
    return (
        <div className="font-sans text-gray-900 bg-white">
            <TopBar />
            <Navbar />
            <Hero />         {/* The new Full View Hero */}
            <Benefits />     {/* The section below the hero */}
            <NewsFeed />
            <Footer />
            <PromoPopup />
        </div>
    );
};

export default HomePage;