import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumThumbComponent implements OnInit {
  @Input() album;

  constructor() { }

  ngOnInit() {
  }
}
