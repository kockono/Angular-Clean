/**
 * @author Chris Cobos
 * @version 1.0.0
 * @description - Obtiene el elemento guardado en el local storage y lo parsea
 * 
 * @param {string} [itemName] - Somebody's name.
 * @const {string} item       - Constante con los datos parseado
 * @return {item}             - El item ya parseado del dato buscado
 */
export function getItemsLocalStorage(itemName:string): any {
  const item:string = localStorage.getItem(itemName) || "";
  if (item) 
    return JSON.parse(item);
  else 
    return null;
}
