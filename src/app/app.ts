import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { PwaUpdateService } from './pwa-update-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private updateService = inject(PwaUpdateService);

  constructor(library: FaIconLibrary) {
    // Add icons to the library
    library.addIcons(faSearch, faChevronRight, faArrowLeft); 
  }

  public ngOnInit() {
    this.updateService.init();
  }

  protected readonly title = signal('songbook');
}
