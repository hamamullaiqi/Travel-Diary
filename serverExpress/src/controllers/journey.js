const { journeyPost, user } = require("../../models");
const path = require("path")
const fs = require("fs")


exports.getJourneys = async (req, res) => {
	try {
		let dataJourneys = await journeyPost.findAll({
            include : {
                model: user,
                as: "author",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }
            },
			attributes: {
				exclude: [	 "updatedAt", "idUser"],
			},
		});

		dataJourneys = JSON.parse(JSON.stringify(dataJourneys))

		dataJourneys = dataJourneys.map((item) => {
		    return {...item, image: process.env.FILE_PATH + item.image }
		})

		res.send({
			status: "success",
			data: {
				dataJourneys,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: "failed",
			message: "Server Error",
		});
	}
};

exports.getJourney = async (req, res) => {
	try {
		const { id } = req.params;

		let dataJourney = await journeyPost.findAll({
			where: {
				id
			},
            include : {
                model: user,
                as: "author",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }
            },
			attributes: {
				exclude: [	 "updatedAt", "idUser"],
			},
		});

		dataJourney = JSON.parse(JSON.stringify(dataJourney))

		dataJourney = dataJourney.map((item) => {
		    return {...item, image: process.env.FILE_PATH + item.image }
		})

		res.send({
			status: "success",
			data: {
				dataJourney,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: "failed",
			message: "Server Error",
		});
	}
};
// exports.getDetailJourney = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		let dataJourney = await journeyPost.findAll({
// 			where: {
// 				 id
// 			},
//             include : {
//                 model: user,
//                 as: "author",
//                 attributes : {
//                     exclude : ["createdAt", "updatedAt", "password"]
//                 }
//             },
// 			attributes: {
// 				exclude: [	 "updatedAt", "idUser"],
// 			},
// 		});

// 		dataJourney = JSON.parse(JSON.stringify(dataJourney))

// 		dataJourney = dataJourney.map((item) => {
// 		    return {...item, image: process.env.FILE_PATH + item.image }
// 		})

// 		res.send({
// 			status: "success",
// 			data: {
// 				dataJourney,
// 			},
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.send({
// 			status: "failed",
// 			message: "Server Error",
// 		});
// 	}
// };

exports.getUserJourneys = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);

		let dataJourney = await journeyPost.findAll({
			where: {
				 idUser : id
			},
            include : {
                model: user,
                as: "author",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }
            },
			attributes: {
				exclude: [	 "updatedAt", "idUser"],
			},
		});

		dataJourney = JSON.parse(JSON.stringify(dataJourney))

		dataJourney = dataJourney.map((item) => {
		    return {...item, image: process.env.FILE_PATH + item.image }
		})

		res.send({
			status: "success",
			data: {
				dataJourney,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: "failed",
			message: "Server Error",
		});
	}
};

exports.addJourney = async (req, res) => {
	try {

		
		const dataCreate = {
			title: req.body.title,
			idUser: req.body.idUser,
			image: req.file.filename,
			desc: req.body.desc,
		};

		let newJourney = await journeyPost.create(dataCreate, {
			...dataCreate,
		});

		newJourney = JSON.parse(JSON.stringify(newJourney))

		newJourney = {
		    ...newJourney,
		    image : process.env.FILE_PATH + newJourney.image
		}

		res.send({
			status: "success",
			data: {
				newJourney,
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

exports.updateJourney = async (req, res) => {
    try {
        const { id } = req.params


        let dataUpdate = {
			
            title : req.body.title,
			desc : req.body.desc
            // image : req.file.filename
        }

        console.log(id);

         let updateJourney = await journeyPost.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate
            
        })

        updateJourney = JSON.parse(JSON.stringify(updateJourney))

        // updateJourney = {
        //     ...dataUpdate,
        //     image : process.env.FILE_PATH + dataUpdate.image
        // }

        
           

        res.status(201).send({
            status: "success",
            data: {
                updateJourney
            }
        })
    } catch (error) {
        console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
    }
}

exports.updateThumbJourney = async (req, res) => {
    try {
        const { id } = req.params

        

            let dataJourney = await journeyPost.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            })



            
    
            if(dataJourney.image !== null) {
    
            const replaceFile = (filePath)=> {
                //menggabungkan direktori controller , uploads dan nama file Product
                
                filePath = path.join(__dirname, "../../uploads", filePath)
                fs.unlink( filePath, (err) => console.log(err))
            }

        replaceFile(dataJourney.image)


        }

        let dataUpdate = {
            image : req.file.filename
        }

        console.log(id);

         let updateThumbJourney = await journeyPost.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate
            
        })

        updateThumbJourney = JSON.parse(JSON.stringify(updateThumbJourney))

        updateThumbJourney = {
            image : process.env.FILE_PATH + dataUpdate.image
        }

        // dataUser = JSON.parse(JSON.stringify(dataUser))
        

        // dataUser =  { ...dataUser,  image : process.env.FILE_PATH + dataUser.image}
        
           

        res.status(200).send({
            status: "success",
            data: {
               updateThumbJourney
            }
        })
    } catch (error) {
        console.log(error);
        console.log(error);
		res.status(500).send({
			status: "failed",
			message: "Server Error",
		});
    }
}