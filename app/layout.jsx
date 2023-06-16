import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./components/provider";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Nav />
          {children}
          </body>
      </Provider>
    </html>
  );
}