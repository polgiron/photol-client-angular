import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class ThemeService {
  private _isLightMode: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor() {}

  public isLightModeChannel(): Observable<boolean> {
    return this._isLightMode.asObservable()
  }

  get isLightMode(): boolean {
    return this._isLightMode.value
  }

  setLightMode(lightMode: boolean = true): void {
    if (lightMode) {
      document.body.setAttribute('data-theme', 'light')
      localStorage.setItem('lightmode', 'true')
    } else {
      document.body.removeAttribute('data-theme')
      localStorage.setItem('lightmode', 'false')
    }
    this._isLightMode.next(lightMode)
  }

  initLightMode(): void {
    if (localStorage.getItem('lightmode') === 'true') {
      this.setLightMode(true)
    } else {
      this.setLightMode(false)
    }
  }
}
