import './globals.css';

import SideBar from '@/components/sideBar';

export const metadata = {
  title: 'Portfolio',
  description: '...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-custom">
        <main className="bg-background w-screen h-screen overflow-hidden fixed top-0 left-0 flex ">
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
