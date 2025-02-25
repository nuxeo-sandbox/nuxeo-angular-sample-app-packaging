export interface NxUser {
  id: string;
  'entity-type': 'user';
  properties: {
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
  };
}

export interface NxDocument {
  'entity-type': 'document';
  title: string;
  uid: string;
  facets: string[];
  contextParameters:
    | {
        thumbnail:
          | {
              url: string;
            }
          | undefined;
        preview:
          | {
              url: string;
            }
          | undefined;
      }
    | undefined;
  properties: Record<string, unknown> | undefined;
}

export interface NxDocuments {
  'entity-type': 'documents';
  entries: NxDocument[];
  numberOfPage: number;
  currentPageIndex: number;
  pageSize: number;
  maxResults: number;
  currentPageSize: number;
}
