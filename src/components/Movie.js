import { Lightning } from "@lightningjs/sdk";

export class Movie extends Lightning.Component {

    static _template() {
        return {
            rect: true,
            color: 0xff000000,
            alpha: 0.5,
            flex: {
                direction: 'column',
                padding: 20,
            },
            Image: {
                flexItem: {
                    mountX: 0.5,
                }
            },
            Title: {
                flexItem: {
                    mountX: 0.5,
                }
            },
        }
    }

    _init() {
        this.tag('Image').patch({
            src: 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path
        })
        this.tag('Title').patch({
            text: {
                text: this.movie.title
            }
        })
    }

    _focus() {
        console.log('Movie focus');
        this.patch({
            alpha: 1.0,
        })
    }

    _unfocus() {
        console.log('Movie unfocus');
        this.patch({
            alpha: 0.5,
        })
    }
}