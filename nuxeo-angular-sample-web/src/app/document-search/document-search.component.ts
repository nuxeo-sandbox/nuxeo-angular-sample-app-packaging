import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDocuments } from '../nuxeo.interface';
import { RouterModule, Router, ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'nuxeo-document-search',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './document-search.component.html',
  styleUrl: './document-search.component.css',
})
export class DocumentSearchComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly http: HttpClient = inject(HttpClient);

  documents: NxDocuments | undefined;

  isDetailedDisplayed = false;

  searchForm = new FormGroup({
    fulltext: new FormControl(''),
  });

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof ChildActivationEnd) {
        this.isDetailedDisplayed = this.route.children.length > 0;
      }
    });

    this.search();
  }

  search() {
    this.http
      .get('/nuxeo/api/v1/search/pp/default_search/execute', {
        headers: {
          'X-NXenrichers.document': 'thumbnail',
        },
        params: { ecm_fulltext: this.searchForm.value.fulltext ?? '' },
      })
      .subscribe(response => {
        this.documents = response as NxDocuments;
      });
  }

  onReset() {
    this.searchForm.reset();
    this.documents = undefined;
  }
}
