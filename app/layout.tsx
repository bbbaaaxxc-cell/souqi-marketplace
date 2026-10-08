import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سوقي | Marketplace عربي',
  description: 'منصة marketplace عربية صغيرة لعرض المنتجات وإدارة الطلبات والتحويل البنكي.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
