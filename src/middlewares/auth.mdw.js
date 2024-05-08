import jwt from "jsonwebtoken";

export const authMDW = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({
            message: "Vui lòng đăng nhập",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({
                message: "Token hết thời gian hiệu lực. Vui lòng đăng nhập lại",
            });
        }

        return res.status(401).json({
            message: "Token không hợp lệ",
        });
    }
};
