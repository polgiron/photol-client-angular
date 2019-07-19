import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { fadeAnimation, fadeInAnimation } from 'src/app/utils/animations';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';
// import { Utils } from 'src/app/utils/utils';
// import Pica from 'pica';
import Macy from 'Macy';

@Component({
  selector: 'app-modal-create-album',
  templateUrl: './modal-create-album.component.html',
  styleUrls: ['./modal-create-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, fadeInAnimation]
})
export class ModalCreateAlbumComponent implements OnInit {
  images = [];
  loading: boolean = false;
  title: string;
  rollId: number;
  index: number = 0;
  macyInstance: any;

  constructor(
    private ref: ChangeDetectorRef,
    private uploadService: UploadService,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    // this.initMacy();
  }

  // ngAfterViewInit() {
  //   this.macyInstance.recalculate(true);
  //   // if (!this.macyInstance) {
  //     // this.initMacy();
  //   // } else {
  //     // this.macyInstance.recalculate(true);
  //   // }
  //   this.ref.markForCheck();
  // }

  initMacy() {
    this.macyInstance = Macy({
      container: '#preview-list',
      columns: 3,
      trueOrder: true,
      margin: 16
      // breakAt: {
      //   992: {
      //     margin: 16,
      //     columns: 2
      //   },
      //   767: {
      //     margin: 16,
      //     columns: 1
      //   }
      // }
    });
  }

  onUpload(files: File[]) {
    this.extendPhotos(files);
  }

  extendPhotos(files: File[]) {
    // console.log(files);
    // this.loading = true;

    files.forEach((file: File) => {
      this.generatePreviewThumbnail(file);

      // if (typeof Worker !== 'undefined') {
      //   // Create a new
      //   const worker = new Worker('./modal-create-album.worker', { type: 'module' });
      //   worker.onmessage = ({ data }) => {
      //     console.log('worker done');
      //     // this.generatePreviewThumbnail(file, data);
      //     // this.index += 1;

      //     // this.images.push({
      //     //   id: this.index,
      //     //   file: file,
      //     //   src: data
      //     //   // src: dataUrl
      //     // });

      //     // this.ref.markForCheck();
      //   };
      //   worker.postMessage(file);
      // } else {
      //   // Web Workers are not supported in this environment.
      //   // You should add a fallback so that your program still executes correctly.
      // }
    });
  }

  generatePreviewThumbnail(file: File) {
    const imgURL = window.URL.createObjectURL(file);
    const image = new Image();

    // have added some debugging code that would be useful to know if
    // this does not solve the problem. Uncomment it and use it to see where
    // the big delay is.
    image.onload = () => {
      var canvas, ctx, dataSrc, delay; // hosit vars just for readability as the following functions will close over them
      // Just for the uninitiated in closure.
      // var now, CPUProfile = [];  // debug code
      delay = 10; // 0 could work just as well and save you 20-30ms

      const revokeObject = () => {
        // as an event.
        // now = performance.now(); // debug code
        URL.revokeObjectURL(imgURL);
        //CPUProfile.push(performance.now()-now); // debug code
        // setTimeout( function () { CPUProfile.forEach ( time => console.log(time)), 0);

        if (!this.macyInstance) {
          this.initMacy();
        } else {
          this.macyInstance.recalculate(true);
        }
      }

      const decodeImage = () => {
        // now = performance.now(); // debug code
        // $('#img').attr('src', dataSrc);

        // Add id for the ng for tracking
        this.index += 1;
        this.images.push({
          id: this.index,
          file: file,
          src: dataSrc
        });

        // this.initMacy();

        this.ref.markForCheck();

        setTimeout(revokeObject, delay); // gives the UI a second chance to get something done.
        //CPUProfile.push(performance.now()-now); // debug code
      }

      const encodeImage = () => {
        // now = performance.now(); // debug code
        dataSrc = canvas.toDataURL('image/jpeg', 0.5);
        setTimeout(decodeImage, delay); // gives the UI a second chance to get something done.
        //CPUProfile.push(performance.now()-now); // debug code
      }

      const scaleImage = () => {
        // now = performance.now(); // debug code
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        setTimeout(encodeImage, delay); // gives the UI a second chance to get something done.
        //CPUProfile.push(performance.now()-now); // debug code
      }

      // now = performance.now(); // debug code
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');

      const maxSize = 200;
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      // w = Math.min(image.width, 1000);
      // h = image.height / image.width * w;
      canvas.width = width;
      canvas.height = height;

      setTimeout(scaleImage, delay); // gives the UI a chance to get something done.
      //CPUProfile.push(performance.now()-now); // debug code
    };

    image.src = imgURL;
  }

  // generatePreviewThumbnail(file: File, imageSrc: string) {
  //   const image = new Image();
  //   image.onload = () => {
  //     const resizedCanvas = document.createElement('canvas');
  //     resizedCanvas.width = 200;
  //     resizedCanvas.height = 200;

  //     const pica = Pica();
  //     pica.resize(image, resizedCanvas, {}).then(result => console.log('resize done!', result));
  //   };
  //   image.src = imageSrc;
  // }

  // generatePreviewThumbnail(file: File, imageSrc: string) {
  //   const image = new Image();
  //   image.onload = () => {
  //     // Resize the image
  //     const canvas = document.createElement('canvas');
  //     const maxSize = 200;
  //     let width = image.width;
  //     let height = image.height;

  //     if (width > height) {
  //       if (width > maxSize) {
  //         height *= maxSize / width;
  //         width = maxSize;
  //       }
  //     } else {
  //       if (height > maxSize) {
  //         width *= maxSize / height;
  //         height = maxSize;
  //       }
  //     }

  //     canvas.width = width;
  //     canvas.height = height;
  //     canvas.getContext('2d').drawImage(image, 0, 0, width, height);

  //     const dataUrl = canvas.toDataURL('image/jpeg');

  //     // Add id for the ng for tracking
  //     this.index += 1;
  //     this.images.push({
  //       id: this.index,
  //       file: file,
  //       src: dataUrl
  //     });

  //     this.ref.markForCheck();
  //   }
  //   image.src = imageSrc;
  // }

  removeImage(image: Object) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  onCreateAlbum() {
    const params = {
      title: this.title,
      rollId: this.rollId
    };

    this.albumService.createAlbum(params).then((album: Album) => {
      console.log('Album has been created');
      this.images.forEach(image => image.albums = [album._id]);
      this.uploadService.upload(this.images);
    });
  }

  trackByFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }
}
