const { GoogleGenerativeAI } = require("@google/generative-ai")

async function gemini(datas) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET)
    // console.log(data);
    const data = JSON.stringify(datas)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
    const result = await model.generateContent(`${data}, base on this data please analyze from the "status" result, make a percentage and transform into business insight and please give analytical business inside to grow up the business, and give comparison to the market condition and market price. Also The "pending" status means the customer has not yet given any feedback. what is the business insight? and tell me how to reduce the rejected orders`)
    const res = await result.response
    let resultPrompt = res.text()

    return resultPrompt
}

module.exports = gemini