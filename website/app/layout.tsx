import { ThemeProvider } from "../components/theme-provider";
import { getLocale } from "../lib/locale";
import { htmlLang } from "../lib/locales";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html lang={htmlLang(locale)} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
