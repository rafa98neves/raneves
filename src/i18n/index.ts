import { createI18n } from "vue-i18n"
import type { MessageSchema } from "./schema"
import { en } from "./locales/en"
import { pt } from "./locales/pt"

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}

export type SupportedLocale = "en" | "pt"

// a factory, not a module-level singleton: vite-ssg renders every route through
// the same Node process, and a shared i18n instance's locale ref would leak
// between routes (English pages briefly showed Portuguese placeholder text
// before this fix, since one route's locale mutation raced another's render)
export function createAppI18n() {
  return createI18n<[MessageSchema], SupportedLocale>({
    legacy: false,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    messages: { en, pt },
  })
}
