import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/utils/animations';
import { Utils } from 'src/app/utils/utils';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  images: Image[];
  searchValue: string;

  constructor(
    private api: Api,
    private utils: Utils,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
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

    // this.images = null;

    this.api.get('search/' + value).then((response: any) => {
      this.images = response.results;
      console.log(response.results);
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.utils.clearSearchInput();
  }
}
