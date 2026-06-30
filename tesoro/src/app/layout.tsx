import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CocktailsProvider } from "./context/CocktailsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD de cócteles | TheCocktailDB",
  description: "Gestión de cócteles con estado en memoria, inspirado en TheCocktailDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CocktailsProvider>{children}</CocktailsProvider>
      </body>
    </html>
  );
}
