import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
// import { ActivatedRoute, Params, Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  @Input() set tags (value: Tag[]) {
    this._tags = value;
    this.selectedTags = [];
  };
  @Output() updateFilters: EventEmitter<number[]> = new EventEmitter();
  private _tags: Tag[];
  selectedTags: number[];

  get tags() {
    return this._tags;
  }

  constructor(
    // private ref: ChangeDetectorRef
    // private route: ActivatedRoute,
    // private router: Router,
    private utils: Utils
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe((params: Params) => {
    //   const value = params['filters'];
    //   console.log('params filters');
    //   console.log(value);
    // });
  }

  onClickFilter(tag: Tag) {
    if (!tag.active) {
      tag.active = true;
      this.selectedTags.push(tag._id);
    } else {
      tag.active = false;
      this.selectedTags = this.utils.removeFromArray(this.selectedTags, tag._id);
    }

    this.updateFilters.emit(this.selectedTags);

    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: {
    //     filters: this.selectedTags.join(' ')
    //   },
    //   queryParamsHandling: 'merge', // preserve the existing query params in the route
    //   // skipLocationChange: true // do not trigger navigation
    // });
  }
}
