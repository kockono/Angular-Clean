import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidFormatImagePipe } from './valid-format-image.pipe';

@NgModule({
  declarations: [
    ValidFormatImagePipe,
    
  ],
  imports: [
    CommonModule,

  ],
  // Requerimos exportar la pipe para poder usarse en otro lados
  exports:[ 
    ValidFormatImagePipe,
    
  ]
})
export class PipesModule { }
