import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Symbiosis - Fuse Your Hobbies into Extraordinary Projects',
  description: 'Combine your existing skills with new curiosities to generate unique, creative project ideas.',
  keywords: ['hobbies', 'DIY', 'projects', 'creativity', 'fusion', 'maker'],
  openGraph: {
    title: 'Symbiosis - Fuse Your Hobbies',
    description: 'Generate unique project ideas by combining your skills with new curiosities',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// Simple Footer Component
function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 text-sm">
          <p>Symbiosis • Made with curiosity • © {new Date().getFullYear()}</p>
          <p className="mt-2">Every project is a new adventure waiting to happen.</p>
        </div>
      </div>
    </footer>
  );
}