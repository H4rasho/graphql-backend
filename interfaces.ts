export interface MaquinasInterface {
  id: String;
  coidgo: String;
  comentario: String;
  horas_por_dia: Number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  id_sector: String;
  id_equipo: String;
}

export interface EquiposInterface {
  id: String;
  modelo: String;
  descripcion: String;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  id_sector: String;
  id_tipo: String;
}

export interface ComponentesInterface {
  codigo: String;
  cometario: String;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  id_maquina: String;
  id_componente_mayor: String;
}
