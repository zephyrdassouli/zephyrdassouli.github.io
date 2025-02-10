'use client';
import { useRouter, usePathname } from 'next/navigation';
import './sideBarStyle.css';

const menuItems = ['Home', 'Projects', 'Infos', 'Contact'];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (page) => {
    if (page === 'Home') router.push('/');
    else router.push(`/${page.toLowerCase()}`);
  };

  return (
    <div className="h-screen min-w-40 max-w-40 bg-background border-foreground z-20 top-0 left-0">
      <div className="flex flex-col pt-20 h-full w-full gap-4">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`flex items-center text-left pl-8 relative text-xl transition-colors duration-[30ms] text-glow  
              ${pathname === '/' && item === 'Home' ? 'text-pred text-glow-selected' : pathname && pathname === '/' + item.toLowerCase() ? 'text-pred text-glow-selected' : 'text-grad-hover '}`}
            onClick={() => handleNavigation(item)}
          >
            {(pathname === '/' && item === 'Home') || pathname === '/' + item.toLowerCase() ? <img src="/assets/selection.png" alt="Selected" className="w-4 h-4 absolute left-2 top-2" /> : null}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
