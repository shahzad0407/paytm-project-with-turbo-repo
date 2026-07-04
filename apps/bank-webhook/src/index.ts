import { prisma } from "@repo/db";
import express from "express";
const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    await prisma.balance.update({
        where:{
            userId: paymentInformation.userId
        },
        data:{
            amount : {
            increment: paymentInformation.amount
        }
        }
    })
    await prisma.onRampTransaction.update({
        where:{
            token : paymentInformation.token
        },
        data:{
            status : "Success"
        }
    })
    
})