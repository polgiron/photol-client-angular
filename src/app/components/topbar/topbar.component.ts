import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
  @Input() sticky: boolean = false;

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void { }
}
