import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss']
})
export class AlbumThumbComponent implements OnInit {
  @Input() album;

  constructor() { }

  ngOnInit() {
  }
}
