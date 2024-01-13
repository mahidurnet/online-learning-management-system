import jwt from 'jsonwebtoken';
export default function studentToken(res, studentID)
{
    const token = jwt.sign({ studentID }, "secret", {
        expiresIn: '30d',
      });
    
      res.cookie('studentjwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });    
}