import { Lightning } from "@lightningjs/sdk";
import { Router } from "@lightningjs/sdk";

export class Boot extends Lightning.Component {

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000
            },
            Title: {
                mount: 0.5,
                x: 960,
                y: 450,
                text: {
                    text: 'Welcome to the Movie DB!',
                    fontSize: 64,
                }
            },
            Text: {
                mount: 0.5,
                x: 960,
                y: 1000,
                text: {
                    text: '[ Continue if you dare ]',
                }
            }
        }
    }

    _handleEnter() {
        Router.navigate('home')
    }
}