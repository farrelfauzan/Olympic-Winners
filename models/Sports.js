module.exports = function(sequelize, DataTypes) {
  const Sports = sequelize.define('Sports', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sports',
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
    ]
  });

  Sports.associate = function (models) {
    Sports.hasMany(models['OlympicWinners'], {
      foreignKey: "sportId",
      sourceKey: "id",
      as: "winners"
    })
  }

  return Sports;
};
