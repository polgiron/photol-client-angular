import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class Utils {
  _clearSearch: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  clearSearchChannel(): Observable<boolean> {
    return this._clearSearch.asObservable();
  }

  getPhotoUrl(farm: number, server: number, id: number, secret: number, size?: string) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
  }

  clearSearchInput() {
    this._clearSearch.next(true);
  }

  clearOpenQuery() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        open: null
      },
      queryParamsHandling: 'merge'
    });
  }

  hideSplashscreen() {
    console.log('hide splashscreen');
    const splashscreen: any = document.querySelector('#splashscreen');
    if (splashscreen && !splashscreen.classList.contains('is-hidden')) {
      splashscreen.classList.add('is-hidden');
      setTimeout(() => {
        splashscreen.remove();
      }, 600);
    }
  }
}
