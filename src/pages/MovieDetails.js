import { Lightning } from "@lightningjs/sdk";
import { getMovie, getRecommendations } from "../lib/API";
import { Movie } from "../components/Movie";
import { MovieList } from "../components/MovieList";

export class MovieDetails extends Lightning.Component {

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000,
            },
            Movie: {
                flex: {
                    direction: 'column',
                    padding: 20,
                },
                Details: {
                    flex: {
                        direction: 'row',
                        padding: 20,
                    },
                    rect: true,
                    color: 0xff000000,
                    Image: {
                    },
                    Description: {
                        flex: {
                            direction: 'column',
                            padding: 20
                        },
                        Title: {
                        },
                        Release: {
                            text: {
                                fontSize: 32,
                            }
                        },
                        Synopsis: {
                            text: {
                                wordWrapWidth: 750,
                                fontSize: 24,
                            }
                        }
                    }
                },
                Recommendations: {
                    h: 50,
                    w: 50,
                    type: MovieList,
                    isRec: true,
                }
            }
        }
    }

    set params(args) {
        console.log('Setting params ' + args);
        this.loadMovie(args.movieId);
    }

    async loadMovie(movieId) {
        let movie = await getMovie(movieId);
        this.tag('Recommendations').clear();
        this.tag('Recommendations').loadMovies(movieId, 1);

        this.tag('Image').patch({
            src: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path,

        })

        this.tag("Title").patch({
            text: {
                text: movie.title
            }
        })

        this.tag("Release").patch({
            text: {
                text: movie.release_date
            }
        })
        this.tag("Synopsis").patch({
            text: {
                text: movie.overview
            }
        })
    }


    _getFocused() {
        return this.tag('Recommendations');
    }
}