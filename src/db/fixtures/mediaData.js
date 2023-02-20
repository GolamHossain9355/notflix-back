const fetch = require("node-fetch");

async function mediaData() {
  try {
    const response = [
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250&sort=boxoffice_gross_us,asc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250&sort=boxoffice_gross_us,desc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250&sort=user_rating,asc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250&sort=user_rating,desc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=feature&countries=us&languages=en&count=250&sort=moviemeter,desc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=tv_series&countries=us&count=250"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=tv_series&countries=us&count=250&sort=moviemeter,desc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=tv_series&countries=us&count=250&sort=user_rating,desc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=tv_series&countries=us&count=250&sort=boxoffice_gross_us,asc"
      ),
      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_us23mp7b?title_type=tv_series&countries=us&count=250&sort=boxoffice_gross_us,desc"
      ),
    ];

    const results = await Promise.all(response);
    const data = await Promise.all(results.map((item) => item.json()));

    return data.reduce((allMediaTypesAdded, mediaType) => {
      const type = mediaType.queryString.includes("feature") ? "movie" : "series";
      const reorganizedMedia = mediaType.results.map((media) => {
        const date = formatDate(media.description);
        return {
          type,
          image: media.image,
          title: media.title,
          year_released: date,
          runtime: media.runtimeStr,
          genres: media.genres,
          content_rating: media.contentRating,
          imDb_rating: media.imDbRating,
          metacritic_rating: media.metacriticRating,
          summery: media.plot,
          cast: media.stars,
        };
      });
      allMediaTypesAdded = allMediaTypesAdded.concat(reorganizedMedia);
      return allMediaTypesAdded;
    }, []);
  } catch (e) {
    console.error(e);
  }
}

function formatDate(date) {
  const num = date.replace(/[^0-9]/g, "");
  if (num.length === 4) {
    return `${num}`;
  }
  return `${num.substring(0, 4)}-${num.substring(4)}`;
}

module.exports = mediaData;
