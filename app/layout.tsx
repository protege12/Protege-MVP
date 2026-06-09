import type { Metadata } from "next";
import "@fontsource/open-sauce-one/400.css";
import "@fontsource/open-sauce-one/700.css";
import "@fontsource/open-sauce-one/900.css";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans bg-protege-cream text-protege-dark antialiased">
        {children}
      </body>
    </html>
  );
}
