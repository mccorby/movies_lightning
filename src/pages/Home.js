import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { Movie } from "../components/Movie";
import { getConfiguration, getMovies } from "../lib/API";

export class Home extends Lightning.Component {

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000,
            },
            Movies: {
                flex: {
                    direction: 'row',
                    padding: 20,
                }
            }
        }
    }

    async loadMovies(page) {
        console.log('Loading data')
        let data = await getMovies(page);
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

        let tempChildren = this.tag('Movies').children;
        this.tag('Movies').patch({
            children: tempChildren.concat(movies)
        })

    }

    _init() {
        this.hOffset = 500;
        this.nextPage = 0;
        this.totalPages = 0;
        this.index = 0;
        this.movieIds = [];
        this.loadMovies(1);
    }

    _handleRight() {
        this.loadMovies(this.nextPage);
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
        console.log(this.index)
        return this.tag('Movies').children[this.index];
    }

    _getFocused() {
        console.log('Active index ' + this.index);
        let item = this.getActiveItem();
    }
}