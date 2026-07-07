require('dotenv').config();
const axios = require('axios');

class MIMOClient {
  constructor() {
    this.baseURL = process.env.MIMO_API_BASE_URL || 'https://token-plan-cn.xiaomimimo.com/v1';
    this.apiKey = process.env.MIMO_API_KEY;
    this.modelName = process.env.MIMO_MODEL_NAME || 'mimo-v2.5';
    
    if (!this.apiKey) {
      throw new Error('MIMO_API_KEY is not set in environment variables');
    }
  }

  async generateText(prompt, options = {}) {
    const {
      maxTokens = 2048,
      temperature = 0.7,
      topP = 0.9,
      presencePenalty = 0,
      frequencyPenalty = 0
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.modelName,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: topP,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('Invalid response format from MIMO API');
      }
    } catch (error) {
      console.error('MIMO API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async chat(messages, options = {}) {
    const {
      maxTokens = 2048,
      temperature = 0.7,
      topP = 0.9,
      presencePenalty = 0,
      frequencyPenalty = 0
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.modelName,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: topP,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message;
      } else {
        throw new Error('Invalid response format from MIMO API');
      }
    } catch (error) {
      console.error('MIMO API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async generateEmbedding(text) {
    try {
      const response = await axios.post(
        `${this.baseURL}/embeddings`,
        {
          model: 'text-embedding-ada-002',
          input: text
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data.data[0].embedding;
      } else {
        throw new Error('Invalid response format from MIMO API');
      }
    } catch (error) {
      console.error('MIMO Embedding API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  getStatus() {
    return {
      model: this.modelName,
      baseURL: this.baseURL,
      apiKeyConfigured: !!this.apiKey,
      apiKeyMasked: this.apiKey ? `${this.apiKey.slice(0, 8)}...${this.apiKey.slice(-8)}` : null
    };
  }
}

module.exports = MIMOClient;

async function testConnection() {
  try {
    const client = new MIMOClient();
    console.log('MIMO-V2.5-PRO 连接状态:', client.getStatus());
    
    const response = await client.generateText('你好，请介绍一下自己');
    console.log('测试响应:', response);
    return { success: true, message: response };
  } catch (error) {
    console.error('连接测试失败:', error.message);
    return { success: false, error: error.message };
  }
}

if (require.main === module) {
  testConnection();
}
