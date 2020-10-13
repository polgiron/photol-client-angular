import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'src/app/models/image.model';
import { AddMenuService } from 'src/app/services/add-menu.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-button-add-menu',
  templateUrl: './button-add-menu.component.html',
  styleUrls: ['./button-add-menu.component.scss']
})
export class ButtonAddMenuComponent implements OnInit, OnDestroy {
  @Input() image: Image;
  @ViewChild('dropdown', { static: true }) dropdown: BsDropdownDirective;
  private _alive: boolean = true;
  keepOpen: boolean = false;

  constructor(
    private addMenuService: AddMenuService,
    private ref: ChangeDetectorRef,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.addMenuService.closeAllChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe(() => {
        if (!this.keepOpen && this.dropdown) {
          this.dropdown.hide();
          this.ref.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  onOpenChange(opened: boolean): void {
    this.keepOpen = true;
    this.addMenuService.closeAll();

    if (opened) {
      this.keepOpen = false;
    }
  }

  onClickAddToPrint(): void {
    this.image.toPrint = !this.image.toPrint;
    this.imageService.update(this.image._id, {
      toPrint: this.image.toPrint
    }).then(() => {
      const images = this.imageService.currentImages;
      images.map((image: Image) => {
        if (image._id == this.image._id) {
          image.toPrint = this.image.toPrint
        }
      });
      this.imageService.updateCurrentImages(images);
    });
  }

  onClickAddToPublic(): void {
    this.image.public = !this.image.public;
    this.imageService.update(this.image._id, {
      public: this.image.public
    }).then(() => {
      const images = this.imageService.currentImages;
      images.map((image: Image) => {
        if (image._id == this.image._id) {
          image.public = this.image.public
        }
      });
      this.imageService.updateCurrentImages(images);
    });
  }
}
