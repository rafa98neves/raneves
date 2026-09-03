import type { Profile } from "./types"

export const profile: Profile = {
  name: "Rafael Neves",
  born: 1998,
  // interim cutout; a proper cut-out at 1600px+ is Open Items #2's blocking asset
  portrait: {
    src: "/images/portrait.png",
    width: 460,
    height: 460,
    dominant: "#3a2e28",
  },
  links: {
    github: "https://github.com/rafa98neves",
    linkedin: "https://www.linkedin.com/in/neves98rafael/",
    email: "mailto:neves98rafael@gmail.com",
  },
}
