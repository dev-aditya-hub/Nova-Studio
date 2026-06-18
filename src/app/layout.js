import "./globals.css";

export const metadata = {
  title: "Nova Studio — Digital Agency",
  description:
    "Nova Studio is a creative digital agency specializing in web design, front-end development, and branding. We build digital experiences that captivate and convert.",
  keywords: ["digital agency", "web design", "front-end development", "branding"],
};

import Navigation from "@/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
