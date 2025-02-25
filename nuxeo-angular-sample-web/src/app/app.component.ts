import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxUser } from './nuxeo.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nuxeo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule],
})
export class AppComponent {
  http: HttpClient = inject(HttpClient);

  user: NxUser | undefined;

  constructor() {
    this.http.get('/nuxeo/api/v1/me').subscribe(response => {
      this.user = response as NxUser;
    });
  }
}
