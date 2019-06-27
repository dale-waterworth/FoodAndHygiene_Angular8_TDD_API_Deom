import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { testDeclarations } from './test/test.declarations';
import { testImports } from './test/test.imports';
import { testProviders } from './test/test.providers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ...testDeclarations
      ],
      imports: [
        ...testImports
      ],
      providers: [
        ...testProviders
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
