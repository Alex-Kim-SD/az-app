import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askGPT = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 500,
    });

    res.json({ response: response.choices[0].message });
  } catch (err: any) {
    console.error('❌ OpenAI Error:', err.response?.data || err.message || err);
    res.status(500).json({
      error: 'OpenAI request failed',
      details: err.response?.data || err.message || err
    });
  }
  
};
