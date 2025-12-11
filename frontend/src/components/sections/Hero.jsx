export default function Hero() {
  return (
    // 'h-[80vh]' makes it take up 80% of the screen height. 
    // Change to 'min-h-screen' if you want it to fill the WHOLE screen.
    <section id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      
      {/* 1. Full Width Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Blue Overlay so text is readable */}
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
      </div>

      {/* 2. The Content (Centered & White Text) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <span className="inline-block py-1 px-3 rounded-full bg-yellow-500 text-blue-900 font-bold tracking-widest uppercase text-xs mb-6 shadow-md">
          Official Chapter Website
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-sm">
          Building Champions. <br />
          <span className="text-yellow-400">Engineering the Future.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
          We are pleased to extend an invitation for you to join the <strong>PSME Las Piñas Chapter</strong>. 
          Uniting professionals to upgrade the practice of Mechanical Engineering in the southern metro.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#join" className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition shadow-lg transform hover:-translate-y-1">
            Become a Member
          </a>
          <a href="#about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition transform hover:-translate-y-1">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}