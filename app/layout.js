import './globals.css';

import Header from '@/components/header/header';

export const metadata = {
  title: 'Zephyr Dassouli',
  description: '',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden w-screen h-screen">
        <div className="font-custom tv-grain bg-background ">
          <main className="w-screen h-screen overflow-hidden fixed top-0 left-0 flex flex-col">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
