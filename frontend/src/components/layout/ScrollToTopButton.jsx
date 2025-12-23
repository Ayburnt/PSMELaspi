import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ bottom: 96, right: 24 });

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    const spacing = 12; // gap between chatbot and button

    const findNoupeLauncher = () => {
      return (
        document.querySelector('.noupe-launcher') ||
        document.getElementById('noupe-widget-container')
      );
    };

    const updatePosition = () => {
      const el = findNoupeLauncher();
      if (el) {
        const rect = el.getBoundingClientRect();
        const bottomMargin = Math.max(0, window.innerHeight - rect.bottom);
        const rightMargin = Math.max(0, window.innerWidth - rect.right);
        const bottom = bottomMargin + rect.height + spacing;
        const right = Math.max(16, rightMargin);
        setPosition({ bottom, right });
      } else {
        const isDesktop = window.innerWidth >= 768;
        setPosition({ bottom: isDesktop ? 24 : 96, right: 24 });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    // Noupe loads asynchronously; poll briefly to capture when it appears
    const pollId = setInterval(updatePosition, 1000);
    const stopPollId = setTimeout(() => clearInterval(pollId), 10000);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', updatePosition);
      clearInterval(pollId);
      clearTimeout(stopPollId);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          /* - 'text-black' para maging black ang stroke ng icon
            - 'bg-white' para sa background ng button
            - 'border border-gray-200' para mas maging malinaw ang puting button
          */
          className="fixed z-50 bg-white hover:bg-gray-100 text-black p-2.5 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          style={{ bottom: position.bottom, right: position.right }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor" /* Kumukuha ng kulay sa 'text-black' class sa taas */
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;