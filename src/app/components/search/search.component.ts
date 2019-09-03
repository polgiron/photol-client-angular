import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/utils/animations';
import { Image } from 'src/app/models/image.model';
import { SearchService } from 'src/app/services/search.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  images: Image[];
  displayImages: Image[];
  searchValue: string;
  tags: Tag[] = [];

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
    this.tags = [];
    this.images = await this.searchService.search(value);
    this.displayImages = this.images;

    this.images.map(image => {
      this.tags = this.tags.concat(image.tags);
    });

    this.tags = this.removeDuplicates(this.tags);
    // console.log(this.tags);

    this.ref.markForCheck();
  }

  removeDuplicates(array: any) {
    return array.reduce((acc, current) => {
      const x = acc.find(item => item._id === current._id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }

  updateFilters(tags: Tag[]) {
    // console.log(tags);

    this.displayImages = this.images.filter(image => {
      let condition: boolean = false;
      tags.map(selectedTag => {
        condition = condition || image.tags.some(tag => tag._id == selectedTag._id);
      });
      return condition;
    });

    if (!tags.length) {
      this.displayImages = this.images;
    }

    this.ref.markForCheck();
  }

  ngOnDestroy() {
    this.searchService.setSearchValue('');
  }
}
