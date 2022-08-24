import superset from "supertest";
import createServer from "../utils/server";
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose";
import { createUser } from "../service/user.service";


export const userPayload = {
    name:"Akshat Khoysa",
    roll:20106,
    phone:9416908474,
    hostelName:"Bhutagni",
    roomNo:306
}

const app=createServer();
describe('user',()=>{
    beforeAll(async ()=>{
        const mongoServer=await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    })
    afterAll(async ()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get user profile route',()=>{
        describe('give the user profile does not exits',()=>{
            it(' should return 403 ',async ()=>{
                await superset(app).get('/api/user/profile').expect(403);
            })
        })
    })

    describe('get user profile route',()=>{
        describe('give the user profile does exits',()=>{
            it(' should return 403 ',async ()=>{
                const {user,otp}=await createUser(userPayload);
                
                const {body,statusCode } = await superset(app).get('/api/user/profile').expect(403);
            })
        })
    })

    describe('create user route',()=>{
        
    })
})

