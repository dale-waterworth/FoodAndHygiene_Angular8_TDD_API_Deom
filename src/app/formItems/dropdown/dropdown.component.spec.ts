import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { testDeclarations } from 'src/app/test/test.declarations';
import { testImports } from 'src/app/test/test.imports';
import { testProviders } from 'src/app/test/test.providers';
import { FormGroup, FormBuilder } from '@angular/forms';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [
      DropdownComponent,
      ...testDeclarations
    ],
    imports: [
      ...testImports
    ],
    providers: [
      ...testProviders
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.dropDownForm = new FormBuilder().group({
      dropDown: []
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
