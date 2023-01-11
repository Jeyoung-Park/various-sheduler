export {};
const Sequelize = require("sequelize");

class Scrap extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        source: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        source_url: {
          type: Sequelize.DataTypes.STRING,
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

  static associate(db: any) {
    db.Scrap.hasMany(db.ScrapData, {
      foreignKey: "source_id",
      sourceKey: "id",
    });
  }
}

module.exports = Scrap;
