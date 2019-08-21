import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';
import { Api } from './api.service';

@Injectable()
export class SettingsService {
  private _settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    editMode: true,
    displayTags: true
  });

  constructor(
    private api: Api
  ) { }

  public settingsChannel(): Observable<Settings> {
    return this._settings.asObservable();
  }

  async init() {
    const settings: any = await this.api.get('settings');
    // console.log('settings');
    // console.log(settings.settings);
    this._settings.next(settings.settings);
  }

  get settings() {
    return { ... this._settings.value };
  }

  updateSettings(key: string, value: any) {
    const settings = this._settings.value;
    settings[key] = value;
    this._settings.next(settings);
    this.api.post('settings', { data: settings });
  }
}
