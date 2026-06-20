import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NaCCA QR Portal',
  description: 'National Council for Curriculum and Assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}