const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shipment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shipping_method: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shipping_methods',
        key: 'id'
      }
    },
    isMultiple: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shipment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "shipping_method",
        using: "BTREE",
        fields: [
          { name: "shipping_method" },
        ]
      },
    ]
  });
};
