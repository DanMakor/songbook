import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SongService } from '../song-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-song-details',
  imports: [FaIconComponent, RouterLink, NgClass],
  templateUrl: './song-details.html',
  styleUrl: './song-details.css'
})
export class SongDetails {
  private route = inject(ActivatedRoute);
  private songService = inject(SongService);
  public songNumber = this.route.snapshot.paramMap.get('number');

  public song = this.songService.get(this.songNumber!);
}
