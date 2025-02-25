import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NxDocument } from '../nuxeo.interface';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'nuxeo-document-view',
  imports: [RouterModule],
  templateUrl: './document-view.component.html',
  styleUrl: './document-view.component.css',
})
export class DocumentViewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  http: HttpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  docId: string;
  document: NxDocument | undefined;
  safePreviewUrl: SafeResourceUrl | undefined;

  constructor() {
    this.docId = this.route.snapshot.params['id'];
    this.http
      .get(`/nuxeo/api/v1/id/${this.docId}`, {
        headers: {
          'X-NXenrichers.document': 'thumbnail, preview',
          properties: '*',
        },
      })
      .subscribe(response => {
        this.document = response as NxDocument;
        const previewUrl = this.document.contextParameters?.preview?.url;
        if (previewUrl) {
          this.safePreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
        }
      });
  }

  isPicture(doc: NxDocument): boolean {
    return doc.facets.includes('Picture');
  }

  getPictureUrl(doc: NxDocument): SafeResourceUrl | undefined {
    if (!doc.properties) {
      return;
    }

    const views = doc.properties['picture:views'] as unknown[];
    if (!views || views.length === 0) {
      return;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(Object(views[3]).content.data);
  }
}
