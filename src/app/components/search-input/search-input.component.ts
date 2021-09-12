import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { Router } from '@angular/router'
import { takeWhile } from 'rxjs/operators'
import { SearchService } from 'src/app/services/search.service'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit {
  private _alive: boolean = true
  searchValue: string = ''
  timeout: any

  constructor(
    private router: Router,
    private searchService: SearchService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchService
      .searchValueChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((value: string) => {
        this.searchValue = value
        this.ref.markForCheck()
      })
  }

  onKeyUp() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.performSearch()
    }, 500)
  }

  performSearch() {
    this.router.navigate(['/', 'search'], {
      queryParams: {
        value: this.searchValue
      }
    })
  }

  ngOnDestroy() {
    this._alive = false
  }
}
