import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Injectable()
export class Utils {
  constructor(private router: Router, private route: ActivatedRoute) {}

  clearOpenQuery(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        open: null
      },
      queryParamsHandling: 'merge'
    })
  }

  serialize(obj: any): string {
    let str = ''
    for (let key in obj) {
      if (str != '') {
        str += '&'
      }
      str += key + '=' + encodeURIComponent(obj[key])
    }
    return str
  }

  removeFromArray(array: any, element: any): any[] {
    const index = array.indexOf(element)
    if (index > -1) {
      array.splice(index, 1)
    }
    return array
  }

  removeDuplicates(array: any): any[] {
    return array.reduce((acc, current) => {
      const x = acc.find((item) => item._id === current._id)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
  }
}
