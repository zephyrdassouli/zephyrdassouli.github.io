'use client';
import { useRouter, usePathname } from 'next/navigation';
import './sideBarStyle.css';
import { TransitionLink } from './transitionLink';

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
          <TransitionLink
          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            key={item}
            className={`flex items-center text-left pl-8 relative text-xl transition-colors duration-[30ms] text-glow  
              ${pathname === '/' && item === 'Home' ? 'text-pblue text-glow-selected' : pathname && pathname === '/' + item.toLowerCase() ? 'text-pblue text-glow-selected' : 'text-grad-hover '}`}
          >
            {item}
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
