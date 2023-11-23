import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SocialPlatform';

  constructor(
    private sharedService: SharedService,
    public authService: AuthService,
  ) {}

}
