import { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { findAndDeleteSessionQuery, findSessionQuery, sessionCreateQuery } from "../repo/session.repo";
import { decode, sign } from "../utils/jwt.utils";
import config from "config";
import { LeanDocument } from "mongoose";
import { findUserQuery } from "../repo/user.repo";
import log from "../logger";
import _ from "lodash";
export async function createSession(input: { userId: string, userAgent: string }) {
    const sessionCheck = await findAndDeleteSessionQuery({ userId: input.userId });
    
    const session = await sessionCreateQuery(input);
    
    return session;
}

export function createAccessToken(
    user: Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>,
    session: SessionDocument
): string {
    
    const accessToken = sign({ user: user.toJSON(), sessionId: session.id }, { expiresIn: config.get("accessTokenTtl") as string });
    return accessToken;

}

export function createRefreshToken(session: SessionDocument): string {
    const refreshToken = sign({ session: session }, { expiresIn: config.get("refreshTokenTtl") as string });
    return refreshToken;
}

export async function sessionValidation(session:SessionDocument["_id"],refreshToken:string){
    const {decoded}=decode(refreshToken);
    
    if(decoded){
        if(decoded.session._id!==session){
            return false;
        }

        const checkSession=await findSessionQuery({_id:session});
        
        if(!checkSession){
            
            return false;
        }
        if(checkSession.id!==session){
            return false;
        }
        return true;

    }
    return false;
}

export async function recreateAccessToken(refreshToken:string) {
    const output=decode(refreshToken);
    
    if(output.decoded){
        const session=await findSessionQuery({_id:output.decoded.session._id});
        
        if(!session){
            return false;
        }
        
        const user= await findUserQuery({ _id: session.userId});
        if(!user) return false;
       
        const accessToken=createAccessToken(_.omit(user,"password"),session);
        return accessToken;
    }
    return false;

}

export async function deleteSession(userId:UserDocument["_id"]){
    
    const sessionCheck=await findAndDeleteSessionQuery({userId:userId});
    
    return sessionCheck;
}