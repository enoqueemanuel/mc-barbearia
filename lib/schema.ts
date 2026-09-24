import { siteConfig } from "@/data/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export async function buildHairSalonSchema() {
  const reviews = await getGoogleReviews();
  const { latitude, longitude } = siteConfig.geo;

  return {
    "@context": "https://schema.org",
    // HairSalon já é um subtipo de LocalBusiness; schema.org não tem um
    // tipo "BarberShop" oficial — HairSalon é o mais específico e correto.
    "@type": ["HairSalon", "LocalBusiness"],
    name: siteConfig.brandName,
    alternateName: siteConfig.legalName,
    image: `${siteConfig.url}/images/gallery/equipe-dupla.jpg`,
    ...(siteConfig.logoUrl ? { logo: siteConfig.logoUrl } : {}),
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.number} - ${siteConfig.address.neighborhood}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    ...(latitude !== null && longitude !== null
      ? { geo: { "@type": "GeoCoordinates", latitude, longitude } }
      : {}),
    url: siteConfig.url,
    sameAs: [siteConfig.social.instagram],
    priceRange: "R$$",
    openingHoursSpecification: siteConfig.openingHoursSpecification.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    // Só entra no schema quando a nota vem ao vivo do Google: markup de
    // avaliação inventado ou desatualizado viola as diretrizes do Google.
    ...(reviews && reviews.totalReviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.rating,
            reviewCount: reviews.totalReviews,
          },
        }
      : {}),
  };
}
