import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SongService } from '../song-service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-song-list',
  imports: [FaIconComponent, RouterLink, NgClass],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css'
})
export class SongList {
  public input = viewChild<ElementRef>('input');

  public filter = new FormControl();

  public songService = inject(SongService)

  public ngOnInit() {
    const filter = this.songService.getFilter();
    if (filter) {
      this.input()!.nativeElement!.value = this.songService.getFilter();
    }
  }
}
