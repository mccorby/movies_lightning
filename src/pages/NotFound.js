import { Lightning, Router } from "@lightningjs/sdk";

export class NotFound extends Lightning.Component {

    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff42f5d4
            },
            Text: {
                w: 960,
                h: 540,
                text:  {
                    text: '404: Page not found'
                }
            }
        }
    }

    _handleBack() {
        Router.navigate('home')
    }
}