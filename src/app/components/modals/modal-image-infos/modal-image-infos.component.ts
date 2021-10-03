import { Component, OnInit } from '@angular/core'
import { ModalOptions } from 'ngx-bootstrap/modal'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image.service'
import { ModalService } from 'src/app/services/modal.service'

@Component({
  selector: 'app-modal-image-infos',
  templateUrl: './modal-image-infos.component.html',
  styleUrls: ['./modal-image-infos.component.scss']
})
export class ModalImageInfosComponent implements OnInit {
  image: Image = this.options.initialState['image']

  constructor(
    private options: ModalOptions,
    private imageService: ImageService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  update(): void {
    this.imageService.update(this.image._id, this.image)
  }

  close(): void {
    this.modalService.close(this)
  }
}
