import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-pick-album',
  templateUrl: './modal-pick-album.component.html',
  styleUrls: ['./modal-pick-album.component.scss']
})
export class ModalPickAlbumComponent implements OnInit {
  title: string;
  rollId: number;

  constructor(
    private albumService: AlbumService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onCreateAlbum() {
    const params = {
      title: this.title,
      rollId: this.rollId
    };

    this.albumService.createAlbum(params).then(() => {
      this.modalService.close(this);
    });
  }
}
