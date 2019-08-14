import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable()
export class SettingsService {
  private _settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    editMode: true
  });

  constructor() { }

  public settingsChannel(): Observable<Settings> {
    return this._settings.asObservable();
  }

  get settings() {
    return { ... this._settings.value };
  }

  updateSettings(key: string, value: any) {
    const settings = this._settings.value;
    settings[key] = value;
    this._settings.next(settings);
  }
}
