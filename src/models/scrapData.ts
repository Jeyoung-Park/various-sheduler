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
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        dueDate: {
          type: DataTypes.DATE,
        },
      },
      {
        modelName: "ScrapData", // We need to choose the model name
      }
    );
  }
};

export {};
