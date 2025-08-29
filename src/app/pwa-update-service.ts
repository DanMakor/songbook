    import { ApplicationRef, inject, Injectable } from '@angular/core';
    import { SwUpdate } from '@angular/service-worker';
    import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { concat, interval, Observable } from 'rxjs';
import { exhaustMap, filter, first, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdateDialog } from './update-dialog/update-dialog';

@Injectable({
  providedIn: 'root'
})
export class PwaUpdateService {
  private dialog = inject(Dialog);
  private appRef = inject(ApplicationRef);

  constructor(private swUpdate: SwUpdate) { }

  private appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true));
  private checkForUpdates$ = concat(this.appIsStable$, interval(30)).pipe(
    exhaustMap(() => this.swUpdate.checkForUpdate()),
    tap(() => console.log('Checked for updates')),
  );

  public init() {
    this.checkForUpdates$.pipe(takeUntilDestroyed()).subscribe();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
          filter(event => event.type === 'VERSION_READY'),
          exhaustMap(() => {
              const dialogRef = this.dialog.open(UpdateDialog, {
                minWidth: '300px',
                maxWidth: '90vw'
              });

              return dialogRef.closed as Observable<boolean>;
          }),
          tap(confirmed => confirmed && window.location.reload()),
          takeUntilDestroyed()
      ).subscribe();
  }
}
}