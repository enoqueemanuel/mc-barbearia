/**
 * Busca ao vivo a nota e as avaliações reais do Google Business Profile.
 * Precisa de GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID no ambiente (.env.local).
 * Sem essas variáveis, retorna null e a UI mostra um estado sem número
 * inventado, só o link para o perfil real no Google.
 *
 * Revalida uma vez por dia: a nota e a contagem acompanham o crescimento
 * real no Google sem precisar editar código.
 */

type GooglePlaceReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
};

type GooglePlaceDetailsResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceReview[];
  };
};

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  totalReviews: number;
  /** Só avaliações com nota >= 4 e com texto (feedback positivo de verdade). */
  positiveReviews: GoogleReview[];
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "rating,user_ratings_total,reviews");
    url.searchParams.set("language", "pt-BR");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return null;

    const data: GooglePlaceDetailsResponse = await res.json();
    if (data.status !== "OK" || !data.result) return null;

    const positiveReviews = (data.result.reviews ?? [])
      .filter((review) => review.rating >= 4 && review.text?.trim().length > 0)
      .map((review) => ({
        authorName: review.author_name,
        rating: review.rating,
        text: review.text,
        relativeTime: review.relative_time_description,
      }));

    return {
      rating: data.result.rating ?? 0,
      totalReviews: data.result.user_ratings_total ?? 0,
      positiveReviews,
    };
  } catch {
    return null;
  }
}
