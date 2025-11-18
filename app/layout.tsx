import type { Metadata } from "next";
import { headers } from "next/headers";
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
  title: "Code Learning Hub",
  description: "Learn web development with step-by-step code examples",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isMobileDevice ? (
          <main
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#020617",
              color: "#f8fafc",
              textAlign: "center",
              padding: "2rem",
            }}
          >
            <div>
              <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                Mobile view coming soon
              </p>
              <p style={{ fontSize: "1.125rem", opacity: 0.8 }}>
                We’re still building the best experience for smaller screens.
                Please check back later or use a desktop device meanwhile.
              </p>
            </div>
          </main>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
