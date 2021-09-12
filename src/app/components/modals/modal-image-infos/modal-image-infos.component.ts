import { Component, OnInit } from '@angular/core'
import { ModalOptions } from 'ngx-bootstrap/modal'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-modal-image-infos',
  templateUrl: './modal-image-infos.component.html',
  styleUrls: ['./modal-image-infos.component.scss']
})
export class ModalImageInfosComponent implements OnInit {
  image: Image

  constructor(
    private options: ModalOptions,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    if (this.options.initialState) {
      this.image = this.options.initialState['image']
    }
  }

  update(): void {
    this.imageService.update(this.image._id, {
      darkroomSettings: this.image.darkroomSettings
    })
  }
}
