import JWT from 'jsonwebtoken'


export const requireSignIn = (req, res, next) => {
try {
    const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
    )
    req.user = decode;
    return next();
} catch (error) {
    return res.json({message:"Go to login"})
}

}