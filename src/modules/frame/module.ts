import { defineModule } from "../types"

export default defineModule({
  id: "frame",
  path: "frame",
  theme: "velvet",
  navKey: "frame",
  routes: [
    {
      path: "",
      name: "frame",
      component: () => import("./views/FrameView.vue"),
    },
  ],
})
