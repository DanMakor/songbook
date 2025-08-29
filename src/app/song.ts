export interface Song {
    title: string;
    number: string;
    verses: string[][];
}

export interface SongWithLineOne extends Song {
    lineOne: string;
}

export interface SongWithLineOneAndNumberHighlights extends SongWithLineOne {
    numberHighlighted?: string;
}