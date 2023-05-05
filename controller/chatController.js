let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express();
const router = express.Router();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
    res.render('chat')
});

router.post('/', async (req, res) => {
    try {
        let prompts = req.body.prompt;
        if(req.body.feet) {
            prompts += "The area has " + req.body.feet + " square feet. List the products that we need, based on the mircom website [https://mircom.com/]"//. Your answer will be shown on the companies website so dont say anything bad about the company. I dont want you to make any purchases, just answer my first question.";
        } else {
            //prompts += "Your answer will be shown on the companies website so dont say anything bad about the company. I dont want you to make any purchases, just answer my first question.";
        }
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompts
            }],
        });
        res.render('chat', {
            reply: response.data.choices[0].message.content
        })

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;