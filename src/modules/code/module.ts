import { defineModule } from "../types"

export default defineModule({
  id: "code",
  path: "code",
  theme: "steel",
  navKey: "code",
  routes: [
    {
      path: "",
      name: "code",
      component: () => import("./views/CodeView.vue"),
    },
    {
      path: ":slug",
      name: "code-project",
      component: () => import("./views/CaseStudyView.vue"),
    },
  ],
})
