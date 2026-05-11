import "./globals.css";

export const metadata = {
  title: "Chat2MD - Converter",
  description: "Transform your AI chats into standard Markdown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
