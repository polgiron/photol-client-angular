import { Injectable } from '@angular/core'
import { BehaviorSubject, fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Injectable()
export class ResponsiveService {
  breakpoints = {
    // small: 767
    small: 885
  }
  isScreenSmall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isScreenSmall
  )
  lastIsSmallScreen: boolean = this.isScreenSmall

  constructor() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.isScreenSmall !== this.lastIsSmallScreen) {
          this.lastIsSmallScreen = this.isScreenSmall
          this.isScreenSmall$.next(this.isScreenSmall)
        }
      })
  }

  get isScreenSmall(): boolean {
    return window.innerWidth <= this.breakpoints.small
  }
}
