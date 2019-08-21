import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  @Input() image: Image;
  @Input() editMode: boolean = false;
  newTagValue: string = '';
  allTags: Tag[];
  suggestedTags: Tag[];

  constructor(
    private tagService: TagService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // console.log(this.image.tags);
  }

  async onFocus() {
    this.allTags = await this.tagService.getAll();
    this.updateSuggestedTags();
    this.ref.markForCheck();
  }

  // onBlur() {
  //   console.log('ON BLUR');
  //   this.suggestedTags = null;
  //   this.ref.markForCheck();
  // }

  updateSuggestedTags() {
    this.suggestedTags = this.allTags.filter(tag => {
      return !this.image.tags.find(imageTag => imageTag._id == tag._id);
    });
    this.ref.markForCheck();
  }

  async onKeyEnter() {
    if (this.newTagValue.length && !this.image.tags.find(tag => tag.value == this.newTagValue)) {
      const existingTag = this.allTags.find(tag => tag.value == this.newTagValue);

      if (existingTag) {
        // Add tag to image
        this.addExistingTag(existingTag);
      } else {
        // Create tag and add to image
        this.addNewTag(this.newTagValue);
      }

      this.newTagValue = '';
      this.ref.markForCheck();
    }
  }

  addExistingTag(tag: Tag) {
    this.image.tags = this.image.tags.concat(tag);
    this.imageService.update(this.image._id, {
      tags: this.image.tags
    });
    this.updateSuggestedTags();
    this.ref.markForCheck();
  }

  async addNewTag(tag: string) {
    const newTag = await this.tagService.create({
      value: tag,
      images: [this.image._id]
    });
    this.image.tags = this.image.tags.concat(newTag);
    this.ref.markForCheck();
  }

  removeTag(deleteTag: Tag) {
    this.image.tags = this.image.tags.filter(tag => tag._id != deleteTag._id);
    this.imageService.update(this.image._id, {
      tags: this.image.tags
    });
    this.updateSuggestedTags();
    this.ref.markForCheck();
  }
}
