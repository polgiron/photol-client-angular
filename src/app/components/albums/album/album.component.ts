import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'src/app/models/image.model';
import { Album } from 'src/app/models/album.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings.model';
// import { TopbarService } from 'src/app/services/topbar.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  album: Album;
  cover: Image;
  settings: Settings;
  currentEditTextValue: string;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef,
    // private topbarService: TopbarService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const albumId = params['albumId'];

      if (albumId) {
        this.getAlbum(albumId);

        this.albumService.updateCoverChannel()
          .pipe(takeWhile(() => this._alive))
          .subscribe((image: Image) => {
            this.cover = image;
            this.ref.markForCheck();
          });

        this.settingsService.settingsChannel()
          .pipe(takeWhile(() => this._alive))
          .subscribe((settings: Settings) => {
            this.settings = settings;
            this.ref.markForCheck();
          });
      }
    });
  }

  async getAlbum(albumId: number) {
    // console.log('Get album');

    this.album = await this.albumService.getAlbum(albumId);
    // console.log(this.album);

    // this.topbarService.updatePageTitle(this.album.title);

    this.albumService.currentAlbum = this.album;

    if (this.album.cover) {
      this.cover = this.album.cover;
    }

    this.ref.markForCheck();
  }

  onTextFocus(event: any) {
    // console.log(event.target.textContent);
    this.currentEditTextValue = event.target.textContent;
  }

  onTextBlur(key: string, event: any) {
    // console.log(event.target.textContent);

    const params = {};
    params[key] = event.target.textContent;

    if (event.target.textContent != '') {
      this.albumService.update(this.album._id, params);
    } else {
      event.target.textContent = this.currentEditTextValue;
    }
  }

  onNumberKeyPress(event: any) {
    if (!isFinite(event.key)) event.preventDefault();
  }

  ngOnDestroy() {
    this._alive = false;
    this.albumService.currentAlbum = null;
  }
}
