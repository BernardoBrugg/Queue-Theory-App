import { AuthProvider } from "../components/AuthContext";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import "../styles/tokens.css";
import "../styles/animations.css";
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
