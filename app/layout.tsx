import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Porto Algarve & Porto Riviera - Invista com Bitcoin | Open Doors + SNB",
  description: "Invista em imóveis premium em Porto de Galinhas usando Bitcoin. Studios beira-mar e rooftops com piscina privativa. Condições exclusivas de lançamento.",
  keywords: "investimento imobiliário, bitcoin, criptomoedas, porto de galinhas, imóveis premium, porto algarve, porto riviera",
  openGraph: {
    title: "Invista em Imóveis Premium com Bitcoin",
    description: "Transforme suas criptomoedas em patrimônio real. Empreendimentos exclusivos em Porto de Galinhas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
