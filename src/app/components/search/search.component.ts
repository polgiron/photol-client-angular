import { Component, OnInit } from '@angular/core';
import { BaseApi } from 'src/app/services/base-api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/utils/animations';
import { AlbumService } from 'src/app/services/album.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeAnimation]
})
export class SearchComponent implements OnInit {
  photos: any;
  searchValue: string;

  constructor(
    private api: BaseApi,
    private utils: Utils,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const value = params['value'];
      if (value) {
        if (this.searchValue != value) {
          this.searchValue = value;
          this.performSearch(value);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  performSearch(value: string) {
    console.log('Search: ' + value);

    this.photos = null;
    this.albumService.setAlbumTitle('Search: ' + value);

    this.api.get('search/' + value).then((searchResults: any) => {
      console.log(searchResults);
      // console.log(searchResults.photo);
      // this.search.emit(searchResults.photo);
      this.photos = searchResults.photo;
    });
  }

  ngOnDestroy() {
    this.albumService.setAlbumTitle('');
    this.utils.clearSearchInput();
  }
}
