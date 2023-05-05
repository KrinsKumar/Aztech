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

const products = [
    {
        category: "Fire Alarm Control",
        productName: "FX-401B"
    },
    {
        category: "Fire Alarm Control",
        productName: "FX-401R"
    },
    {
        category: "Remote Annunciator",
        productName: "RAX-LCD-LITE"
    },
    {
        category: "Remote Annunciator",
        productName: "RAM-1032TZDS"
    },
    {
        category: "Remote Annunciator",
        productName: "RAM-1032TZDS-CC"
    },
    {
        category: "Remote Annunciator",
        productName: "RAX-1048TZDS"
    },
    {
        category: "Remote Annunciator",
        productName: "RAX-1048TZDS-CC"
    },
    {
        category: "Remote Programming",
        productName: "UIMA4"
    },
    {
        category: "Remote Programming",
        productName: "MGC-CONFIG-KIT4"
    },
    {
        category: "Loop Adder",
        productName: "ALC-480"
    },
    {
        category: "Loop Adder",
        productName: "PR-300"
    },
    {   category: "Loop Adder",
        productName: "AGD-048"
    },
    {
        category: "Loop Adder",
        productName: "MGD-32"
    },
    {
        category: "Loop Adder",
        productName: "SRM-312"
    },
    {
        category: "Remote Annunciator",
        productName: "BB-1001DR"
    },
    {
        category: "Remote Annunciator",
        productName: "BB-1001WPRA"
    },
    {
        category: "Remote Annunciator",
        productName: "BB-1002DR"
    },
    {
        category: "Remote Annunciator",
        productName: "BB-1002WPRA"
    },
    {
        category: "Detectors",
        productName: "MIX-4010"
    },
    {
        category: "Detectors",
        productName: "MIX-4010-ISO"
    }
  ]




/****************** FUNCTIONS **************************************/
const getAllProductsByName = function (val) {
    return new Promise((resolve, reject) => {
        productModel.find({ productName: val }).lean()
            .exec()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const extractNumberedItems = function(text) {
    const regex = /(\d+)\.\s*(.*?)\s* - \s*/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const number = match[1];
      const text = match[2].trim();
      matches.push({ text });
    }
    return matches;
  }


/****************** ROUTES **************************************/
router.get("/", (req, res) => {
    res.render('chat');
});

router.post('/', async (req, res) => {
    try {
        let prompts = "From Mircom website, I need a list of products. I will give you a senario and you have to answer in the following format for each listed '1. Category of product - Explanation'. Here is the senario:";
        prompts += req.body.prompt;
        if(req.body.feet) {
            prompts += "The area of the space has " + req.body.feet + " square feet." + "Your answer will be shown on the companies website so dont say anything bad about the company.";
        } else {
            prompts += "Your answer will be shown on the companies website so dont say anything bad about the company.";
        }
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompts
            }],
        });

        const validCategories = extractNumberedItems(response.data.choices[0].message.content);
        
        const filteredProducts = products.filter((product) => {
            var flag = true;
            for (k = 0; k < validCategories.length && flag; k++) {
                var words1 = product.category.split(/\s+/g),
                words2 = validCategories[k].text.split(/\s+/g),
                i,
                j;
            
                for (i = 0; i < words1.length && flag; i++) {
                    for (j = 0; j < words2.length && flag; j++) {
                        if (words1[i].toLowerCase() == words2[j].toLowerCase()) {
                            flag = false;
                        }
                    }
                }
            };
            return !flag;
        });
        console.log(filteredProducts.length);
        console.log(filteredProducts);
        res.render('chat', {
            reply: response.data.choices[0].message.content,
            products: filteredProducts
        })

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;