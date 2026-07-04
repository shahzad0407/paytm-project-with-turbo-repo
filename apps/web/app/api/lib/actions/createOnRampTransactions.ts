"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

export async function createOnRampTransactions(amount:number, provider:string) {
    const session = await getServerSession(authOptions)
    if(!session){
        return {
            message : "User not logged in"
        }
    }
    const token = Math.random().toString()
    await prisma.onRampTransaction.create({
        data:{
            provider,
            amount,
            userId:Number(session.user.id),
            status:"Processing",
            startTime: new Date(),
            token
        }
    })
    return {
        messsage : "On Ramp Transaction captured"
    }
}