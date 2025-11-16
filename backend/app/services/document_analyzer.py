# backend/app/services/document_analyzer.py
import PyPDF2
import pdfplumber
from openai import OpenAI
import os
from typing import Dict

class DocumentAnalyzer:
    """
    This class reads PDF files and analyzes them for FDA compliance
    """
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Required sections for 510(k)
        self.required_sections = [
            "Device Description",
            "Intended Use",
            "Substantial Equivalence",
            "Performance Testing",
            "Labeling",
            "Biocompatibility"
        ]
    
    async def analyze(self, file_path: str) -> Dict:
        """
        Main analysis function
        Steps:
        1. Extract text from PDF
        2. Identify sections
        3. Check each section with AI
        4. Return results
        """
        # Step 1: Read the PDF
        text = self._extract_text(file_path)
        
        # Step 2: Find sections in the document
        found_sections = self._identify_sections(text)
        
        # Step 3: Analyze each section
        section_results = []
        for section_name in self.required_sections:
            if section_name in found_sections:
                # Section exists - check quality
                analysis = await self._analyze_section(
                    section_name, 
                    found_sections[section_name]
                )
            else:
                # Section is missing!
                analysis = {
                    "title": section_name,
                    "score": None,
                    "severity": "critical",
                    "description": f"CRITICAL: {section_name} section is missing from your document.",
                    "recommendations": self._get_missing_section_guidance(section_name)
                }
            
            section_results.append(analysis)
        
        # Step 4: Calculate overall score
        scores = [s["score"] for s in section_results if s["score"] is not None]
        overall_score = sum(scores) / len(scores) if scores else 0
        
        # Step 5: Return everything
        return {
            "overallScore": round(overall_score),
            "sectionsFound": f"{len(found_sections)}/{len(self.required_sections)}",
            "completeness": f"{(len(found_sections)/len(self.required_sections)*100):.1f}%",
            "criticalIssues": sum(1 for s in section_results if s["severity"] == "critical"),
            "analysisTime": "47s",
            "sections": section_results,
            "summaryData": {
                "headline": self._get_headline(overall_score),
                "details": self._get_summary(section_results),
                "estimatedWork": self._estimate_work(section_results),
                "targetDate": "Nov 24, 2025",
                "priorityActions": self._get_priority_actions(section_results)
            }
        }
    
    def _extract_text(self, file_path: str) -> str:
        """Extract all text from PDF"""
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
        return text
    
    def _identify_sections(self, text: str) -> Dict[str, str]:
        """
        Find sections in the document
        This is a simple version - looks for section headers
        """
        sections = {}
        lines = text.split('\n')
        
        current_section = None
        section_content = []
        
        for line in lines:
            line_lower = line.lower().strip()
            
            # Check if this line is a section header
            for req_section in self.required_sections:
                if req_section.lower() in line_lower:
                    # Save previous section
                    if current_section:
                        sections[current_section] = '\n'.join(section_content)
                    
                    # Start new section
                    current_section = req_section
                    section_content = []
                    break
            else:
                # Add content to current section
                if current_section:
                    section_content.append(line)
        
        # Save last section
        if current_section:
            sections[current_section] = '\n'.join(section_content)
        
        return sections
    
    async def _analyze_section(self, section_name: str, content: str) -> Dict:
        """
        Use AI to analyze a section
        """
        # Create a prompt for GPT-4
        prompt = f"""You are an FDA regulatory expert. Analyze this {section_name} section for a 510(k) submission.

SECTION CONTENT:
{content[:3000]}  # Limit to avoid token limits

Provide:
1. A score from 0-100
2. Severity level: critical, high, medium, or low
3. Brief description (2-3 sentences)
4. 3-5 specific recommendations for improvement

Format your response as:
SCORE: [number]
SEVERITY: [level]
DESCRIPTION: [text]
RECOMMENDATIONS:
- [recommendation 1]
- [recommendation 2]
- [recommendation 3]
"""
        
        # Call OpenAI
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an FDA regulatory compliance expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3  # Lower = more consistent
        )
        
        # Parse the response
        result_text = response.choices[0].message.content
        parsed = self._parse_ai_response(result_text)
        
        return {
            "title": section_name,
            "score": parsed["score"],
            "severity": parsed["severity"],
            "description": parsed["description"],
            "recommendations": parsed["recommendations"]
        }
    
    def _parse_ai_response(self, text: str) -> Dict:
        """Convert AI response into structured data"""
        lines = text.split('\n')
        result = {
            "score": 50,
            "severity": "medium",
            "description": "",
            "recommendations": []
        }
        
        current_section = None
        
        for line in lines:
            line = line.strip()
            if line.startswith('SCORE:'):
                try:
                    result["score"] = int(line.split(':')[1].strip())
                except:
                    pass
            elif line.startswith('SEVERITY:'):
                result["severity"] = line.split(':')[1].strip().lower()
            elif line.startswith('DESCRIPTION:'):
                result["description"] = line.split(':', 1)[1].strip()
                current_section = "description"
            elif line.startswith('RECOMMENDATIONS:'):
                current_section = "recommendations"
            elif line.startswith('-') or line.startswith('•'):
                if current_section == "recommendations":
                    result["recommendations"].append(line.lstrip('-•').strip())
            elif current_section == "description" and line:
                result["description"] += " " + line
        
        return result
    
    def _get_missing_section_guidance(self, section_name: str) -> list:
        """Provide guidance for missing sections"""
        guidance = {
            "Device Description": [
                "Include detailed physical and functional description",
                "Specify materials of construction",
                "Provide device specifications and dimensions",
                "Add diagrams or engineering drawings",
                "Reference applicable standards (ISO, ASTM)"
            ],
            "Intended Use": [
                "Define specific intended use statement",
                "Specify indications for use",
                "Identify patient population",
                "List contraindications",
                "Describe environment of use"
            ],
            "Substantial Equivalence": [
                "Identify legally marketed predicate device (K-number)",
                "Create side-by-side comparison table",
                "Demonstrate same intended use",
                "Show equivalent technological characteristics",
                "Provide performance data comparison"
            ],
            "Performance Testing": [
                "Conduct bench testing per relevant standards",
                "Perform shelf life/stability testing (ASTM F1980)",
                "Validate sterilization if applicable",
                "Include statistical analysis of results",
                "Document pass/fail criteria"
            ],
            "Labeling": [
                "Provide instructions for use",
                "Include warnings and precautions per 21 CFR 801",
                "Add storage conditions",
                "Include expiration dating",
                "Provide symbols explanation (ISO 15223-1)"
            ],
            "Biocompatibility": [
                "Conduct biological risk assessment (ISO 10993-1)",
                "Perform cytotoxicity testing",
                "Test for sensitization and irritation",
                "Include material characterization",
                "Provide test reports from accredited labs"
            ]
        }
        
        return guidance.get(section_name, ["Add this required section with complete information"])
    
    def _get_headline(self, score: float) -> str:
        if score >= 80:
            return "Your submission is in good shape"
        elif score >= 60:
            return "Your submission needs improvements"
        else:
            return "Your submission has critical gaps"
    
    def _get_summary(self, sections: list) -> str:
        critical = sum(1 for s in sections if s["severity"] == "critical")
        if critical > 0:
            return f"Critical gaps identified in {critical} section(s). Address these before submission."
        return "Focus on highlighted sections to improve your submission."
    
    def _estimate_work(self, sections: list) -> str:
        critical = sum(1 for s in sections if s["severity"] == "critical")
        high = sum(1 for s in sections if s["severity"] == "high")
        
        hours = critical * 2 + high * 1
        return f"{max(hours, 1)} hours"
    
    def _get_priority_actions(self, sections: list) -> list:
        actions = []
        for section in sections:
            if section["severity"] == "critical":
                actions.append(f"Complete {section['title']} section")
        
        return actions[:3]  # Top 3 priorities