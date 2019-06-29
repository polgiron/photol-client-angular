import { Component, OnInit } from '@angular/core';
import { BaseApi } from 'src/app/services/base-api.service';
import { DatePipe } from '@angular/common';
import { fadeAnimation } from 'src/app/utils/animations';
import { Utils } from 'src/app/utils/utils';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [fadeAnimation]
})
export class AlbumsComponent implements OnInit {
  albums: any;

  constructor(
    private api: BaseApi,
    private datePipe: DatePipe,
    private utils: Utils,
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  async getAlbums() {
    this.albums = JSON.parse(this.cache.get('albums'));
    // console.log(this.albums);

    if (!this.albums) {
      this.albums = await this.api.get('albums');
      this.albums.forEach(album => {
        album.year = this.datePipe.transform(album.primary_photo_extras.datetaken, 'y');
      });
      this.cache.set('albums', JSON.stringify(this.albums));
      this.utils.hideSplashscreen();
    } else {
      this.utils.hideSplashscreen();
    }
  }
}
