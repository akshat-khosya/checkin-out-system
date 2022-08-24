import otpGenrator from 'otp-generator';
import _ from "lodash";
import { createUserQuery, findUserQuery, validatePasswordQuery } from '../repo/user.repo';
import { UserDocument } from '../model/user.model';
export async function createUser(input: { name: string, roll: number, phone: number,hostelName:string,roomNo:number }) {
    const otp = otpGenrator.generate(10, { specialChars: false, lowerCaseAlphabets: true, upperCaseAlphabets: true, digits: true });
    const userdata = {
        email: `${input.roll}@iiitu.ac.in`,
        name: input.name,
        phone: input.phone,
        password: otp,
        role: "user",
        roomNo:input.roomNo,
        hostelName:input.hostelName
    };
    return await { user: createUserQuery(userdata), otp: otp };

}
export async function validatePassword({
    email, password,
}: {
    email: string;
    password: string;
}) {
    const user = await findUserQuery({email});
    if (!user) {
        return false;
    }
    const isValid = await validatePasswordQuery({ user, password });
    if (!isValid) {
        return false;
    }
    return _.omit(user, "password");

}

export async function fetchUserProfile(userId:UserDocument["_id"]){
    const user=await findUserQuery({_id:userId});
    if(user){
        return user;
    }
    return false;
    
}