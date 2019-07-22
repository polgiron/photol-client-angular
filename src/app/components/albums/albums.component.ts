import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { fadeAnimation } from 'src/app/utils/animations';
import { Utils } from 'src/app/utils/utils';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  albums: any;

  constructor(
    private api: Api,
    private datePipe: DatePipe,
    private utils: Utils,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAlbums();
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
}
