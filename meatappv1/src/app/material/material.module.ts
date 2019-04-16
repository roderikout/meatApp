import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

const materials = [
  MatAutocompleteModule, MatFormFieldModule,
  MatInputModule, MatButtonModule,
];

@NgModule({
  imports: [ materials ],
  exports: [ materials ],
})
export class MaterialModule { }
