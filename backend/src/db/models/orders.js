const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      order_date: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['pending', 'completed', 'cancelled'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  orders.associate = (db) => {
    db.orders.belongsToMany(db.products, {
      as: 'products',
      foreignKey: {
        name: 'orders_productsId',
      },
      constraints: false,
      through: 'ordersProductsProducts',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.orders.hasMany(db.deliveries, {
      as: 'deliveries_order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    //end loop

    db.orders.belongsTo(db.users, {
      as: 'consumer',
      foreignKey: {
        name: 'consumerId',
      },
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return orders;
};
