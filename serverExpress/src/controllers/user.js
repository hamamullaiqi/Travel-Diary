
const { user } = require("../../models");
const path = require("path")
const fs = require("fs")



exports.getUsers = async (req, res) => {
    try {
        let dataUsers = await user.findAll({
            attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
        })

        dataUsers = JSON.parse(JSON.stringify(dataUsers))

        dataUsers = dataUsers.map((item) => {
          return { ...item,  image : process.env.FILE_PATH + item.image}
        
        }) 
           

        res.status(200).send({
            status: "success",
            data: {
                dataUsers
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

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params
        let dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
        })

        // dataUser = JSON.parse(JSON.stringify(dataUser))
        

        // dataUser =  { ...dataUser,  image : process.env.FILE_PATH + dataUser.image}
        
           

        res.status(200).send({
            status: "success",
            data: {
                dataUser
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

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params

        

            // let dataUser = await user.findOne({
            //     where: {
            //         id
            //     },
            //     attributes: {
            //         exclude: ["createdAt", "updatedAt", "password"],
            //     },
            // })

            
    
        //     if(dataUser.image !== null) {
    
        //     const replaceFile = (filePath)=> {
        //         //menggabungkan direktori controller , uploads dan nama file Product
                
        //         filePath = path.join(__dirname, "../../uploads", filePath)
        //         fs.unlink( filePath, (err) => console.log(err))
        //     }

        // replaceFile(dataUser.image)


        // }

        let dataUpdate = {
            fullname : req.body.fullname,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            // image : req.file.filename
        }

        console.log(id);

         let updateProfile = await user.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate
            
        })

        updateProfile = JSON.parse(JSON.stringify(updateProfile))

        // updateProfile = {
        //     ...dataUpdate,
        //     image : process.env.FILE_PATH + dataUpdate.image
        // }

        // dataUser = JSON.parse(JSON.stringify(dataUser))
        

        // dataUser =  { ...dataUser,  image : process.env.FILE_PATH + dataUser.image}
        
           

        res.status(201).send({
            status: "success",
            data: {
                updateProfile
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

exports.updateAvatarProfile = async (req, res) => {
    try {
        const { id } = req.params

        

            let dataUser = await user.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            })

            
    
            if(dataUser.image !== null) {
    
            const replaceFile = (filePath)=> {
                //menggabungkan direktori controller , uploads dan nama file Product
                
                filePath = path.join(__dirname, "../../uploads", filePath)
                fs.unlink( filePath, (err) => console.log(err))
            }

        replaceFile(dataUser.image)


        }

        let dataUpdate = {
            image : req.file.filename
        }

        console.log(id);

         let updateAvatarProfile = await user.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate
            
        })

        updateAvatarProfile = JSON.parse(JSON.stringify(updateAvatarProfile))

        updateAvatarProfile = {
            image : process.env.FILE_PATH + dataUpdate.image
        }

        // dataUser = JSON.parse(JSON.stringify(dataUser))
        

        // dataUser =  { ...dataUser,  image : process.env.FILE_PATH + dataUser.image}
        
           

        res.status(200).send({
            status: "success",
            data: {
               updateAvatarProfile
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