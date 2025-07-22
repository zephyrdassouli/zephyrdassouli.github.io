'use client';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '../transitionLink';
import TextHeader from './textHeader';

// Menu items to display
const menuItems = ['HOME', 'PROJECTS', 'CV', 'INFOS', 'CONTACT'];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="md:w-fit w-full pb-2 md:pb-0 bg-background z-20 top-0 left-0 ">
      <div className="flex flex-row w-full gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex gap-1 pl-2">
            <TransitionLink
              href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              key={item}
              className={`flex items-center text-left relative text-xl transition-colors duration-[30ms] text-glow  
              ${pathname === '/' && item === 'HOME' ? 'text-pblue' : pathname && pathname === '/' + item.toLowerCase() ? 'text-pblue' : ''}`}
            >
              <TextHeader text={item} duration={1000} className="md:text-2xl" />
            </TransitionLink>
          </div>
        ))}
      </div>
    </div>
  );
}
