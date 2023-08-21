import Modal from '@/components/Modal';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agile Task AI',
  description: 'Agile Task AI: AI-powered agile task and project management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  );
}
