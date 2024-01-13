import jwt from 'jsonwebtoken';
export default function facultyToken(res, facultyID)
{
    const token = jwt.sign({ facultyID }, "secret", {
        expiresIn: '30d',
      });
    
      res.cookie('facultyjwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });    
}