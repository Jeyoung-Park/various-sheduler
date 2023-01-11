export {};
const Sequelize = require("sequelize");

class Scrap extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        source: {
          type: Sequelize.DataTypes.STRING,
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

  // static associate(db:any) {
  //   db.User.hasMany(db.ScrapData, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
}

module.exports = Scrap;
