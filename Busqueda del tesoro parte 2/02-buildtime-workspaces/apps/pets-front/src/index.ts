// A diferencia de la variante runtime (export default vía Federation), aquí
// el host consume un named export normal de paquete:
//   import { PetsModule } from '@nimbus/pets-front';
export { PetsModule } from './PetModule';