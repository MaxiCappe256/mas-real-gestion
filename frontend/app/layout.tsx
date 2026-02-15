import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Mas Real - Panel de Control',
  description:
    'Sistema de gestión para tu tienda. Controla ventas, gastos y productos.',
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${_inter.variable} font-sans antialiased bg-muted/50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
