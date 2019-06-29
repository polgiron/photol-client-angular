import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-darkroom-settings',
  templateUrl: './darkroom-settings.component.html',
  styleUrls: ['./darkroom-settings.component.scss']
})
export class DarkroomSettingsComponent implements OnInit {
  @Input() time: number;
  @Input() contrast: number;
  @Input() aperture: number;

  constructor() { }

  ngOnInit() {
  }
}
