import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validFormatImage'
})
/**
 * @author Chris Cobos
 * @version 1.0.0
 * @description Pipa que valida si el formato de la imagen es valido, si no es valido retorna una imagen por defecto
 * 
 * @param image               - Imagen a validar
 * @method isValidFormatImage - Metodo para validar el formato de la imagen es valido retorna un true o false
 * @returns {string}
 */
export class ValidFormatImagePipe implements PipeTransform {

  transform( image: string): string {

    return this.isValidFormatImage(image) ? image : 'assets/images/image-not-found.jpg';
  }

  isValidFormatImage(imageUrl:string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif)$/.test(imageUrl);
  }

}
