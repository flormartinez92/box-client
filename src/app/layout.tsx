import type { Metadata } from 'next';
import './globals.css';
//font
import { roboto } from '../../public/fonts/fonts';
//redux
import { Providers } from '@/store/Providers';
//components
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Box',
  description: 'Repartos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-lightGreen `}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
