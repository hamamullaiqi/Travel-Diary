"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			user.hasMany(models.journeyPost, {
				as: "author",
				foreignKey: {
					name: "idUser",
				},
			});
			

			user.belongsToMany(models.journeyPost, {
				as: "bookmarker",
				through: {
					model: "bookmark",
					as: "bridge",
				},
				foreignKey: {
					name: "idUser",
				},
			});
		}
	}
	user.init(
		{
			fullname: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			phone: DataTypes.STRING,
			address: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "user",
		}
	);
	return user;
};
