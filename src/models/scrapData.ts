const { DataTypes, Model } = require("sequelize");

module.exports = class ScrapData extends Model {
  static init(sequelize: any) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        due_date: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "ScrapData",
        tableName: "scrap_data",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
