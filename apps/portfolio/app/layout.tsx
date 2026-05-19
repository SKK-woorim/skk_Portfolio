import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '송경근 Portfolio',
  description: '송경근 개발자 포트폴리오'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
