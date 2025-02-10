'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();

  const handleTransition = async (e) => {
    e.preventDefault();
    const body = document.querySelector('body');

    body?.classList.add('page-transition');

    await sleep(100);
    router.push(href);
    await sleep(100);

    body?.classList.remove('page-transition');
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
