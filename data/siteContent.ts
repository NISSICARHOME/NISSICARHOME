
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
    title: "Nissi Car Home",
    subtitle: "Soluciones premium para el cuidado y estética de tu vehículo. Tecnología de vanguardia para resultados de exhibición.",
    ctaText: "VER PRODUCTOS",
    videoUrl: "https://www.youtube.com/embed/vk3W73Pnan0?autoplay=1&mute=1&loop=1&playlist=vk3W73Pnan0",
    backgroundImage: "https://picsum.photos/seed/carcare/1920/1080"
  },
  services: {
    title: "EXPERTOS EN ESTÉTICA AUTOMOTRIZ",
    subtitle: "No solo ofrecemos productos, sino también servicios especializados y el mejor soporte para ti.",
    multimediaUrl: "https://www.youtube.com/embed/oAgP4klzRAM?autoplay=1&mute=1&loop=1&playlist=oAgP4klzRAM",
    items: [
      { name: 'Detailing Automotriz', description: 'Limpieza profunda y restauración interna de vehículos.' },
      { name: 'Spa para Vehículos', description: 'Tratamientos completos para el cuidado interior y exterior de tu automóvil.' },
      { name: 'Aplicación de Recubrimiento Cerámico y Porcelanizado', description: 'Revestimientos de protección avanzados para la carrocería y pintura.' },
      { name: 'Desmanchado de Vidrios', description: 'Servicio especializado para hoteles, unidades residenciales, casas campestres y piscinas.' },
      { name: 'Asesoría personalizada', description: 'Brindamos soporte uno a uno con cada cliente para garantizar los mejores resultados.' },
      { name: 'Garantía de 365 días', description: 'Respaldamos nuestros productos con una política de garantía en el resultado final.' },
    ]
  },
  about: {
    title: "Sobre Nissi Car Home",
    description: "Somos líderes en estética automotriz en Pereira. Nuestra pasión por los detalles y el uso de tecnología avanzada nos permite ofrecer resultados que superan las expectativas de nuestros clientes.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=01"
  },
  footer: {
    companyName: "Nissi Car Home",
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
    metaTitle: "Nissi Car Home | Estética Automotriz Premium",
    metaDescription: "Expertos en detallado, recubrimientos cerámicos y productos premium para el cuidado de tu vehículo en Pereira."
  }
};
