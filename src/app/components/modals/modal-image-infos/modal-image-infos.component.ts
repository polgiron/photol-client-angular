import { Component, OnInit } from '@angular/core';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-modal-image-infos',
  templateUrl: './modal-image-infos.component.html',
  styleUrls: ['./modal-image-infos.component.scss']
})
export class ModalImageInfosComponent implements OnInit {
  image: Image;

  constructor(
    private options: ModalOptions
  ) { }

  ngOnInit(): void {
    if (this.options.initialState) {
      this.image = this.options.initialState['image'];
      this.image.darkroomSettings = {
        duration: 12.8,
        contrast: 3.5,
        aperture: 4
      }
    }
  }
}
