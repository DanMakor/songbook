import { computed, Injectable, signal } from '@angular/core';
import { songsWithLineOne } from './songs/songs';
import { FuseResult, RangeTuple } from "fuse.js";
import { SongWithLineOne, SongWithLineOneAndNumberHighlights } from "./song";
import Fuse from 'fuse.js';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private fuse = new Fuse(songsWithLineOne, {
    includeMatches: true,
    threshold: 0.3,
    keys: ['title', 'number', 'lineOne'],
  })

  private filter = signal('');

  public filteredSongs = computed(() => {
    const filter = this.filter();
    const songs = filter ? 
      this.highlight(this.fuse.search(this.filter())):
      songsWithLineOne;

    return songs as SongWithLineOneAndNumberHighlights[];
  });

  private highlight = (fuseSearchResult: FuseResult<SongWithLineOne>[]): SongWithLineOneAndNumberHighlights[] => {
    const generateHighlightedText = (inputText: string, regions: readonly RangeTuple[] = []) => {
      let content = '';
      let nextUnhighlightedRegionStartingIndex = 0;

      regions.forEach(region => {
        const lastRegionNextIndex = region[1] + 1;

        content += [
          inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
          `<span class="bg-emerald-300">`,
          inputText.substring(region[0], lastRegionNextIndex),
          '</span>',
        ].join('');

        nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
      });

      content += inputText.substring(nextUnhighlightedRegionStartingIndex);

      return content;
    };

    return fuseSearchResult
      .filter(({ matches }) => matches && matches.length)
      .map(({ item, matches }) => {
        const highlightedItem = { 
          ...item,
      };

        matches!.forEach((match) => {
          const key = match.key  === 'number' ? 
          'numberHighlighted' : 
          match.key;
    
          highlightedItem[key! as keyof Omit<SongWithLineOne, 'verses'>] = generateHighlightedText(match.value!, match.indices)
        });

        return highlightedItem;
      });
  };

  public setFilter(filter: string) {
    this.filter.set(filter);
  }

  public getFilter() {
    return this.filter();
  }

  public get(songNumber: string) {
    return songsWithLineOne.find(song => song.number === songNumber);
  }
}
