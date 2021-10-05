import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy
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
export class SearchInputComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: ElementRef
  alive: boolean = true
  searchValue: string = ''
  timeout: number

  constructor(
    private router: Router,
    private searchService: SearchService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchService
      .searchValueChannel()
      .pipe(takeWhile(() => this.alive))
      .subscribe((value: string) => {
        this.searchValue = value
        this.ref.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this.alive = false
  }

  onKeyUp(): void {
    clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
      this.performSearch()
    }, 500)
  }

  performSearch(): void {
    this.router.navigate(['/', 'search'], {
      queryParams: {
        value: this.searchValue
      }
    })
  }

  clear(): void {
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
