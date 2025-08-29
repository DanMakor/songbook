    import { inject, Injectable } from '@angular/core';
    import { SwUpdate } from '@angular/service-worker';
    import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { interval, Observable } from 'rxjs';
import { exhaustMap, filter, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdateDialog } from './update-dialog/update-dialog';

    @Injectable({
      providedIn: 'root'
    })
    export class PwaUpdateService {
      private dialog = inject(Dialog);

      constructor(private swUpdate: SwUpdate) {
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

      private checkForUpdates$ = interval(600000).pipe(
        exhaustMap(() => this.swUpdate.checkForUpdate()),
        tap(() => console.log('Checked for updates')),
      );
    }