import log  from "../logger";
import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { sendMail } from "../utils/email.utils";

export async function createUserHandler(req: Request, res: Response) {
    try {
        // first time user is created
        const { user, otp } = await createUser(req.body);

        // mail verfication when password is sent to mail
        const mailRes = await sendMail((await user).email as string, "Password", `<h1>Your password is: ${otp}</h1>`);
        res.send("Please login with password sent to your mail");
    } catch (e) {
        // log.error(e);
        res.status(401).json((e as Error).message);
    }
    


}