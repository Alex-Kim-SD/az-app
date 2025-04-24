import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { RequestLog } from '../models/RequestLog';
import { ChatCompletionCreateParams } from 'openai/resources/chat';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askGPT = async (req: Request, res: Response) => {
  const { question } = req.body;

  const openAiPayload: ChatCompletionCreateParams = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    max_tokens: 500,
  };

  let log = await RequestLog.create({
    endpoint: '/openai',
    model: openAiPayload.model,
    request: openAiPayload,
  });

  try {
    const response = await openai.chat.completions.create(openAiPayload);

    log.response = response.choices[0].message;
    log.status = 200;
    await log.save();

    res.json({ response: response.choices[0].message });
  } catch (err: any) {
    console.error('❌ OpenAI Error:', err.response?.data || err.message || err);

    log.response = err.response?.data || err.message;
    log.status = 500;
    await log.save();

    res.status(500).json({
      error: 'OpenAI request failed',
      details: err.response?.data || err.message,
    });
  }
};
