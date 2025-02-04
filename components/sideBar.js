'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = ['Home', 'Projects', 'Title2', 'Infos'];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (page) => {
    if (page === 'Home') router.push('/');
    else router.push(`/${page.toLowerCase()}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        // Automatically cycle through the menu
        const nextPage = menuItems[(menuItems.indexOf(pathname.split('/')[1]) + 1) % menuItems.length];
        handleNavigation(nextPage);
      } else if (e.key === 'ArrowUp') {
        // Automatically cycle through the menu
        const prevPage = menuItems[(menuItems.indexOf(pathname.split('/')[1]) - 1 + menuItems.length) % menuItems.length];
        handleNavigation(prevPage);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="h-screen w-40 bg-background border-r-2 border-foreground z-20 fixed top-0 left-0">
      <div className="flex flex-col pt-20 h-full w-full gap-4">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`flex items-center text-left pl-8 relative transition-colors duration-[30ms] 
              ${pathname === '/' && item === 'Home' ? 'text-pred' : pathname && pathname === '/' + item.toLowerCase() ? 'text-pred' : ''}`}
            onClick={() => handleNavigation(item)}
          >
            {(pathname === '/' && item === 'Home') || pathname === '/' + item.toLowerCase() ? <img src="/assets/selection.png" alt="Selected" className="w-4 h-4 absolute left-2" /> : null}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
