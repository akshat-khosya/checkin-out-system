import log from "../logger";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createAccessToken, createRefreshToken, createSession,deleteSession } from "../service/session.service";


export async function createSessionHandler(req: Request, res: Response) {

    // validate user
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
   
    // create session
    const session = await createSession({ userId: user.id, userAgent: req.get("user-agent") || "" });

    // create access token
    const accessToken = await createAccessToken(user, session);
    // create refresh token
    const refreshToken = await createRefreshToken(session);
    // send token to client
    res.send({ refreshToken, accessToken });

}


export async function deleteSessionHandler(req:Request,res:Response){
    
    const session=await deleteSession(req.user._id);
    res.send("Session deleted");
}
