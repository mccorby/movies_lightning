import { Lightning } from "@lightningjs/sdk";
import { getMovie, getRecommendations } from "../lib/API";
import { Movie } from "../components/Movie";

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
                    flex: {
                        direction: 'row',
                        padding: 20,
                    }
                }
            }
        }
    }

    set params(args) {
        this.loadMovie(args.movieId);
    }

    async loadMovie(movieId) {
        let movie = await getMovie(movieId);
        this.loadRecommendations(movieId, 1);
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

    async loadRecommendations(movieId, page) {
        console.log('Loading data')
        let data = await getRecommendations(movieId, page);
        if (this.nextPage < data.total_pages) {
            this.nextPage = data.page + 1;
        }
        this.totalPages = data.total_pages;

        let movies = data.results.map(aMovie => {
            this.movieIds.push(aMovie.id);
            return {
                type: Movie,
                movie: aMovie
            }
        })

        let tempChildren = this.tag('Recommendations').children;
        this.tag('Recommendations').patch({
            children: tempChildren.concat(movies)
        })
    }

    _handleRight() {
        this.loadMovies(this.nextPage);
        this.tag('Recommendations').patch({
            smooth: {
                x: this.tag('Recommendations').x - this.hOffset
            }
        })
        let maxIdx = this.tag('Recommendations').children.length - 1;
        if (this.index < maxIdx) {
            this.index++;
        }
    }

    _handleLeft() {
        if (this.tag('Recommendations').x < 0) {
            this.tag('Recommendations').patch({
                smooth: {
                    x: this.tag('Recommendations').x + this.hOffset
                }
            })
        }
        if (this.index > 0) {
            this.index--;
        }
    }
}