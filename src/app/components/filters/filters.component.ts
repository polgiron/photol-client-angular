import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  @Input() set tags (value: Tag[]) {
    this._tags = value;
    this.selectedTags = [];
  };
  @Output() updateFilters: EventEmitter<Tag[]> = new EventEmitter();
  private _tags: Tag[];
  selectedTags: Tag[];

  get tags() {
    return this._tags;
  }

  constructor(
    // private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  onClickFilter(tag: Tag) {
    if (!tag.active) {
      tag.active = true;
      this.selectedTags.push(tag);
    } else {
      tag.active = false;
      this.selectedTags = this.selectedTags.filter(selectedTag => selectedTag._id != tag._id);
    }
    this.updateFilters.emit(this.selectedTags);
  }
}
