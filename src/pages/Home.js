import { Lightning, Router } from "@lightningjs/sdk";
import { MovieList } from "../components/MovieList";

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
                type: MovieList,
                isRec: false,
            }
        }
    }

    _getFocused() {
        return this.tag('Movies');
    }
}