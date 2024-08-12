const { GoogleGenerativeAI } = require("@google/generative-ai")

async function gemini(datas) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET)
    // console.log(data);
    const data = JSON.stringify(datas)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
    const result = await model.generateContent(`${data}, base on this data please analayze and tell me how to reduce the rejected orders`)
    const res = await result.response
    let resultPrompt = res.text()

    return resultPrompt
}

module.exports = gemini