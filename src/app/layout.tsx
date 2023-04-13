import './globals.css';

export const metadata = {
  title: 'Lord of the Rings Quote Quiz',
  description:
    'Guess the character who said the quote and which movie it was said in. You will be given 10 quotes to identify. Collect 1 point for each correctly guessed character, and 1 point for each correctly guessed movie.',
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
