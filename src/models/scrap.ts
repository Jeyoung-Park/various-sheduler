const { Model, DataTypes } = require("sequelize");

class Scrap extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        source: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Scrap",
        tableName: "scrap",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}

module.exports = Scrap;
