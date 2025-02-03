'use client';
import { useState, useEffect } from 'react';

const menuItems = ['Home', 'Title', 'Title2', 'Infos'];

export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-40 border-r-2 border-foreground">
      <div className="flex flex-col pt-20 h-full w-full gap-4">
        {menuItems.map((item, index) => (
          <button key={item} className={`flex items-center text-left pl-8 relative transition-colors duration-[30ms] ${selectedIndex === index ? 'text-pred' : ''}`} onClick={() => setSelectedIndex(index)}>
            {selectedIndex === index && <img src="/assets/selection.png" alt="Selected" className="w-4 h-4 absolute left-2" />}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
