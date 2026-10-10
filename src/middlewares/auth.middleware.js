const jwt = require("jsonwebtoken");


async function authArtist(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "artist") {
            return res.status(401).json({
                message: "Only artists can create albums"
            })
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "user") {
            return res.status(401).json({
                message: "Only users can listen to music"
            })
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}


module.exports = { authArtist, authUser };