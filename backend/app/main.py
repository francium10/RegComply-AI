# backend/app/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
from pathlib import Path
from dotenv import load_dotenv

# Import our custom services (we'll create these next)
from app.services.document_analyzer import DocumentAnalyzer
from app.services.chat_service import ChatService

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(title="RegComply AI Backend", version="1.0.0")

# Allow frontend to connect (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload folder
UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)

# Initialize services
document_analyzer = DocumentAnalyzer()
chat_service = ChatService()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "FDA Compliance AI is running!", "version": "1.0.0"}

@app.post("/api/analyze")
async def analyze_document(file: UploadFile = File(...)):
    """
    Upload and analyze a 510(k) document
    This is what your frontend will call!
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(400, "Only PDF files are supported")
    
    # Save uploaded file
    file_path = UPLOAD_FOLDER / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Analyze the document (magic happens here!)
        results = await document_analyzer.analyze(str(file_path))
        
        # Clean up
        os.remove(file_path)
        
        return results
    
    except Exception as e:
        # If something goes wrong, tell the user
        raise HTTPException(500, f"Analysis failed: {str(e)}")

@app.post("/api/chat")
async def chat(message: dict):
    """
    Chat endpoint for the chatbot
    Frontend sends: {"message": "What is substantial equivalence?"}
    """
    user_message = message.get("message", "")
    
    if not user_message:
        raise HTTPException(400, "Message is required")
    
    response = await chat_service.get_response(user_message)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)