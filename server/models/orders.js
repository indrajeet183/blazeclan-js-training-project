const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    increment_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    shipping_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    billing_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    tax: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    paid: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    due: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    shipping_amount: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      defaultValue: 0
    },
    payment_method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shipping_method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shipment',
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'payment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
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
        name: "shipping_address",
        using: "BTREE",
        fields: [
          { name: "shipping_address" },
        ]
      },
      {
        name: "billing_address",
        using: "BTREE",
        fields: [
          { name: "billing_address" },
        ]
      },
      {
        name: "shipment_id",
        using: "BTREE",
        fields: [
          { name: "shipment_id" },
        ]
      },
      {
        name: "payment_id",
        using: "BTREE",
        fields: [
          { name: "payment_id" },
        ]
      },
      {
        name: "orders_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
