import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        messsage: " user not authicated",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        messsage: " invaild token ",
      });
    }
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default isLoggedIn;
