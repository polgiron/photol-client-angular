import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
