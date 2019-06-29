import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() set tags(value: string[]) {
    // console.log(value);
    this.tagString = value.join(', ');
  };
  tagString: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.tags);
  }
}
