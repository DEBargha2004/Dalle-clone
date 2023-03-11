import { OpenAIApi,Configuration } from "openai";
import * as dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.apiKey
})

const openai = new OpenAIApi(configuration)

export default openai;
