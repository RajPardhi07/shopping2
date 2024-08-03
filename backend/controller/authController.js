import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from '../helper/authHelper.js'
import JWT from 'jsonwebtoken';
import QRCode from 'qrcode'
import QRModel from "../model/QRModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, role, gender } = req.body;

        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "email is required" })
        }
        if (!password) {
            return res.send({ message: "password is required" })
        }
        if (!address) {
            return res.send({ message: "address is required" })
        }
        if (!gender) {
            return res.send({ message: "gender is required" })
        }


        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send("User Already exit")
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await new userModel({
            name,
            password: hashedPassword,
            email,
            address,
            role,
            gender
        }).save();
        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            newUser
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send("Email and Password required")
        }

        const data = await userModel.findOne({ email });
        if (!data) {
            return res.status(404).send("Email is not registered")
        }

        const match = await comparePassword(password, data.password)
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid password",
            })

        }
        const token = await JWT.sign({ _id: data.id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            data: {
                name: data.name,
                email: data.email,
                address: data.address,
                role: data.role,
                gender: data.gender

            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }

}


export const alluserController = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await userModel.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        res.status(200).json({
            message: "User found success",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }

}


export const generateQR = async (req, res) => {
    try {
        const { components, dateReceived, itemsReceived } = req.body

        const currentDate = new Date();
        const receivedDate = new Date(dateReceived);

        if (receivedDate > currentDate) {
            return res.status(404).json({ message: "date Received cannot be future date" })
        }

        const qrIdentifier = `${components}-${Date.now()}`;
        const qrCode = await QRCode.toDataURL(qrIdentifier)
        console.log("qrcodeee", qrCode)

        const InventaryItem = await QRModel.create({
            components,
            dateReceived,
            balanceItem: itemsReceived,
            qrIdentifier,
            qrCode,
            dispatchItems:0
            
              })

        console.log("Saved Inventory data", InventaryItem)
        res.status(200).json({ qrCode })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }

}


export const QRCodedata = async (req, res) => {
    try {
        const QRcodedata = await QRModel.find();
        res.status(200).json(QRcodedata)


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
}




export const deleteQRCode = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQR = await QRModel.findByIdAndDelete(id);
        if (!deletedQR) {
            return res.status(404).json({ message: "QR Code not found" });
        }
        res.status(200).json({ message: "QR Code deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }
};


// export const editController = async (req, res) => {
//     try {
//         const {id} = req.params;

//         const updatedData = req.body;

//         const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, {new:true})
//         res.status(200).send({
//             success:true,
//             message:"Inventary edited successfully",
//             updatedUser
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: "Internal Server Error",
//             error
//         });
    
//     }
// }


export const editQRCode = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    
    
    try {
        const updatedQR = await QRModel.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedQR) {
            return res.status(404).json({ message: "QR Code not found" });
        }
        
        res.status(200).json(updatedQR);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }
};



export const editUserData = async (req, res) => {
    try {
        const {id} = req.params;

        const data = req.body;

        const editedUser = await userModel.findByIdAndUpdate(id, data, {new:true})

        if(!editedUser){
            return res.status(404).json({message:"user not found"})
        }

        res.status(200).json(editedUser);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error
        });
    }
};