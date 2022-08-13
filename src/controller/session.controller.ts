import log from "../logger";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createAccessToken, createRefreshToken, createSession, deleteSession } from "../service/session.service";

// create session - login
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
    return res.send({ refreshToken, accessToken });

}

// delete session - logout
export async function deleteSessionHandler(req: Request, res: Response) {
    try {
        const session = await deleteSession(req.user._id);
        return res.send("Session deleted");
    } catch (error) {
        log.error(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }

}




