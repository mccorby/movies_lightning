import { Lightning, Router } from "@lightningjs/sdk";
import { getMovies, getRecommendations } from "../lib/API";
import { Movie } from "./Movie";


export class MovieList extends Lightning.Component {

    static _template() {
        return {
            Movies: {
                flex: {
                    direction: 'row',
                    padding: 20,
                }
            }
        }
    }

    set params(args) {
        console.log('MovieList set Params' + args)
        this.movieId = args.movieId;
        this.loadMovies(this.movieId, 1);
    }

    async loadMovies(movieId, page) {
        let data;
        if (movieId) {
            console.log('MovieList', 'Loading recs with ' + movieId);
            data = await getRecommendations(movieId, page);
        } else {
            console.log('MovieList', 'Loading movies ');
            data = await getMovies(page);
        }
        if (this.nextPage < data.total_pages) {
            this.nextPage = data.page + 1;
        }
        this.totalPages = data.total_pages;

        console.log('MovieList. movieIds ' + this.movieIds.length)
        let movies = data.results.map(aMovie => {
            this.movieIds.push(aMovie.id);
            return {
                type: Movie,
                movie: aMovie,
                isRec: this.isRec,
            }
        })

        let tempChildren = this.tag('Movies').children;
        this.tag('Movies').patch({
            children: tempChildren.concat(movies)
        })
    }

    clear() {
        this.hOffset = 500;
        if (this.isRec) {
            this.hOffset = 100;
        }
        this.nextPage = 0;
        this.totalPages = 0;
        this.index = 0;
        this.movieIds = [];

        this.tag('Movies').patch({
            children: []
        })
    }

    _init() {
        console.log('MovieList _init. isRec? ' + this.isRec);
        this.clear();
        if (!this.isRec) {
            console.log('IsRec? ' + this.isRec);
            this.loadMovies(this.movieId, 1);
        }
    }

    _handleRight() {
        this.loadMovies(this.movieId, this.nextPage);
        this.tag('Movies').patch({
            smooth: {
                x: this.tag('Movies').x - this.hOffset
            }
        })
        let maxIdx = this.tag('Movies').children.length - 1;
        if (this.index < maxIdx) {
            this.index++;
        }
    }

    _handleLeft() {
        if (this.tag('Movies').x < 0) {
            this.tag('Movies').patch({
                smooth: {
                    x: this.tag('Movies').x + this.hOffset
                }
            })
        }
        if (this.index > 0) {
            this.index--;
        }
    }

    _handleEnter() {
        Router.navigate('movie/' + this.movieIds[this.index]);
    }

    getActiveItem() {
        return this.tag('Movies').children[this.index];
    }

    _getFocused() {
        return this.getActiveItem();
    }
}