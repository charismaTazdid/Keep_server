import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// http://localhost:5500/post/uploadImage
export const createPost = async (req, res) => {
    const { userId, fileName } = req.body;
    const prescription = req.file;
    try {
        const prescriptionBufferString = prescription.buffer.toString("base64");
        const post = await prisma.post.create({
            data: {
                fileName: fileName,
                prescription: prescriptionBufferString,
                userId: userId,
            },
        });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Problem In Server Side...', error: error });
    }
};

// http://localhost:5500/post/getMyImages/:userId
export const getMyImage = async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId,
            },
        });
        const modifiedPosts = [];
        for (let i = 0; i < userPosts.length; i++) {
            const base64Data = Buffer.from(userPosts[i].prescription).toString("base64");
            userPosts[i].prescription = base64Data;
            modifiedPosts.push(userPosts[i])
        }
        res.status(200).json({ message: "Successfull", posts: modifiedPosts })
    } catch (error) {
        console.log(error)
    }
};


