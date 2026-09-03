import { nextTick } from "vue"
import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import { routes } from "./router"
import { createAppI18n } from "./i18n"
import { installThemeTransition } from "./core/motion/useThemeTransition"
import "./core/styles/reset.css"
import "./core/styles/tokens.css"
import "./core/styles/themes.css"
import "./core/styles/motion.css"

export const createApp = ViteSSG(
  App,
  {
    routes,
    // forward navigation lands at the top of the new page; browser
    // back/forward restores where the user was; a route with a #hash (the
    // case-study "Go back" link, landing on Selected Work rather than the
    // top of Engineering) scrolls to that element instead of either -
    // providing a custom scrollBehavior at all opts out of Vue Router's own
    // default hash handling, so it has to be redone here
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 24 }
      return { top: 0 }
    },
  },
  ({ app, router }) => {
    const i18n = createAppI18n()
    app.use(i18n)

    // registered here, not inside App.vue's setup(): during prerendering each
    // route's initial navigation resolves before the app mounts, so a guard
    // registered at component-setup time would miss it entirely
    router.beforeEach((to) => {
      i18n.global.locale.value = (to.meta.locale as string) ?? "en"
    })

    installThemeTransition(router, nextTick)
  },
)
