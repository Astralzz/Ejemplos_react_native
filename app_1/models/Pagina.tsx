// * Pagina
interface Pagina {
  nombre: string;
  titulo?: string;
  textoMenu?: string;
  nombreIcono: string;
  componente: React.ComponentType<any>;
}

export default Pagina;
