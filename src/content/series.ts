import type { Series } from "./types"

// real photo essays now (ai/initial-plan.md Open Items #2/#6, partially
// resolved). No actual film footage exists yet, so nothing currently uses
// kind: "film" - the type still supports it for whenever that changes.
// Ordered newest-first, matching how the Code timeline sorts.
//
// Frame.alt is plain English, not run through i18n/locales/*.ts: unlike
// title/intent it isn't prose a Portuguese visitor reads, it's a
// screen-reader-only description of the photo itself - describing the
// same photo in two languages is more upkeep for no benefit its audience
// would notice.
export const series: Series[] = [
  {
    id: "series-one",
    year: 2026,
    kind: "photo-essay",
    frames: [
      {
        image: {
          src: "/images/frame/verona.jpg",
          width: 1706,
          height: 2560,
          dominant: "#9aa5b0",
        },
        alt: "Verona's rooftops and the Adige river seen from Castel San Pietro",
        ratio: "2:3",
        kind: "photo",
      },
      {
        image: {
          src: "/images/frame/venice.jpg",
          width: 1706,
          height: 2560,
          dominant: "#c98868",
        },
        alt: "The Church of the Santissimo Redentore in Venice at sunset, seen across the water",
        ratio: "2:3",
        kind: "photo",
      },
      {
        image: {
          src: "/images/frame/lighthouse.jpg",
          width: 1706,
          height: 2560,
          dominant: "#bcdcef",
        },
        alt: "A lighthouse on a coastal cliff, two hikers approaching along the path",
        ratio: "2:3",
        kind: "photo",
      },
    ],
  },
  {
    id: "series-two",
    year: 2026,
    kind: "photo-essay",
    frames: [
      {
        image: {
          src: "/images/frame/lake-carezza.jpg",
          width: 2560,
          height: 1706,
          dominant: "#2f5c52",
        },
        alt: "Lake Carezza's teal water reflecting the jagged peaks of the Latemar massif, Dolomites",
        ratio: "30:22",
        kind: "photo",
      },
      {
        image: {
          src: "/images/frame/chalet.jpg",
          width: 1706,
          height: 2560,
          dominant: "#5b6b45",
        },
        alt: "A wooden mountain chalet with open shutters, seen from the lawn",
        ratio: "2:3",
        kind: "photo",
      },
      {
        image: {
          src: "/images/frame/lake.jpg",
          width: 2560,
          height: 1706,
          dominant: "#a6a9ad",
        },
        alt: "Lake Misurina under an overcast sky, the Grand Hotel and Cadini mountains behind it",
        ratio: "30:22",
        kind: "photo",
      },
    ],
  },
  {
    id: "series-three",
    year: 2025,
    kind: "photo-essay",
    frames: [
      {
        image: {
          src: "/images/frame/jellyfish.jpg",
          width: 2560,
          height: 1706,
          dominant: "#0f3d2e",
        },
        alt: "A moon jellyfish glowing green against a dark background",
        ratio: "2:3",
        kind: "photo",
      },
      {
        image: {
          src: "/images/frame/elephant.jpg",
          width: 2560,
          height: 1706,
          dominant: "#8a7358",
        },
        alt: "Macro close-up of an elephant's eye and weathered skin",
        ratio: "2:3",
        kind: "photo",
      },
    ],
  },
]
