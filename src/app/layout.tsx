import "@/styles/globals.css";
import { FileProvider } from '@/components/FileContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FileProvider>
          {children}
        </FileProvider>
      </body>
    </html>
  );
}
