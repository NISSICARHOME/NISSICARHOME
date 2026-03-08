
export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    videoUrl: string;
    backgroundImage: string;
  };
  services: {
    title: string;
    subtitle: string;
    multimediaUrl: string;
    items: { name: string; description: string }[];
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  footer: {
    companyName: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    socialLinks: { platform: string; url: string }[];
  };
  optimization: {
    whatsappFloating: boolean;
    socialProof: boolean;
    chatbotEnabled: boolean;
    googleAnalyticsId: string;
    metaTitle: string;
    metaDescription: string;
  };
}

export const siteContent: SiteContent = {
  hero: {
    title: "NISSI CAR-HOME",
    subtitle: "Soluciones premium para el cuidado y estética de tu vehículo. Tecnología de vanguardia para resultados de exhibición.",
    ctaText: "VER PRODUCTOS",
    videoUrl: "https://www.youtube.com/embed/vk3W73Pnan0?autoplay=1&mute=1&loop=1&playlist=vk3W73Pnan0",
    backgroundImage: "https://drive.google.com/uc?id=13-PIubLkqJJofUxN8VxUuQ8ZeLBM5Qnt"
  },
  services: {
    title: "EXPERTOS EN ESTÉTICA AUTOMOTRIZ",
    subtitle: "No solo ofrecemos productos, sino también servicios especializados y el mejor soporte para ti.",
    multimediaUrl: "https://www.youtube.com/embed/oAgP4klzRAM?autoplay=1&mute=1&loop=1&playlist=oAgP4klzRAM",
    items: [
      { name: 'Asesoría Personalizada y Garantía de 365 Días', description: 'Brindamos soporte uno a uno con cada cliente y respaldamos nuestros resultados con una política de garantía total por un año.' },
    ]
  },
  about: {
    title: "Sobre NISSI CAR-HOME",
    description: "Somos líderes en estética automotriz en Pereira. Nuestra pasión por los detalles y el uso de tecnología avanzada nos permite ofrecer resultados que superan las expectativas de nuestros clientes.",
    image: "https://drive.google.com/uc?id=13-PIubLkqJJofUxN8VxUuQ8ZeLBM5Qnt"
  },
  footer: {
    companyName: "NISSI CAR-HOME",
    description: "Cuidado y estética automotriz de nivel profesional.",
    address: "Pereira, Risaralda, Colombia",
    phone: "+57 310 375 4727",
    email: "contacto@nissicarhome.com",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/nissicarhome" },
      { platform: "Facebook", url: "https://facebook.com/nissicarhome" },
      { platform: "WhatsApp", url: "https://wa.me/573103754727" }
    ]
  },
  optimization: {
    whatsappFloating: true,
    socialProof: true,
    chatbotEnabled: true,
    googleAnalyticsId: "G-XXXXXXXXXX",
    metaTitle: "NISSI CAR-HOME | Estética Automotriz Premium",
    metaDescription: "Expertos en detallado, recubrimientos cerámicos y productos premium para el cuidado de tu vehículo en Pereira."
  }
};
