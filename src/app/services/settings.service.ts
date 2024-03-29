import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { Settings } from '../models/settings.model'
import { Api } from './api.service'

@Injectable()
export class SettingsService {
  document: string = 'settings/'
  private _settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    editMode: false,
    lightTheme: false
  })

  constructor(private api: Api) {}

  public settingsChannel(): Observable<Settings> {
    return this._settings.asObservable()
  }

  get settings() {
    return { ...this._settings.value }
  }

  async init() {
    const settings: Settings = await this.api.get(this.document)
    this._settings.next(settings)
  }

  updateSettings(settings: Settings) {
    this._settings.next(settings)
    this.api.put(this.document, settings)
  }
}
