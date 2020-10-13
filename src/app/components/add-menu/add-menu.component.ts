import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  @Input() image: Image;

  constructor() { }

  ngOnInit() { }

  onClickAddToPrint() {

  }

  onClickAddToPublic() {

  }
}
