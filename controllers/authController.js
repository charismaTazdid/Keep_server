import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

// url:  http://localhost:5500/auth/register
export const registerUser = async (req, res) => {
    const userData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    try {

        const user = await prisma.user.findUnique({
            where: {
                phoneNumber: userData.phoneNumber,
            },
        })
        if (user) {
            return res.status(400).json({
                message: "This Number is registered already",
            });
        };
        const newUser = await prisma.user.create({
            data: { ...userData, password: hashedPassword }
        })
        res.status(201).json({ message: "Registration Successfull", data: newUser })
    } catch (error) {
        res.status(500).json(error)
    }
};

// http://localhost:5500/auth/login
export const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                phoneNumber: phoneNumber,
            },
        })
        if (!user) {
            return res.status(404).json({
                message: "User Not Found with this Phone Number",
            });
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Wrong Password! try again..." })
        };
        res.status(200).json({
            message: "Logged in successfully",
            data: user,
        });
    } catch (error) {
        console.log(error)
    }
};

// http://localhost:5500/auth/getAllUser
export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}
// will be implemented
export const logOut = (req, res) => {
    try {
    } catch (error) {
        console.log(error)
    }
};


// UPDATE PROFILE SECTION
// http://localhost:5500/auth/updateProfile

export const updateProfile = async (req, res) => {
    try {
        const detailData = req.body;
        const data = await prisma.profile.create({
            data: detailData
        })
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
};

// http://localhost:5500/auth/getUserDetails/:userId
export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        });
        if (!data) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}
