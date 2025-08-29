import { Routes } from '@angular/router';
import { SongDetails } from './song-details/song-details';
import { SongList } from './song-list/song-list';

export const routes: Routes = [
    {
        component: SongList,
        path: 'songs'
    },
    {
        component: SongDetails,
        path: 'songs/:number',
    }
];
