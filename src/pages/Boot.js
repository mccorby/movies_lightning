import { Lightning } from "@lightningjs/sdk";
import { Router } from "@lightningjs/sdk";
import { getPopular } from "../lib/API";

export class Boot extends Lightning.Component {

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000
            },
            Image: {
                mount: 0.5,
                x: 960,
                y: 450,
            }
        }
    }

    async _init() {
        let data = await getPopular();
        console.log('Boot ' + Object.keys(data.results));
        var item = data.results[Math.floor(Math.random() * data.results.length)];

        this.tag('Image').patch({
            src: 'https://image.tmdb.org/t/p/w342' + item.poster_path,
        })
        this.tag('Image').animation({
                duration: 15,
                repeat: -1,
                actions: [
                    {
                        t: '',
                        p: 'rotation',
                        v: p => Math.sqrt(p)
                    },
                ],
            })
            .start()
    }

    _handleEnter() {
        Router.navigate('home')
    }
}