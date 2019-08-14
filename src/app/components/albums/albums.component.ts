import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { fadeAnimation } from 'src/app/utils/animations';
import { Utils } from 'src/app/utils/utils';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalCreateAlbumComponent } from '../modals/modal-create-album/modal-create-album.component';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';
// import { TopbarService } from 'src/app/services/topbar.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  albums: Album[];
  editMode: boolean = false;

  constructor(
    private api: Api,
    private datePipe: DatePipe,
    private utils: Utils,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef,
    private modalService: ModalService,
    private settingsService: SettingsService,
    // private topbarService: TopbarService
  ) { }

  ngOnInit() {
    // this.topbarService.updatePageTitle('Albums');
    this.getAlbums();

    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.editMode = settings.editMode;
        this.ref.markForCheck();
      });
  }

  async getAlbums() {
    // this.albums = await this.api.get('albums');
    this.albums = await this.albumService.getAll();
    console.log('get albums', this.albums);
    this.ref.markForCheck();
    // this.albums.forEach((album: Album) => {
      // album.year = this.datePipe.transform(album.primary_photo_extras.datetaken, 'y');
    // });
    // this.utils.hideSplashscreen();
  }

  onDeleteAlbum(albumId: number) {
    this.albums = this.albums.filter(image => image._id != albumId);
    this.ref.markForCheck();
  }

  onClickAddAlbum() {
    this.modalService.open(ModalCreateAlbumComponent, 'big');
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
