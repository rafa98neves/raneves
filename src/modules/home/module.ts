import { defineModule } from "../types"

export default defineModule({
  id: "home",
  path: "",
  theme: "ink",
  navKey: "home",
  routes: [
    {
      path: "",
      name: "home",
      component: () => import("./views/HomeView.vue"),
    },
  ],
})
