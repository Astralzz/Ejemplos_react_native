// * Modelo de usuario
interface Usuario {
  id?: number;
  nombre: string;
  matricula: string;
  telefono: string | null;
}

export default Usuario;