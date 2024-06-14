const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const deliveries = sequelize.define(
    'deliveries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      pickup_date: {
        type: DataTypes.DATE,
      },

      delivery_date: {
        type: DataTypes.DATE,
      },

      proof_of_delivery: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  deliveries.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.deliveries.belongsTo(db.orders, {
      as: 'order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    db.deliveries.belongsTo(db.users, {
      as: 'delivery_personnel',
      foreignKey: {
        name: 'delivery_personnelId',
      },
      constraints: false,
    });

    db.deliveries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.deliveries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return deliveries;
};
