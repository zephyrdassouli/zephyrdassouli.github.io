import React from 'react';
import LinkPreview from './linkPreview';

export default function WindowLink({ children, link, variant = 'default' }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <LinkPreview handleClick={handleClick} button={children} link={link} variant={variant} />
  );
}
