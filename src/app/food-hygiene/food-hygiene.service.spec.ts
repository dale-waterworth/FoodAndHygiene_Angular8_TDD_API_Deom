import { TestBed } from '@angular/core/testing';

import { FoodHygieneService } from './food-hygiene.service';
import { testDeclarations } from '../test/test.declarations';
import { testImports } from '../test/test.imports';
import { testProviders } from '../test/test.providers';

describe('FoodHygieneService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ...testDeclarations
    ],
    imports: [
      ...testImports
    ],
    providers: [
      ...testProviders
    ]}));

  it('should be created', () => {
    const service: FoodHygieneService = TestBed.get(FoodHygieneService);
    expect(service).toBeTruthy();
  });

  
});
