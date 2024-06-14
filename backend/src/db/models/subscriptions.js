const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const subscriptions = sequelize.define(
    'subscriptions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      frequency: {
        type: DataTypes.ENUM,

        values: ['weekly', 'monthly'],
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
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

  subscriptions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.subscriptions.belongsTo(db.users, {
      as: 'consumer',
      foreignKey: {
        name: 'consumerId',
      },
      constraints: false,
    });

    db.subscriptions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.subscriptions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return subscriptions;
};
