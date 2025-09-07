import "@fontsource/amiri/400.css";
import "@fontsource/lato/400.css";
import "@fontsource/cairo/400.css";
import { ThemeProvider } from "./theme/ThemeProvider";
import LocaleProvider from "./theme/LocaleProvider";
import SessionProvider from "./auth/SessionProvider";
import Navigation from "../components/Navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <LocaleProvider>
              <Navigation />
              <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
              </main>
            </LocaleProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
