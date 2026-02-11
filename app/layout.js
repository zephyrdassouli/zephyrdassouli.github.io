import './globals.css';
import Script from 'next/script';

import Header from '@/components/header/header';
import ClientLayout from './clientLayout';

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="overflow-hidden w-screen h-screen">
        <div className="font-custom tv-grain bg-background ">
          {gaId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { send_page_view: true });
                `}
              </Script>
            </>
          )}
          <ClientLayout>
            <main className="w-screen h-screen overflow-hidden fixed top-0 left-0 flex flex-col">
              <Header />
              {children}
            </main>
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
