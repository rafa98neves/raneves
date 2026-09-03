/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-cross-module",
      severity: "error",
      comment: "modules/* may import core/, content/, i18n/ - never another module",
      from: { path: "^src/modules/([^/]+)/" },
      to: { path: "^src/modules/([^/]+)/", pathNot: "^src/modules/$1/" },
    },
    {
      name: "core-is-independent",
      severity: "error",
      comment: "core/ never imports modules/",
      from: { path: "^src/core/" },
      to: { path: "^src/modules/" },
    },
    {
      name: "content-is-pure",
      severity: "error",
      comment:
        "content/ imports only its own types - content/index.ts is the sanctioned exception, bridging facts with i18n/locales/*",
      from: { path: "^src/content/", pathNot: "^src/content/index\\.ts$" },
      to: { path: "^src/(core|modules|i18n)/" },
    },
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
    },
  },
}
