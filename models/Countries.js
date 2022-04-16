module.exports = function(sequelize, DataTypes) {
  const Countries = sequelize.define('Countries', {
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
    tableName: 'countries',
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

  Countries.associate = function (models) {
    Countries.hasMany(models['OlympicWinners'], {
      foreignKey: "countryId",
      sourceKey: "id",
      as: "winners"
    })
  }

  return Countries;
};
