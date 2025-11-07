
        // File upload handling
        const fileInput = document.getElementById('fileInput');
        const uploadZone = document.getElementById('uploadZone');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');

        fileInput.addEventListener('change', handleFileSelect);

        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = file.name;
                fileInfo.style.display = 'block';
                analyzeBtn.disabled = false;
            }
        }

        function clearFile() {
            fileInput.value = '';
            fileInfo.style.display = 'none';
            analyzeBtn.disabled = true;
        }

        // Drag and drop
        uploadZone.addEventListener('click', () => fileInput.click());

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.remove('dragover');
            });
        });

        uploadZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileInput.files = files;
            handleFileSelect({ target: { files: files } });
        });

        // Demo functionality
        function showDemo() {
            document.getElementById('uploadView').style.display = 'none';
            document.getElementById('loadingState').style.display = 'block';
            
            const messages = [
                "Extracting document sections...",
                "Analyzing against FDA requirements...",
                "Checking compliance standards...",
                "Generating recommendations..."
            ];
            
            let messageIndex = 0;
            let progress = 0;
            
            const interval = setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                document.getElementById('loadingMessage').textContent = messages[messageIndex];
                
                progress += 25;
                document.getElementById('progressFill').style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.getElementById('loadingState').style.display = 'none';
                        document.getElementById('resultsView').style.display = 'block';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 500);
                }
            }, 1000);
        }

        function resetDemo() {
            document.getElementById('resultsView').style.display = 'none';
            document.getElementById('uploadView').style.display = 'block';
            clearFile();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Chatbot functionality
        let chatMessages = [];
        
        function toggleChat() {
            const chatContainer = document.getElementById('chatContainer');
            const chatButton = document.getElementById('chatButton');
            
            chatContainer.classList.toggle('active');
            chatButton.classList.toggle('active');
            
            // Focus input when opening
            if (chatContainer.classList.contains('active')) {
                document.getElementById('chatInput').focus();
            }
        }

        function addMessage(text, isUser = false) {
            const messagesContainer = document.getElementById('chatMessages');
            const quickQuestions = document.getElementById('quickQuestions');
            
            // Hide quick questions after first message
            if (isUser && chatMessages.length === 0) {
                quickQuestions.style.display = 'none';
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'chat-avatar';
            avatarDiv.innerHTML = `<i class="fas fa-${isUser ? 'user' : 'robot'}"></i>`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = text;
            
            if (isUser) {
                messageDiv.appendChild(contentDiv);
                messageDiv.appendChild(avatarDiv);
            } else {
                messageDiv.appendChild(avatarDiv);
                messageDiv.appendChild(contentDiv);
            }
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            chatMessages.push({ text, isUser });
        }

        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message bot';
            typingDiv.id = 'typingIndicator';
            
            typingDiv.innerHTML = `
                <div class="chat-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function getBotResponse(userMessage) {
            // Knowledge base responses (will connect to backend later)
            const responses = {
                'main sections': {
                    response: `A <strong>510(k) submission</strong> typically includes these main sections:<br><br>
                    <ol style="margin-left: 20px; margin-bottom: 0;">
                        <li><strong>Device Description</strong> - Physical characteristics, materials, specifications</li>
                        <li><strong>Intended Use</strong> - Purpose, indications, patient population</li>
                        <li><strong>Substantial Equivalence</strong> - Comparison to predicate device</li>
                        <li><strong>Performance Testing</strong> - Bench, animal, or clinical data</li>
                        <li><strong>Biocompatibility</strong> - ISO 10993 testing results</li>
                        <li><strong>Labeling</strong> - Instructions for use, warnings</li>
                    </ol><br>
                    Each section must meet specific FDA requirements per 21 CFR 807.87.`
                },
                'substantial equivalence': {
                    response: `<strong>Substantial Equivalence (SE)</strong> means your device has:<br><br>
                    ✅ The <strong>same intended use</strong> as a legally marketed predicate device<br>
                    ✅ <strong>Same technological characteristics</strong> OR different characteristics that don't raise safety/effectiveness concerns<br><br>
                    <strong>What you need:</strong><br>
                    • Identify a legally marketed predicate (with K-number)<br>
                    • Create side-by-side comparison table<br>
                    • Show performance data demonstrating equivalence<br>
                    • Address any technological differences<br><br>
                    <em>Tip: Use FDA's 510(k) database to find similar devices!</em>`
                },
                'rejection': {
                    response: `<strong>Top reasons for 510(k) rejection:</strong><br><br>
                    🚫 <strong>Missing critical sections</strong> (32% of cases)<br>
                    • Incomplete substantial equivalence comparison<br>
                    • Missing biocompatibility data<br>
                    • Inadequate performance testing<br><br>
                    🚫 <strong>Inadequate predicate comparison</strong><br>
                    • Wrong or invalid predicate device<br>
                    • Insufficient technological comparison<br><br>
                    🚫 <strong>Regulatory non-compliance</strong><br>
                    • Not following 21 CFR 807 requirements<br>
                    • Missing references to applicable standards<br><br>
                    <strong>Pro tip:</strong> Use our AI analyzer to catch these issues before submission!`
                },
                'biocompatibility': {
                    response: `<strong>Biocompatibility Testing (ISO 10993-1):</strong><br><br>
                    <strong>Required for devices with patient contact:</strong><br>
                    • Cytotoxicity (cell toxicity)<br>
                    • Sensitization (allergic reactions)<br>
                    • Irritation or intracutaneous reactivity<br><br>
                    <strong>For prolonged contact (>24 hours), also add:</strong><br>
                    • Systemic toxicity<br>
                    • Genotoxicity<br>
                    • Implantation testing<br><br>
                    <strong>What to include in 510(k):</strong><br>
                    ✓ Biological risk assessment<br>
                    ✓ Material characterization<br>
                    ✓ Test reports from ISO 17025 accredited labs<br>
                    ✓ Justification for test selection`
                },
                'performance testing': {
                    response: `<strong>Performance Testing Requirements:</strong><br><br>
                    <strong>Bench Testing:</strong><br>
                    • Mechanical testing (durability, fatigue)<br>
                    • Shelf life/stability testing<br>
                    • Sterilization validation<br>
                    • Software verification & validation<br><br>
                    <strong>Standards to reference:</strong><br>
                    • ASTM F1980 (accelerated aging)<br>
                    • ISO 14971 (risk management)<br>
                    • ISO 13485 (quality management)<br><br>
                    <strong>Statistical requirements:</strong><br>
                    • Sample sizes with rationale<br>
                    • Mean, standard deviation, confidence intervals<br>
                    • Pass/fail criteria<br><br>
                    <em>Include actual test data, not just protocols!</em>`
                },
                'timeline': {
                    response: `<strong>510(k) Review Timeline:</strong><br><br>
                    📅 <strong>FDA Target:</strong> 90 days for standard review<br>
                    ⏱️ <strong>Reality:</strong> 3-12 months average<br><br>
                    <strong>Breakdown:</strong><br>
                    • Administrative review: 15 days<br>
                    • Substantive review: 60-90 days<br>
                    • Additional info requests: +30-60 days each<br>
                    • Final decision: 30 days after final submission<br><br>
                    <strong>Speed it up:</strong><br>
                    ✓ Submit complete documentation first time<br>
                    ✓ Respond quickly to FDA questions<br>
                    ✓ Consider Q-Submission for complex devices<br>
                    ✓ Use our AI to pre-check before submission!`
                },
                'cost': {
                    response: `<strong>510(k) Submission Costs:</strong><br><br>
                    💰 <strong>FDA User Fees (2024):</strong><br>
                    • Standard: $6,250<br>
                    • Small business: $1,563<br><br>
                    💰 <strong>Development & Testing:</strong><br>
                    • Performance testing: $20K-$100K<br>
                    • Biocompatibility: $15K-$50K<br>
                    • Clinical studies (if needed): $100K-$1M+<br><br>
                    💰 <strong>Regulatory Consultants:</strong><br>
                    • Traditional: $15K-$25K per submission<br>
                    • <strong>Our AI Tool: $499</strong> 🎉<br><br>
                    <strong>Total typical cost:</strong> $50K-$200K<br>
                    <em>Save 80% on regulatory review with our platform!</em>`
                },
                'default': {
                    response: `I can help you with:<br><br>
                    • <strong>510(k) sections</strong> and requirements<br>
                    • <strong>Substantial equivalence</strong> guidance<br>
                    • <strong>Performance testing</strong> protocols<br>
                    • <strong>Biocompatibility</strong> requirements<br>
                    • <strong>Common rejection</strong> reasons<br>
                    • <strong>Submission timeline</strong> and costs<br><br>
                    Try asking about any of these topics, or ask a specific question about your submission!`
                }
            };
            
            // Simple keyword matching (will be replaced by real AI/API)
            const lowerMessage = userMessage.toLowerCase();
            
            if (lowerMessage.includes('section') || lowerMessage.includes('what are') || lowerMessage.includes('main')) {
                return responses['main sections'].response;
            } else if (lowerMessage.includes('substantial') || lowerMessage.includes('equivalence') || lowerMessage.includes('predicate')) {
                return responses['substantial equivalence'].response;
            } else if (lowerMessage.includes('reject') || lowerMessage.includes('refus') || lowerMessage.includes('fail')) {
                return responses['rejection'].response;
            } else if (lowerMessage.includes('biocompat') || lowerMessage.includes('iso 10993')) {
                return responses['biocompatibility'].response;
            } else if (lowerMessage.includes('perform') || lowerMessage.includes('test')) {
                return responses['performance testing'].response;
            } else if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('timeline')) {
                return responses['timeline'].response;
            } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive')) {
                return responses['cost'].response;
            } else {
                return responses['default'].response;
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            addMessage(message, true);
            input.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate AI thinking (1-2 seconds)
            setTimeout(() => {
                removeTypingIndicator();
                const botResponse = getBotResponse(message);
                addMessage(botResponse, false);
            }, 1500);
            
            // Disable send button temporarily
            const sendBtn = document.getElementById('chatSendBtn');
            sendBtn.disabled = true;
            setTimeout(() => {
                sendBtn.disabled = false;
            }, 1500);
        }

        function handleChatKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function askQuestion(question) {
            document.getElementById('chatInput').value = question;
            sendMessage();
        }
  