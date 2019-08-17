import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit, OnDestroy {
  @Input() image: Image;
  private _alive: boolean = true;
  newTagValue: string = '';
  allTags: Tag[];
  editMode: boolean = false;

  constructor(
    private tagService: TagService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // console.log(this.image.tags);

    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.editMode = settings.editMode;
        this.ref.markForCheck();
      });
  }

  async onFocus() {
    this.allTags = await this.tagService.getAll();
  }

  async onKeyEnter() {
    if (this.newTagValue.length && !this.image.tags.find(tag => tag.value == this.newTagValue)) {
      const existingTag = this.allTags.find(tag => tag.value == this.newTagValue);

      if (existingTag) {
        // Add tag to image
        // console.log('tag already exists');

        this.image.tags = this.image.tags.concat(existingTag);

        this.imageService.update(this.image._id, {
          tags: this.image.tags
        });

      } else {
        // Create tag and add to image
        // console.log('create tag and add to image');

        const newTag = await this.tagService.create({
          value: this.newTagValue,
          images: [this.image._id]
        });

        this.image.tags = this.image.tags.concat(newTag);
      }

      this.newTagValue = '';
      this.ref.markForCheck();
    }
  }

  removeTag(deleteTag: Tag) {
    this.image.tags = this.image.tags.filter(tag => tag._id != deleteTag._id);
    this.imageService.update(this.image._id, {
      tags: this.image.tags
    });
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
