import otpGenrator from 'otp-generator';
import _ from "lodash";
import { createUserQuery, findUserQuery, validatePasswordQuery } from '../repo/user.repo';
export async function createUser(input: { name: string, roll: number, phone: number }) {
    const otp = otpGenrator.generate(10, { specialChars: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, digits: true });
    const userdata = {
        email: `${input.roll}@iiitu.ac.in`,
        name: input.name,
        phone: input.phone,
        password: otp,
        role: "user"
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