import type { MessageSchema } from "../schema"

export const pt: MessageSchema = {
  nav: {
    home: "Início",
    code: "Engenharia",
    frame: "Frame",
  },
  common: {
    readMore: "Ler mais",
    backToTop: "Voltar ao topo",
    email: "Email",
    location: "Localização",
    linkedin: "LinkedIn",
    github: "GitHub",
    allRightsReserved: "Todos os direitos reservados.",
  },
  home: {
    gateCodeTitle: "Engenharia",
    gateCodeSubtitle: "Três empresas e cinco produtos lançados",
    gateFrameTitle: "Frame",
    gateFrameSubtitle: "Ensaios fotográficos, curtas-metragens e a banda",
    gateFrameTeaser: "Brevemente",
  },
  code: {
    sectionAbout: "01 - Sobre",
    sectionSkills: "02 - Competências",
    sectionPath: "03 - O percurso",
    sectionWork: "04 - Trabalho selecionado",
    present: "Presente",
    backToWork: "Voltar",
  },
  frame: {
    sectionWhy: "01 - Porquê",
    sectionFrames: "02 - Frames",
    sectionSeries: "03 - Séries",
    sectionSound: "04 - Som",
    why: "Porquê",
    seriesWip: "Os textos completos destas séries estão a caminho - já podes ver as fotos acima.",
    seriesComingSoon: "Brevemente",
    vscoCta: "Ver mais no VSCO",
    counter: "Frame {n} de {total}",
  },
  a11y: {
    skipToContent: "Saltar para o conteúdo",
    routeChanged: "Navegou para {pageTitle}",
  },
  skills: {
    languages: "Linguagens",
    frameworks: "Frameworks",
    tools: "Ferramentas",
  },
  profile: {
    role: "Product Engineer",
    tagline: "A construir UIs incríveis, a escrever código fiável e a criar produtos fantásticos.",
    location: "Coimbra, Portugal",
    portraitAlt: "Rafael Neves",
  },
  content: {
    timeline: {
      "edu-bsc-fctuc": {
        title: "Licenciatura em Engenharia Informática",
        location: "Coimbra, Portugal",
        body: [
          [
            {
              kind: "text",
              value:
                "Comecei a minha jornada no desenvolvimento de software em Coimbra: três anos imerso em algoritmos, conceitos fundamentais de programação, e nas ferramentas que moldaram o meu percurso como programador.",
            },
          ],
        ],
      },
      "role-grama": {
        title: "Grama",
        location: "Coimbra, Portugal",
        body: [
          [
            { kind: "text", value: "O meu primeiro emprego em tecnologia. Construí o " },
            { kind: "link", value: "Sala-Z", href: "https://www.grama.io/work/sala-z.html" },
            { kind: "text", value: " a partir do zero, e depois passei para a equipa de " },
            { kind: "text", value: "frontend na " },
            { kind: "link", value: "ALT21", href: "https://alt21.com" },
            { kind: "text", value: ", um dos clientes da Grama." },
          ],
        ],
      },
      "edu-msc-fctuc": {
        title: "Mestrado em Engenharia Informática",
        location: "Coimbra, Portugal",
        body: [
          [
            {
              kind: "text",
              value:
                "Aprofundei o meu conhecimento de conceitos fundamentais de programação e ganhei experiência prática a construir uma aplicação em produção com uma empresa de tecnologia real.",
            },
          ],
        ],
      },
      "role-plug-events": {
        title: "Plug Events",
        location: "Irlanda",
        body: [
          [
            { kind: "strong", value: "Frontend Engineer Collaborator." },
            {
              kind: "text",
              value:
                " Três meses de trabalho a part-time, fora de horas, com uma pequena equipa, numa plataforma para artistas encontrarem e criarem eventos.",
            },
          ],
        ],
      },
      "role-unbabel": {
        title: "Unbabel",
        location: "Lisboa, Portugal",
        body: [
          [
            { kind: "strong", value: "Cluster Frontend Lead." },
            {
              kind: "text",
              value:
                " Fui responsável por iniciativas de produto, moldei a arquitetura do frontend, e migrei de Vue 2 para Vue 3, tudo isto enquanto lançava interfaces usadas por algumas das maiores empresas do mundo, como a ",
            },
            { kind: "strong", value: "Adidas" },
            { kind: "text", value: ", a " },
            { kind: "strong", value: "LEGO" },
            { kind: "text", value: " e a " },
            { kind: "strong", value: "Booking.com" },
            { kind: "text", value: "." },
          ],
        ],
      },
      "role-zkipster": {
        title: "zkipster",
        location: "Lisboa, Portugal",
        body: [
          [
            { kind: "strong", value: "Cluster Frontend Lead." },
            { kind: "text", value: " A construir o " },
            { kind: "strong", value: "Audience" },
            {
              kind: "text",
              value: ", a plataforma de gestão de convidados de luxo da zkipster. ",
            },
            {
              kind: "text",
              value:
                "Além de desenvolver um produto usado por algumas das maiores empresas de eventos do mundo, também ajudo a definir o rumo do produto.",
            },
          ],
        ],
      },
    },
    projects: {
      "unbabel-portal": {
        summary:
          "O Portal é o produto voltado para o cliente da Unbabel, dando às equipas de customer service uma forma simples de gerir operações de tradução e otimizar a experiência do cliente ao longo do tempo.",
        coverAlt: "Interface do Unbabel Portal",
        problem: [
          [
            { kind: "text", value: "Uma arquitetura de " },
            { kind: "strong", value: "Micro Frontends" },
            {
              kind: "text",
              value:
                ", em que várias equipas construíam o seu próprio frontend, unindo-se depois num único produto. Geri e liderei a guild de frontend, garantindo que todas as equipas se mantinham alinhadas, partilhando conhecimento e boas práticas entre silos.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Senior Frontend Engineer" }]],
      },
      "x-hedge": {
        summary:
          "A X-Hedge é uma plataforma pioneira que permite a empresas oferecer soluções de hedging cambial personalizadas sob a sua própria marca.",
        coverAlt: "Interface do X-Hedge",
        problem: [
          [
            { kind: "text", value: "Um dos frontend engineers a trabalhar em vários " },
            { kind: "text", value: "produtos da " },
            { kind: "strong", value: "ALT21" },
            {
              kind: "text",
              value:
                ". O X-Hedge é usado diariamente para fazer hedging de moeda, e como uma pequena equipa de engenheiros, garantimos que mover grandes quantias de dinheiro era simples e seguro.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Frontend Engineer" }]],
      },
      "sala-z": {
        summary:
          "O Sala-Z é uma aplicação web pensada para gerir salas de espetáculo, oferecendo uma plataforma simples e intuitiva para gerir vários eventos. Atualmente em manutenção.",
        coverAlt: "Interface do Sala-Z",
        problem: [
          [
            {
              kind: "text",
              value:
                "Como o primeiro produto que lancei, construí uma ferramenta de gestão de eventos de ponta a ponta: a falar com stakeholders, a levantar requisitos, e a construir o backend, o frontend e o processo de deployment, tanto para o produto público como para o painel de administração. Ainda uma das minhas maiores conquistas.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Fullstack Engineer" }]],
      },
      unravel: {
        summary:
          "O Unravel é um projeto pessoal que permite aos utilizadores gerir e visualizar o seu próprio catálogo de serviços de uma forma futurista.",
        coverAlt: "Interface do Unravel",
        problem: [
          [
            { kind: "text", value: "Um projeto paralelo nascido do trabalho na " },
            { kind: "strong", value: "Unbabel" },
            {
              kind: "text",
              value:
                " (daí o nome). Num produto cheio de componentes e sistemas, tínhamos dificuldade em visualizar como tudo interagia e funcionava em conjunto. O Unravel é uma prova de conceito, construída inteiramente por mim, que mostra como uma tela infinita pode ser usada para explorar a arquitetura de uma empresa de software.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Projeto Pessoal" }]],
      },
      "plug-events": {
        summary:
          "O Plug Events é uma plataforma dinâmica para artistas, simplificando o processo de encontrar e criar eventos, e promovendo ligações dentro da comunidade artística.",
        coverAlt: "Interface do Plug Events",
        problem: [
          [
            {
              kind: "text",
              value:
                "Um projeto sobretudo colaborativo, o Plug Events ajuda espaços a mostrar e promover os seus eventos. Colaborei fora de horas, construindo o frontend e dando a minha opinião honesta sobre o rumo a seguir.",
            },
          ],
        ],
        role: [[{ kind: "text", value: "Frontend Engineer" }]],
      },
    },
    series: {
      "series-one": {
        title: "[ Texto da série pendente ]",
        intent: "[ Brevemente ]",
      },
      "series-two": {
        title: "[ Texto da série pendente ]",
        intent: "[ Brevemente ]",
      },
      "series-three": {
        title: "[ Texto da série pendente ]",
        intent: "[ Brevemente ]",
      },
    },
    home: {
      intro: [
        [
          {
            kind: "text",
            value: "Seis anos de desenvolvimento de produto, sobretudo em frontend. Desde ",
          },
          { kind: "text", value: "soluções de hedging cambial na " },
          { kind: "strong", value: "Grama" },
          { kind: "text", value: ", a traduções com IA na " },
          { kind: "strong", value: "Unbabel" },
          { kind: "text", value: ", e agora a maior plataforma de gestão de eventos do mundo na " },
          { kind: "strong", value: "zkipster" },
          {
            kind: "text",
            value: ". Lancei ótimos produtos e liderei pequenas equipas ao longo do percurso.",
          },
        ],
      ],
      outro: [
        [
          {
            kind: "text",
            value: "Entre linhas de código, a arte é o que me traz calma. Desde tirar ",
          },
          { kind: "text", value: "fotografias por todo o mundo até agora começar a explorar a " },
          { kind: "strong", value: "montagem e pós-produção de filmes" },
          { kind: "text", value: ", adoro tudo o que é relacionado com cinema. " },
          { kind: "text", value: "Fica à vontade para dar uma vista de olhos ao meu trabalho." },
        ],
      ],
    },
    code: {
      about: [
        [
          {
            kind: "text",
            value:
              "Seis anos de frontend, a maior parte a liderar ou a ser responsável por áreas de produto: a transformar designs em interfaces ",
          },
          { kind: "strong", value: "Vue" },
          {
            kind: "text",
            value:
              ", com tempo suficiente do lado do backend e da infraestrutura para entregar funcionalidades de ponta a ponta em vez de as passar a outra equipa. ",
          },
          { kind: "strong", value: "Código é mais do que uma carreira, é um hobby." },
        ],
      ],
    },
    frame: {
      why: [
        [
          { kind: "text", value: "Fotografias e imagens em movimento, feitas por todo o " },
          {
            kind: "text",
            value:
              "mundo. Esta é a metade do trabalho que ninguém encomendou, e a única metade onde escolho o brief.",
          },
        ],
      ],
      gallerySummary: [
        [
          {
            kind: "text",
            value:
              "A fotografia é uma fuga para mim - o momento em si importa mais do que torná-lo eterno. Da Europa à Ásia, do mar à terra, tento ter sempre uma lente comigo.",
          },
        ],
      ],
      soundBody: [
        [
          {
            kind: "text",
            value:
              "Toco desde os dez anos. Terminei o conservatório de música, dei aulas de música a part-time durante o meu curso de engenharia, e co-fundei esta banda de animação. É a coisa mais antiga neste site.",
          },
        ],
      ],
      soundChips: ["A tocar desde 2008", "Co-fundador", "Saxofone"],
    },
  },
}
