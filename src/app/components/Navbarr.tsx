'use client';
import React, { useEffect, useState } from 'react';


const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Menu visible by default

  // Adjust visibility based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuVisible(true); // Always visible on desktop
      }
    };

    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to toggle menu visibility for mobile
  const toggleMenuVisibility = () => {
    if (window.innerWidth <= 768) {
      setIsMenuVisible(!isMenuVisible);
    }
  };

  
  return (
    <div className="flex flex-col bg-gray-100 text-gray-900 md:max-w-sidebar">
      <div className="bg-purple-600 p-4 text-white flex items-center">
        <div className="rounded-full bg-white text-purple-600 w-8 h-8 flex justify-center items-center mr-2">R</div>
        <span>Ronald’s space</span>
        <button onClick={toggleMenuVisibility} className="ml-auto bg-transparent border-none cursor-pointer md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
      </button>
      </div>
      {/* Conditional rendering based on isMenuVisible */}
      {isMenuVisible && (
        <div className={`flex flex-col md:max-w-sidebar ${isMenuVisible ? 'desktop-menu' : 'mobile-menu hidden'}`}>
        {/* Navbar items */}
        <div className="flex flex-col">
        <a href="#" className="flex items-center p-4 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-address-book mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"/>
              <path d="M10 16h6"/>
              <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
              <path d="M4 8h3"/>
              <path d="M4 12h3"/>
              <path d="M4 16h3"/>
            </svg>
            Create new note
          </a>
          <a href="#" className="p-4 hover:bg-gray-200">New Note</a>
          {/* Expandable Topics section */}
          <div className="bg-gray-300 p-4">
            My Topics
            <div className="mt-2">
              <a href="#" className="block p-2 bg-purple-300 text-purple-700 rounded">CSE 210 - Data Structures</a>
              <a href="#" className="block p-2 mt-1 hover:bg-purple-100">CSE 230 - Inheritance Design</a>
              <a href="#" className="block p-2 mt-1 hover:bg-purple-100">+ Create New Topic</a>
            </div>
          </div>
          <a href="#" className="flex items-center p-4 hover:bg-gray-200">
            {/* Quick Notes SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
              <path d="M9 12h6"/>
              <path d="M12 9v6"/>
            </svg>
            Quick Notes
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 7l16 0"/>
              <path d="M10 11l0 6"/>
              <path d="M14 11l0 6"/>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
            </svg>
            Trash
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-200">
        
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
            </svg>
            Settings
          </a>
        </div>
        </div>
      )}
    </div>
  );
};


export default Navbar;
