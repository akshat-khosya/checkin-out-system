import log from "../logger";
import Session from "../model/session.model";


export async function findAndDeleteSessionQuery(query:Object) {
   
    const sessionCheck=await Session.findOneAndDelete(query)
    
    return sessionCheck;
}

export async function sessionCreateQuery(input: { userId: string,userAgent:string }) {
    
    return await Session.create({ userId: input.userId, userAgent:input.userAgent });
   
}

export async function findSessionQuery(query:Object) {
   
    const session=await Session.findOne(query);
   
    return session;
}