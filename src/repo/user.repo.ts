import _ from "lodash";
import User, { UserDocument } from "../model/user.model";
export async function createUserQuery(userdata: {
    email: string;
    name: string;                                                                           
    phone: number;
    password: string;
    role: string;
}) {
    try {
        return await User.create(userdata);
    } catch (error) {
        
        throw new Error((error as Error).message);
    }

}

export async function findUserQuery(query: Object) {
    try {
        const user=await User.findOne(query);
        return user;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function validatePasswordQuery(input:{user:UserDocument, password:string}) {
    return await input.user.comparePassword(input.password);
}

