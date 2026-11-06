import { NextIntlClientProvider } from "next-intl";
import NotFoundPage from "../components/not-found-page";
import { DocumentLanguage } from "../components/document-language";
import { MotionObserver } from "../components/motion";

export default function NotFound() {
  return (
    <NextIntlClientProvider>
      <DocumentLanguage />
      <NotFoundPage />
      <MotionObserver />
    </NextIntlClientProvider>
  );
}
