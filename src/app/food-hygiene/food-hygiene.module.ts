import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodHygieneComponent } from './food-hygiene.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormItemsModule } from '../formItems/form-items.module';
import { EstablishmentListComponent } from './establishment-list/establishment-list.component';
import { RatingsComponent } from './ratings/ratings.component';

@NgModule({
  declarations: [
    FoodHygieneComponent,
    EstablishmentListComponent,
    RatingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FoodHygieneComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    FormItemsModule.forRoot()
  ],
  providers: [
    ApiService
  ]
})
export class FoodHygieneModule {
  
}
