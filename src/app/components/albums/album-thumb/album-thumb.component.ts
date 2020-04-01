import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';
import { takeWhile } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings.model';
import { fadeAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AlbumThumbComponent implements OnInit, OnDestroy {
  @Input() album: Album;
  private _alive: boolean = true;
  editMode: boolean = false;
  isInViewport: boolean = false;

  constructor(
    private albumService: AlbumService,
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.editMode = settings.editMode;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }

  delete(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.albumService.delete(this.album._id);
  }

  async onDeferLoad() {
    this.isInViewport = true;
    this.ref.markForCheck();
  }
}
