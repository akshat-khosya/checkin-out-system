import { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import {
    findAndDeleteSessionQuery,
    findSessionQuery,
    sessionCreateQuery,
    deleteSessionQuery,
} from "../repo/session.repo";
import { decode, sign } from "../utils/jwt.utils";
import config from "config";
import { LeanDocument } from "mongoose";
import { findUserQuery } from "../repo/user.repo";
import log from "../logger";
import _ from "lodash";
export async function createSession(input: {
    userId: string;
    userAgent: string;
}) {
    const sessionCheck = await findAndDeleteSessionQuery({
        userId: input.userId,
    });

    const session = await sessionCreateQuery(input);

    return session;
}

export function createAccessToken(
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>,
    session: SessionDocument
): string {
    const accessToken = sign(
        { user: user.id, sessionId: session.id },
        { expiresIn: config.get("accessTokenTtl") as string }
    );
    return accessToken;
}

export function createRefreshToken(session: SessionDocument): string {
    const refreshToken = sign(
        { session: session.id },
        { expiresIn: config.get("refreshTokenTtl") as string }
    );
    return refreshToken;
}

export async function sessionValidation(
    decoded: {
        user: UserDocument["_id"];
        sessionId: SessionDocument["_id"];
    },
    userAgent: string
) {
    const session = await findSessionQuery({ _id: decoded.sessionId });
    if (!session) {
        return false;
    }
    if (session.userAgent !== userAgent) {
        return false;
    }
    const user = await findUserQuery({ _id: decoded.user });
    return _.omit(user, "password");
}

export async function recreateAccessToken(refreshToken: string,userAgent:string) {
    const output = decode(refreshToken);
   
    if (output.decoded) {
        const session = await findSessionQuery({ _id: output.decoded.session });

        if (!session) {
            return false;
        }
        if(session.userAgent!==userAgent){
            return false;
        }
        const user = await findUserQuery({ _id: session.userId });
        if (!user) return false;

        const accessToken = createAccessToken(_.omit(user, "password"), session);
        return {accessToken:accessToken,user:_.omit(user, "password")};
    }
    return false;
}

export const deleteSession = async (userId: UserDocument["_id"]) => {
    return deleteSessionQuery({ userId: userId });
};
