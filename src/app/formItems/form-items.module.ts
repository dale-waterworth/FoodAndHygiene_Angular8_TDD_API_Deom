import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DropdownComponent
  ]
})
export class FormItemsModule {
  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: FormItemsModule,
      providers: []
    }
  }
}
