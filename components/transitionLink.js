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
    // Prevent the default behavior of the link
    e.preventDefault();

    // Add the page-transition class to the main element to start transition
    const main = document.querySelector('main');
    main?.classList.add('page-transition');

    // Wait for the transition to finish
    await sleep(100);
    router.push(href);
    await sleep(100);

    // Remove the page-transition class to end transition
    main?.classList.remove('page-transition');
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
