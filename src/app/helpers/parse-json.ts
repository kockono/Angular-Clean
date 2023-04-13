/**
 * @author Chris Cobos
 * @version 1.0.0
 * @description - Obtiene el elemento guardado en el local storage y lo parsea
 * 
 * @param itemName  - Dato a buscar del local storage
 * @var item        - Variable con los datos parseado
 * @return { item } - El item ya parseado del dato buscado
 *
 * @function {@link_getItemsLocalStorage} - Metodo para obtención del dato parseado
 */
export function getItemsLocalStorage(itemName:string) {
  const item:string | null = localStorage.getItem(itemName) || "";
  return JSON.parse(item);
}
