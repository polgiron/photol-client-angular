import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fadeOutAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [fadeOutAnimation]
})
export class ImageComponent implements OnInit {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @Input() width: number;
  @Input() height: number;
  @Input() cover: boolean = false;
  @Input() displayLoader: boolean = false;
  @Input() set src(value: string) {
    this.isLoaded = false;
    this._src = value;
    this.setPadding();
  };

  private _src: string;
  isLoaded: boolean = false;
  isInViewport: boolean = false;

  get src() {
    return this._src;
  }

  constructor() { }

  ngOnInit() {

  }

  setPadding() {
    let ratio = this.height / this.width * 100;

    if (this.cover) {
      ratio = 36;
    }

    this.wrapper.nativeElement.style.paddingBottom = ratio + '%';
  }

  onLoad() {
    this.isLoaded = true;
  }

  onDeferLoad() {
    console.log('IMAGE IN VIEWPORT');
    this.isInViewport = true;
  }
}
