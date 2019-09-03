import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class Utils {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

  serialize(obj: any) {
    let str = '';
    for (let key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
  }

  removeFromArray(array: any, element: any) {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
