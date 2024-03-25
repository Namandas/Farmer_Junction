import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('dont logout pls');
            return res.sendStatus(401);
        }
    
        // Verify JWT token
         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }
            // Token is valid, set user information in request object for future use
            req.user = decoded;
            next(); // Proceed to the next middleware or route handler
        })
    }catch(err){
        res.sendStatus(400);
    }
   

};
export default authenticateUser;