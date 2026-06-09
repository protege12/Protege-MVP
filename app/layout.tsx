import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Replace these stub files with the real Open Sauce One woff2 files:
//   app/fonts/OpenSauceOne-Regular.woff2
//   app/fonts/OpenSauceOne-Bold.woff2
//   app/fonts/OpenSauceOne-Black.woff2
// Download from: https://github.com/marcologous/Open-Sauce-Fonts
const openSauceOne = localFont({
  src: [
    { path: "./fonts/OpenSauceOne-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenSauceOne-Bold.woff2",    weight: "700", style: "normal" },
    { path: "./fonts/OpenSauceOne-Black.woff2",   weight: "900", style: "normal" },
  ],
  variable: "--font-open-sauce",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Protégé — Indianapolis Creative Mentorship",
  description:
    "Protégé connects young creatives with vetted local mentors through short, structured, in-person sessions in Indianapolis.",
  icons: { icon: "/Icon-Orange.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={openSauceOne.variable}>
      <body className="font-sans bg-protege-cream text-protege-dark antialiased">
        {children}
      </body>
    </html>
  );
}
