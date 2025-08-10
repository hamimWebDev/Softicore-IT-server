import OpenAI from 'openai';
import { Request, Response } from 'express';
import config from '../../config';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openai_api_key,
  defaultHeaders: {
    Referer: 'https://softicoreit.com/',
    'X-Title': 'Softicore-IT',
    'X-Description': 'Softicore-IT is a software development company that provides software development services to businesses.',
    'X-Keywords': 'software development, software development services, software development company, software development agency, software development firm, software development team, software development services company, software development services agency, software development services firm, software development services team',
    'X-Author': 'Softicore-IT', 
    'X-Copyright': 'Softicore-IT',
    'X-Robots': 'index, follow',
    'X-Googlebot': 'index, follow', 
    'X-Bingbot': 'index, follow',
    'X-Yandexbot': 'index, follow',
    'X-Baidubot': 'index, follow',
    'X-Sogoubot': 'index, follow',
    'X-Sitemap': 'https://softicoreit.com/sitemap.xml',
    'X-Language': 'en',
    'X-Country': 'BD',
    'X-Region': 'Asia',
    'X-City': 'Dhaka',
    'X-State': 'Dhaka',
    'X-Zip': '1200',
    'X-Timezone': 'Asia/Dhaka',
    'X-Currency': 'BDT',
    'X-Server': 'Softicore-IT',
    'X-Server-Software': 'Softicore-IT',
    'X-Server-Software-Version': '1.0.0',
    'X-Server-Software-Vendor': 'Softicore-IT',
    'X-Server-Software-Vendor-URL': 'https://softicoreit.com/',
    'X-Server-Software-Vendor-Email': 'info@softicoreit.com',
    'X-Server-Software-Vendor-Phone': '+8801717171717',
    'X-Server-Software-Vendor-Address': 'Dhaka, Bangladesh',
    'X-Server-Software-Vendor-City': 'Dhaka',
    'X-Server-Software-Vendor-State': 'Dhaka',
    'X-Server-Software-Vendor-Zip': '1200',
    'X-Server-Software-Vendor-Timezone': 'Asia/Dhaka',
    'X-Server-Software-Vendor-Currency': 'BDT',
    'X-Server-Software-Vendor-Language': 'en',
  },
});

export const chatWithBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, model } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages (array) is required' });
      return;
    }
    const completion = await openai.chat.completions.create({
      model: model || 'openai/gpt-4o-mini',
      messages,
    });
    res.json({ message: completion.choices[0].message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'OpenAI API error' });
  }
};



