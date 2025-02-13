import './globals.css';

import Header from '@/components/header';

export const metadata = {
  title: 'Portfolio',
  description: '...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-custom tv-grain">
        <main className="bg-background w-screen h-screen overflow-hidden fixed top-0 left-0 flex flex-col ">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
