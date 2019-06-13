import * as Sequelize from 'sequelize';
import {BaseModelInterface} from '../interfaces/BaseModelInterface';

export interface ParametroClienteAttributes {
  codparametro?: number;
  codcliente?: number;
  codfilial?: number;
  codfuncionario?: number;
}

export interface ParametroClienteInstance extends Sequelize.Instance<ParametroClienteAttributes>, ParametroClienteAttributes {}

export interface ParametroClienteModel
  extends BaseModelInterface,
    Sequelize.Model<ParametroClienteInstance, ParametroClienteAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ParametroClienteModel => {
  return sequelize.define(
    'ParametroCliente',
    {
      codparametro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      codcliente: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      codfuncionario: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      codfilial: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: 'b2b',
      tableName: 'parametros',
      timestamps: false,
    },
  );
};
