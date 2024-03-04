import openAI, { OpenAI } from 'openai';
import { OPENAIKEY } from './constants';

const openai = new OpenAI({
    apiKey: OPENAIKEY,
    dangerouslyAllowBrowser: true
})
export default openai;