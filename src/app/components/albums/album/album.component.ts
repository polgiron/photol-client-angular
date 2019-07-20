import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  cover: any;
  coverSrc: string;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const albumId = params['albumId'];
      console.log(albumId);
      if (albumId) {
        this.getAlbum(albumId);
      }
    });
  }

  async getAlbum(albumId: number) {
    console.log('Get album');
    this.album = await this.albumService.getAlbum(albumId);
    console.log(this.album);
    this.ref.markForCheck();
    // this.extendAlbum();
  }

  extendAlbum() {
    // this.cover = this.album.photo.find(album => album.isprimary == true);
    // if (this.cover) {
      // this.coverSrc = this.photoService.getBigThumbnail(this.cover.farm, this.cover.server, this.cover.id, this.cover.secret);
      // console.log(this.cover);
    // }
    // this.albumService.setAlbumTitle(this.album.title);
  }

  ngOnDestroy() {
    // this.albumService.setAlbumTitle('');
  }
}
