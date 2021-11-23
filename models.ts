import { DataTypes } from "sequelize/dist";
import { geslubConn } from "./database";

export const Equipos = geslubConn.define(
  "equipos",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      comment: "Id del equipo",
    },
    modelo: {
      type: DataTypes.TEXT,
      comment: "Modelo del equipo",
    },
    descripcion: {
      type: DataTypes.TEXT,
      comment: "Descripción del equipo",
    },
  },
  {
    timestamps: true,
    updatedAt: "fecha_actualizacion",
    createdAt: "fecha_creacion",
  }
);

export const Maquinas = geslubConn.define(
  "maquinas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      comment: "Id de la maquina",
    },
    codigo: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Identificador del equipo en el sector",
    },
    comentario: {
      type: DataTypes.TEXT,
      comment: "Comentario sobre la maquina",
    },
    horas_por_dia: {
      type: DataTypes.DECIMAL,
      comment: "Horas de operación de la maquina por día",
    },
  },
  {
    timestamps: true,
    updatedAt: "fecha_actualizacion",
    createdAt: "fecha_creacion",
  }
);

export const Componentes = geslubConn.define(
  "componentes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      comment: "Id del componente",
    },
    codigo: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Identificador del componente en la maquina",
    },
    comentario: {
      type: DataTypes.TEXT,
      comment: "Comentario sobre el componente",
    },
  },
  {
    timestamps: true,
    updatedAt: "fecha_actualizacion",
    createdAt: "fecha_creacion",
  }
);

Equipos.hasMany(Maquinas, {
  foreignKey: "id_equipo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Maquinas.belongsTo(Equipos, {
  foreignKey: "id_equipo",
});

Maquinas.hasMany(Componentes, {
  foreignKey: "id_maquina",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Componentes.belongsTo(Maquinas, {
  foreignKey: "id_maquina",
});

Componentes.hasMany(Componentes, {
  foreignKey: "id_componente_mayor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Componentes.belongsTo(Componentes, {
  foreignKey: "id_componente_mayor",
});

Equipos.hasMany(Maquinas, {
  foreignKey: "id_equipo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Maquinas.belongsTo(Equipos, {
  foreignKey: "id_equipo",
});

Equipos.hasMany(Componentes, {
  foreignKey: "id_equipo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Componentes.belongsTo(Equipos, {
  foreignKey: "id_equipo",
});
