import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/auth.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user: UserDetails;
  activePop: boolean;

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserDetails();
  }

  onPopShown(): void {
    this.activePop = true;
  }

  onPopHidden(): void {
    this.activePop = false;
  }
}
