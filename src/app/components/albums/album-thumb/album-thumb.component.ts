import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-album-thumb',
  templateUrl: './album-thumb.component.html',
  styleUrls: ['./album-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumThumbComponent implements OnInit {
  @Output() onDeleteAlbum: EventEmitter<number> = new EventEmitter();
  @Input() album: Album;
  // editMode: boolean = false;
  editMode: boolean = true;

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit() {
  }

  delete(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.albumService.delete(this.album._id).then((response: any) => {
      // this.ref.markForCheck();
      this.onDeleteAlbum.emit(this.album._id);
    });
  }
}
