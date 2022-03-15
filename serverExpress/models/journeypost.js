"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class journeyPost extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			journeyPost.belongsTo(models.user, {
				as: "author",
				foreignKey: {
					name: "idUser",
				},
			});

			journeyPost.belongsToMany(models.user, {
				as: "bookmarkPost",
				through: {
					model: "bookmark",
					as: "bridge",
				},
				foreignKey: {
					name: "idJourney",
				},
			});

			// journeyPost.hasMany(models.bookmark, {
			// 	as: "journeyPost",
			// 	foreignKey: {
			// 		name: "idJourney",
			// 	},
			// });

		}
	}
	journeyPost.init(
		{
			idUser: DataTypes.INTEGER,
			title: DataTypes.STRING,
			image: DataTypes.STRING,
			desc: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "journeyPost",
		}
	);
	return journeyPost;
};
