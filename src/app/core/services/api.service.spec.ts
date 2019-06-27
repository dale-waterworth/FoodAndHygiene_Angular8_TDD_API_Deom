import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { testDeclarations } from 'src/app/test/test.declarations';
import { testImports } from 'src/app/test/test.imports';
import { testProviders } from 'src/app/test/test.providers';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...testDeclarations
    ],
    imports: [
      ...testImports
    ],
    providers: [
      ...testProviders
    ]

  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
