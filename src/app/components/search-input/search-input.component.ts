import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
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
  @ViewChild('input') input: ElementRef
  searchValue: string = ''
  timeout: number

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

  ngOnDestroy() {
    this._alive = false
  }

  onKeyUp() {
    clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
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

  clear() {
    this.searchValue = ''
    // this.router.navigate(['/', 'search'], {
    //   queryParams: {
    //     value: ''
    //   }
    // })
    this.input.nativeElement.focus()
    this.ref.markForCheck()
  }
}
