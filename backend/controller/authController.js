import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from '../helper/authHelper.js'
import JWT from 'jsonwebtoken';


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
        const data = req.body;

        const alluser = await userModel.find();
        res.status(200).json({
            message: "All User",
            alluser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }

}


export const updateController = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedUser = await userModel.findByIdAndUpdate(id, data, {new:true})
        res.status(200).send({
            success:true,
            message:"Profile Edited Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
}