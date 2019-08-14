import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'src/app/models/image.model';
import { Album } from 'src/app/models/album.model';
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

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef,
    // private topbarService: TopbarService
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

  ngOnDestroy() {
    this._alive = false;
    this.albumService.currentAlbum = null;
  }
}
