import { Lightning } from "@lightningjs/sdk";
import { Boot } from "../pages/Boot";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { MovieDetails } from "../pages/MovieDetails";

export default {
    // Inside this array we define each route
    routes: [
        {
            path: '$', // This is a special path for the boot page.
            component: Boot
        },
        {
            path: '*', // For any other page
            component: NotFound
        },
        {
            path: 'home',
            component: Home,
            widgets: ['MovieList']
        },
        {
            path: 'movie/:movieId',
            component: MovieDetails,
            name: 'movie',
        }
    ]
}