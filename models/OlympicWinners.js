module.exports = function(sequelize, DataTypes) {
  const OlympicWinners = sequelize.define('OlympicWinners', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    athlete: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country_group: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    silver: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bronze: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'olympic_winners',
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

  OlympicWinners.associate = function (models) {
    OlympicWinners.belongsTo(models['Countries'], { 
      foreignKey: "countryId", 
      targetKey: "id",
      as: "country"
    });

    OlympicWinners.belongsTo(models['Sports'], { 
      foreignKey: "sportId", 
      targetKey: "id",
      as: "sport"
    });
  }

  return OlympicWinners;
};
