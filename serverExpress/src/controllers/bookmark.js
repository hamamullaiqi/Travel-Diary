const { journeyPost, user, bookmark } = require("../../models");

exports.addBookmark = async (req, res) => {
	try {
		const newBookmark = await bookmark.create({
			idUser: req.body.idUser,
			idJourney: req.body.idJourney,
		});

		res.send({
			status: "success",
			message: "Add Bookmark success",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
	}
};

exports.getBookmarks = async (req, res) => {
	try {
		const dataBookmarks = await bookmark.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt", "idUser", "idJourney"],
			},
			include: [
				{
					model: journeyPost,
					as: "journeyPosts",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
		});

		res.send({
			status: "success",
			data: {
				dataBookmarks,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
	}
};

exports.getBookmark = async (req, res) => {
	try {
		const { id } = req.params;

		let dataBookmark = await bookmark.findAll({
			where: {
				idUser: id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "idUser", "idJourney"],
			},

			include: {
				model: journeyPost,
				as: "journeyPosts",
				include: {
					model: user,
					as: "author",
					attributes: {
						exclude: ["createdAt", "updatedAt", "password"],
					},
				},
				attributes: {
					exclude: ["updatedAt"],
				},
			},
		});

		dataBookmark = JSON.parse(JSON.stringify(dataBookmark));

		dataBookmark = dataBookmark.map((item) => {
			return {
				...item,
				journeyPosts: {
					...item.journeyPosts,
					image: process.env.FILE_PATH + item.journeyPosts.image,
				},
			};
		});

		res.send({
			status: "success",

			dataBookmark,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
	}
};

exports.deleteBookmark = async (req, res) => {
	try {
		const { id } = req.params;

		const dataBookmark = await bookmark.destroy({
			where: {
				idJourney: id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "idUser", "idJourney"],
			},
		});

		res.send({
			status: "success",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
	}
};
