import { AuthProvider } from "../components/AuthContext";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QueueTheoryApp — Teoria das Filas",
  description: "Analise sistemas de filas com cronometria precisa, dashboards interativos e simulações.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
