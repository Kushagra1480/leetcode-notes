import '@/app/globals.css';

export const metadata = {
  title: 'LeetCode Question Summary',
  description: 'A tool for last-minute interview prep',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}