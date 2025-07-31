const Sequelize = require('sequelize');

class Sale extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        productName: {
          //제품명
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        description: {
          //제품설명
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          //판매가격
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userName: {
          //회원명
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        photo: {
          //제품사진 파일명
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Sale',
        tableName: 'sale',
      }
    );
  }

  static associate(db) {
    db.Sale.belongsTo(db.User, { foreignKey: 'userID', sourceKey: 'id' });
  }
}

module.exports = Sale;
