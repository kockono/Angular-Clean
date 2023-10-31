import { FormGroup, AbstractControl } from '@angular/forms';
/**
 * @author Chris Cobos
 * @version 1.0.1
 *
 * Esta sección permite validar formularios globalmente
 * @param simpleForm       - Formulario enviado desde el Html
 * @var simpleForm.invalid - Valida si se respeto lo indicado
 */

export function isValidForm(simpleForm: FormGroup): boolean {
  if (!simpleForm.invalid) return false;

  Object.values(simpleForm.controls).forEach((control: AbstractControl) => { 
    touchAllFields(control)
  });

  return true;
}

function touchAllFields(control: AbstractControl): void {
  if (control instanceof FormGroup) 
    Object.values(control.controls).forEach((control: AbstractControl) => control.markAsTouched() );
  else
    control.markAsTouched();
}
