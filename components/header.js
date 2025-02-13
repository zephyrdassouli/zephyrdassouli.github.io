'use client';
import { usePathname } from 'next/navigation';
import './headerStyle.css';
import { TransitionLink } from './transitionLink';

const menuItems = ['HOME', 'PROJECTS', 'INFOS', 'CONTACT'];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="w-screen z-20 top-0 left-0 ">
      <div className="flex flex-row w-full gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex gap-1 pl-2">
            <TransitionLink
              href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              key={item}
              className={`flex items-center text-left relative text-xl transition-colors duration-[30ms] text-glow  
              ${pathname === '/' && item === 'HOME' ? 'text-pblue text-glow-selected' : pathname && pathname === '/' + item.toLowerCase() ? 'text-pblue text-glow-selected' : 'text-grad-hover '}`}
            >
              {item}
            </TransitionLink>
          </div>
        ))}
      </div>
    </div>
  );
}
