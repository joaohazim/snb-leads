export const portoAlgarveImages = [
  {
    src: "/images/porto-algarve/insercao.jpg",
    alt: "Porto Algarve - Inserção do empreendimento"
  },
  {
    src: "/images/porto-algarve/fachada-lateral.jpg",
    alt: "Porto Algarve - Fachada lateral"
  },
  {
    src: "/images/porto-algarve/deck-elevado-e-piscina.jpg",
    alt: "Porto Algarve - Deck elevado e piscina"
  },
  {
    src: "/images/porto-algarve/area-verde.jpg",
    alt: "Porto Algarve - Área verde"
  },
  {
    src: "/images/porto-algarve/studio-sala-e-cozinha.jpg",
    alt: "Porto Algarve - Studio sala e cozinha"
  },
  {
    src: "/images/porto-algarve/studio-varanda.jpg",
    alt: "Porto Algarve - Studio varanda"
  },
  {
    src: "/images/porto-algarve/apto-duplex-sala-e-cozinha.jpg",
    alt: "Porto Algarve - Apartamento duplex sala e cozinha"
  },
  {
    src: "/images/porto-algarve/insercao-02.jpg",
    alt: "Porto Algarve - Vista geral do empreendimento"
  }
];

export const portoRivieraImages = [
  {
    src: "/images/porto-riviera/rooftop.jpg",
    alt: "Porto Riviera - Rooftop com vista panorâmica"
  },
  {
    src: "/images/porto-riviera/piscina-noturna.jpg",
    alt: "Porto Riviera - Piscina noturna"
  },
  {
    src: "/images/porto-riviera/01-fachada-leste.jpg",
    alt: "Porto Riviera - Fachada leste"
  },
  {
    src: "/images/porto-riviera/fachada-noturna.jpg",
    alt: "Porto Riviera - Fachada noturna"
  },
  {
    src: "/images/porto-riviera/03-aerea-geral.jpg",
    alt: "Porto Riviera - Vista aérea geral"
  },
  {
    src: "/images/porto-riviera/apt-studio.jpg",
    alt: "Porto Riviera - Apartamento studio"
  },
  {
    src: "/images/porto-riviera/studio-02.jpg",
    alt: "Porto Riviera - Studio vista 2"
  },
  {
    src: "/images/porto-riviera/dji_02.jpg",
    alt: "Porto Riviera - Vista aérea drone"
  }
];

export const getImageSrcs = (images: typeof portoAlgarveImages) => 
  images.map(img => img.src);