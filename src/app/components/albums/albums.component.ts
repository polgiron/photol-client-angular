import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { fadeAnimation } from 'src/app/utils/animations';
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
    private datePipe: DatePipe,
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
    this.albums = this.albums.reverse();
    // console.log('get albums', this.albums);
    this.ref.markForCheck();
    // this.albums.forEach((album: Album) => {
      // album.year = this.datePipe.transform(album.primary_photo_extras.datetaken, 'y');
    // });
    // this.utils.hideSplashscreen();
  }

  onDeleteAlbum(albumId: string) {
    this.albums = this.albums.filter(image => image._id != albumId);
    this.ref.markForCheck();
  }

  onClickAddAlbum() {
    this.modalService.open(ModalCreateAlbumComponent, 'big');
  }

  trackByFunction(index, item) {
    if (!item) {
      return null;
    }
    return item._id;
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
