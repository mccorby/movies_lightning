
const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'api_key=6510d88d7ede0217c1c2e67d17affd67';

const getMovies = async (page) => {
    const results = await fetch(baseUrl + 'movie/upcoming?' + apiKey + '&page=' + page);
    return results.json();
}

const getPopular = async (page) => {
    const results = await fetch(baseUrl + 'movie/popular?' + apiKey);
    return results.json();
}

const getConfiguration = async () => {
    const results = await fetch(baseUrl + 'configuration?' + apiKey);
    return results.json();
}

const getMovie = async (movieId) => {
    const results = await fetch(baseUrl + 'movie/' + movieId + '?' + apiKey);
    return results.json();
}

const getRecommendations = async (movieId, page) => {
    const results = await fetch(
        baseUrl + 'movie/' + movieId + '/recommendations' + '?' + apiKey
        + '&page=' + page
    )
    return results.json();
}

export { getMovies, getConfiguration, getMovie, getRecommendations, getPopular }
