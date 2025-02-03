import "./globals.css";

export const metadata = {
  title: "Zephyr's portfolio",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-custom">{children}</body>
    </html>
  );
}
