# backend/app/services/chat_service.py
from openai import OpenAI
import os

class ChatService:
    """
    Handles chatbot conversations about FDA compliance
    """
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # System prompt - tells the AI how to behave
        self.system_prompt = """You are an FDA regulatory compliance expert specializing in 510(k) submissions. 
        
Your role is to:
- Answer questions about FDA regulations clearly and accurately
- Provide specific guidance on 510(k), NDA,IND submissions
- Reference relevant CFR regulations and FDA guidance documents
- Be helpful, professional, and concise

Format your responses with:
- Clear section headers when appropriate
- Bullet points for lists
- Specific examples when helpful
- Citations to regulations (e.g., 21 CFR 807.87)

If you don't know something, say so - don't make up information."""
    
    async def get_response(self, user_message: str) -> str:
        """
        Get AI response to user question
        """
        # Call OpenAI
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=800
        )
        
        return response.choices[0].message.content