import type { MessageSchema } from "../schema"

export const en: MessageSchema = {
  nav: {
    home: "Home",
    code: "Engineering",
    frame: "Frame",
  },
  common: {
    readMore: "Read more",
    backToTop: "Back to top",
    email: "Email",
    location: "Location",
    linkedin: "LinkedIn",
    github: "GitHub",
    allRightsReserved: "All rights reserved.",
  },
  home: {
    gateCodeTitle: "Engineering",
    gateCodeSubtitle: "Three companies and five shipped products",
    gateFrameTitle: "Frame",
    gateFrameSubtitle: "Photo essays, short films, and the band",
    gateFrameTeaser: "Coming soon",
  },
  code: {
    sectionAbout: "01 - About",
    sectionSkills: "02 - Skills",
    sectionPath: "03 - The path",
    sectionWork: "04 - Selected work",
    present: "Present",
    backToWork: "Go back",
  },
  frame: {
    sectionWhy: "01 - Why",
    sectionFrames: "02 - Frames",
    sectionSeries: "03 - Series",
    sectionSound: "04 - Sound",
    why: "Why",
    seriesWip: "Full write-ups for these are on the way - you can already see the photos above.",
    seriesComingSoon: "Coming soon",
    vscoCta: "See more on VSCO",
    counter: "Frame {n} of {total}",
  },
  a11y: {
    skipToContent: "Skip to content",
    routeChanged: "Navigated to {pageTitle}",
  },
  skills: {
    languages: "Languages",
    frameworks: "Frameworks",
    tools: "Tools",
  },
  profile: {
    role: "Product Engineer",
    tagline: "Building amazing UIs, writing reliable code and creating awesome products.",
    location: "Coimbra, Portugal",
    portraitAlt: "Rafael Neves",
  },
  content: {
    timeline: {
      "edu-bsc-fctuc": {
        title: "Bachelor's in Informatics Engineering",
        location: "Coimbra, Portugal",
        body: [
          [
            {
              kind: "text",
              value:
                "Started my software development journey in Coimbra: three years immersed in algorithms, core coding concepts, and the tools that shaped my path as a developer.",
            },
          ],
        ],
      },
      "role-grama": {
        title: "Grama",
        location: "Coimbra, Portugal",
        body: [
          [
            { kind: "text", value: "My first job in tech. I built " },
            { kind: "link", value: "Sala-Z", href: "https://www.grama.io/work/sala-z.html" },
            { kind: "text", value: " from nothing, then moved on to the frontend team at " },
            { kind: "link", value: "ALT21", href: "https://alt21.com" },
            { kind: "text", value: ", one of Grama's clients." },
          ],
        ],
      },
      "edu-msc-fctuc": {
        title: "MSc in Software Engineering",
        location: "Coimbra, Portugal",
        body: [
          [
            {
              kind: "text",
              value:
                "Deepened my understanding of core coding concepts and got hands-on experience building a production app with a real tech company.",
            },
          ],
        ],
      },
      "role-plug-events": {
        title: "Plug Events",
        location: "Ireland",
        body: [
          [
            { kind: "strong", value: "Frontend Engineer Collaborator." },
            {
              kind: "text",
              value:
                " Three months of part-time, after-hours work with a small team, on a platform for artists to find and create events.",
            },
          ],
        ],
      },
      "role-unbabel": {
        title: "Unbabel",
        location: "Lisbon, Portugal",
        body: [
          [
            { kind: "strong", value: "Cluster Frontend Lead." },
            {
              kind: "text",
              value:
                " Owned product initiatives, shaped the frontend architecture, and migrated Vue 2 to Vue 3, all while shipping UIs used by some of the biggest companies in the world, like ",
            },
            { kind: "strong", value: "Adidas" },
            { kind: "text", value: ", " },
            { kind: "strong", value: "LEGO" },
            { kind: "text", value: " and " },
            { kind: "strong", value: "Booking.com" },
            { kind: "text", value: "." },
          ],
        ],
      },
      "role-zkipster": {
        title: "zkipster",
        location: "Lisbon, Portugal",
        body: [
          [
            { kind: "strong", value: "Cluster Frontend Lead." },
            { kind: "text", value: " Building " },
            { kind: "strong", value: "Audience" },
            {
              kind: "text",
              value: ", zkipster's guest management platform for luxury events. ",
            },
            {
              kind: "text",
              value:
                "Beyond shipping a product used by some of the biggest event companies in the world, I help guide where it goes next.",
            },
          ],
        ],
      },
    },
    projects: {
      "unbabel-portal": {
        summary:
          "Portal is the customer-facing product of Unbabel, giving customer service teams an easy way to manage language operations and optimize customer experience over time.",
        coverAlt: "Unbabel Portal interface",
        problem: [
          [
            { kind: "text", value: "A " },
            { kind: "strong", value: "Micro Frontend" },
            {
              kind: "text",
              value:
                " architecture, where multiple teams each built their own frontend, all coming together into one unified product. I managed and led the frontend guild, making sure every team stayed aligned, sharing knowledge and best practices across silos.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Senior Frontend Engineer" }]],
      },
      "x-hedge": {
        summary:
          "X-Hedge is a pioneering platform enabling businesses to provide customized currency hedging solutions under their own brand.",
        coverAlt: "X-Hedge interface",
        problem: [
          [
            { kind: "text", value: "One of the frontend engineers working across multiple " },
            { kind: "text", value: "products at " },
            { kind: "strong", value: "ALT21" },
            {
              kind: "text",
              value:
                ". X-Hedge is used daily to hedge currency, and as a small team of engineers, we made sure moving large amounts of money was both safe and easy.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Frontend Engineer" }]],
      },
      "sala-z": {
        summary:
          "Sala-Z is a web application designed to manage musical venues, offering a straightforward and intuitive platform for handling multiple events. Currently undergoing maintenance.",
        coverAlt: "Sala-Z interface",
        problem: [
          [
            {
              kind: "text",
              value:
                "As the first product I ever shipped, I built an event management tool end to end: talking to stakeholders, gathering requirements, and building the backend, frontend, and deployment workflow for both the public product and the admin panel. Still one of my biggest accomplishments.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Fullstack Engineer" }]],
      },
      unravel: {
        summary:
          "Unravel is a personal project that lets users manage and view their own service catalog in a futuristic way.",
        coverAlt: "Unravel interface",
        problem: [
          [
            { kind: "text", value: "A side project born out of working at " },
            { kind: "strong", value: "Unbabel" },
            {
              kind: "text",
              value:
                " (hence the name). In a product full of components and systems, we struggled to visualize how everything interacted and worked together. Unravel is a proof of concept, built entirely by me, showing how an infinite canvas could be used to drill down into a software company's architecture.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Personal Project" }]],
      },
      "plug-events": {
        summary:
          "Plug Events is a dynamic platform for artists, simplifying the process of finding and creating events while fostering connections within the artistic community.",
        coverAlt: "Plug Events interface",
        problem: [
          [
            {
              kind: "text",
              value:
                "A mostly collaborative project, Plug Events helps venues showcase and market their events. I contributed after hours, building the frontend and giving my honest opinion on the direction forward.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Frontend Engineer" }]],
      },
    },
    series: {
      "series-one": {
        title: "[ Series write-up pending ]",
        intent: "[ Coming soon ]",
      },
      "series-two": {
        title: "[ Series write-up pending ]",
        intent: "[ Coming soon ]",
      },
      "series-three": {
        title: "[ Series write-up pending ]",
        intent: "[ Coming soon ]",
      },
    },
    home: {
      intro: [
        [
          {
            kind: "text",
            value: "Six years of product development, mostly on the frontend. From building ",
          },
          { kind: "text", value: "currency hedging solutions at " },
          { kind: "strong", value: "Grama" },
          { kind: "text", value: ", to AI-powered translations at " },
          { kind: "strong", value: "Unbabel" },
          { kind: "text", value: ", and now the world's biggest event management platform at " },
          { kind: "strong", value: "zkipster" },
          {
            kind: "text",
            value: ". I've shipped great products and led small teams along the way.",
          },
        ],
      ],
      outro: [
        [
          {
            kind: "text",
            value: "In between lines of code, art makes me feel at ease. From taking photos ",
          },
          { kind: "text", value: "around the world to now getting into " },
          { kind: "strong", value: "post-production movie editing" },
          { kind: "text", value: ", I love everything film-related. " },
          { kind: "text", value: "Feel free to take a look at my work." },
        ],
      ],
    },
    code: {
      about: [
        [
          {
            kind: "text",
            value:
              "Six years of frontend, most of it leading or owning product areas: turning designs into ",
          },
          { kind: "strong", value: "Vue" },
          {
            kind: "text",
            value:
              " interfaces, and enough time on the backend and infrastructure side to ship features end to end rather than hand them off. ",
          },
          { kind: "strong", value: "Code is more than a career, it's a hobby." },
        ],
      ],
    },
    frame: {
      why: [
        [
          { kind: "text", value: "Stills and moving images, shot around the world. " },
          {
            kind: "text",
            value:
              "This is the half of the work nobody commissioned, and the only half where I choose the brief.",
          },
        ],
      ],
      gallerySummary: [
        [
          {
            kind: "text",
            value:
              "Photography is an escape for me - the moment itself matters more than making it last forever. From Europe to Asia, from sea to land, I try to always have a lens with me.",
          },
        ],
      ],
      soundBody: [
        [
          {
            kind: "text",
            value:
              "I have played since I was ten. I finished music school, taught music part-time during my engineering degree, and co-founded this animation band. It is the oldest thing on this website.",
          },
        ],
      ],
      soundChips: ["Playing since 2008", "Co-founder", "Saxophone"],
    },
  },
}
