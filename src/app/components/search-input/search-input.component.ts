import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit {
  private _alive: boolean = true;
  searchValue: string = '';
  timeout: any;

  constructor(
    private router: Router,
    private utils: Utils,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.utils.clearSearchChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe(() => {
        this.searchValue = '';
        this.ref.markForCheck();
      });
  }

  onKeyUp() {
    clearTimeout(this.timeout);
    // if (this.searchValue != '') {
      this.timeout = setTimeout(() => {
        this.performSearch();
      }, 500);
    // } else {
    //   this.search.emit(null);
    // }
  }

  performSearch() {
    // console.log(this.searchValue.replace(' ', '+'));

    this.router.navigate(['/', 'search'], {
      queryParams: {
        value: this.searchValue
      }
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
