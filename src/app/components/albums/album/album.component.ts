import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseApi } from 'src/app/services/base-api.service';
import { AlbumService } from 'src/app/services/album.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { PhotoService } from 'src/app/services/photo.service';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  animations: [fadeAnimation]
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  cover: any;
  coverSrc: string;

  constructor(
    private route: ActivatedRoute,
    private api: BaseApi,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const albumId = params['albumId'];
      if (albumId) {
        this.getAlbum(albumId);
      }
    });
  }

  async getAlbum(albumId: number) {
    this.album = JSON.parse(this.cache.get('album_' + albumId));
    // console.log(this.album);

    if (!this.album) {
      this.album = await this.api.get('album/' + albumId);
      this.extendAlbum();
      this.cache.set('album_' + albumId, JSON.stringify(this.album));
    } else {
      this.extendAlbum();
    }
  }

  extendAlbum() {
    this.cover = this.album.photo.find(album => album.isprimary == true);
    if (this.cover) {
      this.coverSrc = this.photoService.getBigThumbnail(this.cover.farm, this.cover.server, this.cover.id, this.cover.secret);
      // console.log(this.cover);
    }
    this.albumService.setAlbumTitle(this.album.title);
  }

  ngOnDestroy() {
    this.albumService.setAlbumTitle('');
  }
}
