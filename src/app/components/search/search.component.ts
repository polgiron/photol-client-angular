import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/utils/animations';
import { Image } from 'src/app/models/image.model';
import { SearchService } from 'src/app/services/search.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private searchService: SearchService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const value = params['value'];
      if (value) {
        if (this.searchValue != value) {
          this.searchValue = value;
          this.search(value);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  async search(value: string) {
    this.images = await this.searchService.search(value);
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    this.searchService.setSearchValue('');
  }
}
