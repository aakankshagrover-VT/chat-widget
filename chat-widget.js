(function () {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = `assets/css/styles.css`;
  document.head.appendChild(styleLink);
  const stylesheetLink = document.createElement("link");
  stylesheetLink.rel = "stylesheet";
  stylesheetLink.href = `assets/fonts/stylesheet.css`;
  document.head.appendChild(stylesheetLink);

  // Add marked.js for markdown parsing
  const markedScript = document.createElement("script");
  markedScript.src = "https://cdn.jsdelivr.net/npm/marked@5.1.1/marked.min.js";
  document.head.appendChild(markedScript);

  // Add loader styles
  const loaderStyles = document.createElement("style");
  loaderStyles.textContent = `
    .chat-loader-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      border-radius: 12px;
    }
    
    .chat-loader-content {
      text-align: center;
      color: #333;
    }
    
    .chat-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 12px auto;
    }
    
    .chat-loader-message {
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Feedback Modal Styles */
    .chat-feedback-modal {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      border-radius: 12px;
    }
    
    .chat-feedback-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 12px;
    }
    
    .chat-feedback-content {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      position: relative;
      z-index: 1002;
      text-align: center;
      max-width: 320px;
      width: 90%;
    }
    
    .chat-feedback-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }
    
    .chat-feedback-message {
      font-size: 14px;
      color: #666;
      margin-bottom: 24px;
      line-height: 1.4;
    }
    
         .chat-feedback-buttons {
       display: flex;
       gap: 12px;
       justify-content: center;
     }
    
         .chat-feedback-btn {
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 16px;
       border: 2px solid #e0e0e0;
       border-radius: 12px;
       background: white;
       cursor: pointer;
       transition: all 0.2s ease;
       width: 60px;
       height: 60px;
     }
    
    .chat-feedback-btn:hover {
      border-color: #007bff;
      background: #f8f9ff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
    }
    
    .chat-feedback-btn.like-btn:hover {
      border-color: #28a745;
      background: #f8fff9;
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    }
    
         .chat-feedback-btn.dislike-btn:hover {
       border-color: #dc3545;
       background: #fff5f5;
       box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
     }
    
    /* Markdown content styles */
    .message-content h1,
    .message-content h2,
    .message-content h3,
    .message-content h4,
    .message-content h5,
    .message-content h6 {
      margin: 8px 0 4px 0;
      font-weight: 600;
      line-height: 1.3;
    }
    
    .message-content h1 { font-size: 1.4em; }
    .message-content h2 { font-size: 1.3em; }
    .message-content h3 { font-size: 1.2em; }
    .message-content h4 { font-size: 1.1em; }
    .message-content h5 { font-size: 1.05em; }
    .message-content h6 { font-size: 1em; }
    
    .message-content p {
      margin: 6px 0;
      line-height: 1.5;
    }
    
    .message-content pre {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
      margin: 8px 0;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .message-content code {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 2px 4px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    
    .message-content pre code {
      background: none;
      border: none;
      padding: 0;
    }
    
    .message-content ul,
    .message-content ol {
      margin: 8px 0;
      padding-left: 20px;
    }
    
    .message-content li {
      margin: 2px 0;
      line-height: 1.5;
    }
    
    .message-content blockquote {
      border-left: 4px solid #ddd;
      margin: 8px 0;
      padding: 4px 0 4px 12px;
      background: #f9f9f9;
      font-style: italic;
    }
    
    .message-content a {
      color: #007bff;
      text-decoration: none;
    }
    
    .message-content a:hover {
      text-decoration: underline;
    }
    
    .message-content table {
      border-collapse: collapse;
      margin: 8px 0;
      width: 100%;
      font-size: 14px;
    }
    
    .message-content th,
    .message-content td {
      border: 1px solid #ddd;
      padding: 6px 8px;
      text-align: left;
    }
    
    .message-content th {
      background: #f5f5f5;
      font-weight: 600;
    }
    
    .message-content strong {
      font-weight: 600;
    }
    
    .message-content em {
      font-style: italic;
    }
    
    .message-content hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 12px 0;
    }
  `;
  document.head.appendChild(loaderStyles);
  let chatPopup = null;
  let isOpen = false;
  let isMaximized = false;
  let chatMessages, chatInput, sendBtn;
  let threadId = null; // Store the thread ID from API
  let isMarkedLoaded = false;

  // Wait for marked library to load
  function waitForMarked() {
    return new Promise((resolve) => {
      if (typeof marked !== "undefined") {
        isMarkedLoaded = true;
        resolve();
      } else {
        const checkMarked = setInterval(() => {
          if (typeof marked !== "undefined") {
            isMarkedLoaded = true;
            clearInterval(checkMarked);
            resolve();
          }
        }, 100);
      }
    });
  }

  // Parse markdown content to HTML
  function parseMarkdown(content) {
    if (!isMarkedLoaded || typeof marked === "undefined") {
      return content; // Fallback to plain text if marked is not loaded
    }

    try {
      // Configure marked options for security and better rendering
      marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false, // We trust the content from our API
        smartLists: true,
        smartypants: true,
      });
    
      // Create a custom renderer to make all links open in new tabs
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
      };

      return marked.parse(content, { renderer: renderer });
    } catch (error) {
      console.error("Error parsing markdown:", error);
      return content; // Fallback to plain text on error
    }
  }

  // Initialize marked when script loads
  waitForMarked();
  // Create chat popup window
  function createChatPopup() {
    if (chatPopup) return chatPopup;
    chatPopup = document.createElement("div");
    chatPopup.className = "chat-popup";
    chatPopup.id = "chatPopup";
    chatPopup.innerHTML = `
      <div class="chatbot-container">
        <div class="chat-header">
          <div class="chat-title">
            <img
              src="assets/images/speech-bubble.png"
              alt="Logo"
              width="24"
              height="24"
            />
            New Chat
          </div>
          <div class="header-actions">
            <button class="header-btn" id="maximizeBtn" onclick="toggleMaximize()">
              <img
                id="maximizeIcon"
                src="assets/images/Enlarge.svg"
                alt="Maximize"
                width="24"
                height="24"
              />
            </button>
            <button class="header-btn" onclick="closeChat()">Ã—</button>
          </div>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="welcome-message">
            <div class="bot-avatar">
              <img
                src="assets/images/Logo.svg"
                alt="Bot Avatar"
                width="66"
                height="66"
              />
            </div>
            <span class="bot-message">What are you working on?</span>
          </div>
        </div>
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <div class="chat-input-wrapper-inner">
              <input
                type="text"
                class="chat-input"
                id="chatInput"
                placeholder="Ask questions"
                onkeypress="handleKeyPress(event)"
              />
            </div>
            <div class="send-btn-container">
              <button class="send-btn" id="sendBtn" onclick="sendMessage()">
                <img
                  src="assets/images/send.svg"
                  alt="Send"
                  width="30"
                  height="30"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(chatPopup);
    return chatPopup;
  }

  // Function to show loading indicator
  function showLoader(message = "Loading...") {
    // Remove existing loader if any
    hideLoader();

    const loader = document.createElement("div");
    loader.id = "chatLoader";
    loader.className = "chat-loader-overlay";
    loader.innerHTML = `
      <div class="chat-loader-content">
        <div class="chat-spinner"></div>
        <div class="chat-loader-message">${message}</div>
      </div>
    `;

    if (chatPopup) {
      chatPopup.appendChild(loader);
    }
  }

  // Function to hide loading indicator
  function hideLoader() {
    const loader = document.getElementById("chatLoader");
    if (loader) {
      loader.remove();
    }
  }

  // Function to create a new thread
  async function createThread() {
    try {
      // Show loader
      showLoader("Starting new chat...");

      // Get auth token from session storage
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        hideLoader();
        console.error("No auth token found in session storage");
        return;
      }

      const response = await fetch(`${BASE_API_URL}/chat/create_thread`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.thread_id) {
        threadId = data.thread_id;
        console.log("Thread created successfully:", threadId);

        // Update chat title to include thread ID
        const chatTitle = document.querySelector(".chat-title");
        if (chatTitle) {
          chatTitle.innerHTML = `
            <img
              src="assets/images/speech-bubble.png"
              alt="Logo"
              width="24"
              height="24"
            />
            New Chat (Thread: ${threadId})
          `;
        }

        // Load prompt suggestions after thread creation (only if none exist)
        const existingSuggestions = chatMessages ? chatMessages.querySelector(".prompt-suggestions") : null;
        if (!existingSuggestions) {
          await loadPromptSuggestions();
        }
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      // Always hide loader with a small delay to ensure visibility
      setTimeout(() => {
        hideLoader();
      }, 500);
    }
  }

  // Function to load and display prompt suggestions
  async function loadPromptSuggestions() {
    try {
      const authToken = sessionStorage.getItem("authToken");
      
      if (!authToken) {
        console.error("No auth token found for loading suggestions");
        return;
      }

      const response = await fetch(`${BASE_API_URL}/prompts/suggestions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context:window.location.pathname
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.suggestions && data.suggestions.length > 0) {
        displayPromptSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Error loading prompt suggestions:", error);
    }
  }

  // Function to display prompt suggestions in chat
  function displayPromptSuggestions(suggestions) {
    // Check if suggestions already exist to prevent duplicates
    const existingSuggestions = chatMessages.querySelector(".prompt-suggestions");
    if (existingSuggestions) {
      return; // Don't add if already exists
    }

    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.className = "prompt-suggestions";
    suggestionsContainer.innerHTML = `
      <div class="suggestions-list">
        ${suggestions.map(suggestion => `
          <button class="suggestion-btn" onclick="sendSuggestion('${suggestion.replace(/'/g, "\\'")}')">
            ${suggestion}
          </button>
        `).join('')}
      </div>
    `;
    
    chatMessages.appendChild(suggestionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to send query to chat API
  async function sendQueryToAPI(query) {
    try {
      // Get auth token from session storage
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        console.error("No auth token found in session storage");
        return "Sorry, authentication is required to send messages.";
      }

      if (!threadId) {
        console.error("No thread ID available");
        return "Sorry, there was an error with the chat session.";
      }

      const response = await fetch(`${BASE_API_URL}/chat/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: threadId,
          query: query,
          context: window.location.pathname
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message || "Sorry, I could not process your request.";
    } catch (error) {
      console.error("Error sending query:", error);
      return "Sorry, there was an error processing your message.";
    }
  }

  // Function to end the current thread
  async function endThread() {
    try {
      // Get auth token from session storage
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        hideLoader();
        console.error("No auth token found in session storage");
        return;
      }

      if (!threadId) {
        hideLoader();
        console.log("No thread ID available to end");
        return;
      }

      const response = await fetch(`${BASE_API_URL}/chat/end_thread`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: threadId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Thread ended successfully:", data.message);
    } catch (error) {
      console.error("Error ending thread:", error);
    }
  }

  // Global variables and functions
  window.openChat = async function () {
    if (!chatPopup) {
      createChatPopup();
    }

    // Always initialize/reinitialize elements when opening chat
    chatMessages = document.getElementById("chatMessages");
    chatInput = document.getElementById("chatInput");
    sendBtn = document.getElementById("sendBtn");

    chatPopup.classList.add("active");
    isOpen = true;

    // Create a new thread when chat opens (only if we don't have one)
    if (!threadId) {
      await createThread();
    }

    // Focus on input when chat opens
    setTimeout(() => {
      if (chatInput) {
        chatInput.focus();
      }
    }, 300);
  };
  window.closeChat = function () {
    showCloseConfirmation();
  };
  window.confirmCloseChat = async function () {
    // Hide the close confirmation modal first
    hideCloseConfirmation();

    // Show feedback popup instead of immediately closing
    showFeedbackPopup();
  };

  window.showFeedbackPopup = function () {
    // Create feedback modal inside the chat popup
    let feedbackModal = document.getElementById("feedbackModal");
    if (!feedbackModal) {
      feedbackModal = document.createElement("div");
      feedbackModal.id = "feedbackModal";
      feedbackModal.className = "chat-feedback-modal";
      feedbackModal.innerHTML = `
        <div class="chat-feedback-overlay"></div>
        <div class="chat-feedback-content">
          <div class="chat-feedback-title">How was your chat experience?</div>
          <div class="chat-feedback-message">
            Your feedback helps us improve our AI assistant
          </div>
                     <div class="chat-feedback-buttons">
             <button class="chat-feedback-btn like-btn" onclick="submitFeedback('like')">
               <img src="assets/images/Smiley.svg" alt="Like" width="24" height="24" />
             </button>
             <button class="chat-feedback-btn dislike-btn" onclick="submitFeedback('dislike')">
               <img src="assets/images/Smiley Sad.svg" alt="Dislike" width="24" height="24" />
             </button>
           </div>
        </div>
      `;
      // Append to chat popup
      chatPopup.appendChild(feedbackModal);
    }
    feedbackModal.style.display = "flex";
  };

  window.hideFeedbackPopup = function () {
    const feedbackModal = document.getElementById("feedbackModal");
    if (feedbackModal) {
      feedbackModal.style.display = "none";
    }
  };

  window.submitFeedback = async function (feedbackType) {
    try {
      showLoader("Closing chat...");
      // Get auth token from session storage
      const authToken = sessionStorage.getItem("authToken");

      if (authToken && threadId) {
        hideFeedbackPopup();
        // First call end thread API
        await endThread();

        // Convert feedback type to rating (0 for dislike, 1 for like)
        const rating = feedbackType === "like" ? 1 : 0;

        // Call rating API after end thread completes
        const ratingResponse = await fetch(`${BASE_API_URL}/chat/rating`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            thread_id: threadId,
            rating: rating,
          }),
        });

        if (ratingResponse.ok) {
          const ratingData = await ratingResponse.json();
          console.log("Rating submitted successfully:", {
            thread_id: ratingData.thread_id,
            rating_id: ratingData.rating_id,
            rating: rating,
          });
        } else {
          console.error("Failed to submit rating:", ratingResponse.status);
        }
      }
    } catch (error) {
      console.error("Error in feedback submission process:", error);
    } finally {
      // Always hide loader with a small delay to ensure visibility
      setTimeout(async () => {
        hideLoader();
        await finalizeCloseChat();
      }, 1000);
    }
  };

  window.finalizeCloseChat = async function () {
    // Clear all messages and reset to initial state
    if (chatMessages) {
      // Remove all user and bot messages while keeping welcome message
      const messages = chatMessages.querySelectorAll(".message");
      messages.forEach((message) => message.remove());

      // Remove all prompt suggestions
      const suggestions = chatMessages.querySelectorAll(".prompt-suggestions");
      suggestions.forEach((suggestion) => suggestion.remove());

      // Show welcome message if it exists, or ensure it's visible
      const welcomeMessage = chatMessages.querySelector(".welcome-message");
      if (welcomeMessage) {
        // Reset welcome message visibility by removing inline style and hidden class
        welcomeMessage.style.removeProperty("display");
        welcomeMessage.classList.remove("hidden");
      }

      // Reset scroll position to top
      chatMessages.scrollTop = 0;
    }

    // Clear the input field and reset its state
    if (chatInput) {
      chatInput.value = "";
      chatInput.blur(); // Remove focus from input
    }

    // Remove any typing indicators that might still be visible
    hideTypingIndicator();

    // Reset all state variables to initial state
    isOpen = false;
    isMaximized = false;
    threadId = null; // Reset thread ID so a new one is created next time

    // Reset any other potential state variables
    chatMessages = null;
    chatInput = null;
    sendBtn = null;

    // Close the chat popup and reset its state
    if (chatPopup) {
      chatPopup.classList.remove("active");
      chatPopup.classList.remove("maximized");

      // Reset the maximize icon to default state
      const maximizeIcon = document.getElementById("maximizeIcon");
      if (maximizeIcon) {
        maximizeIcon.src = "assets/images/Enlarge.svg";
        maximizeIcon.alt = "Maximize";
      }

      // Remove any custom styles that might have been applied
      chatPopup.style.transition = "";
    }

    // Reset the chat title to "New Chat"
    const chatTitle = document.querySelector(".chat-title");
    if (chatTitle) {
      chatTitle.innerHTML = `
        <img
          src="assets/images/speech-bubble.png"
          alt="Logo"
          width="24"
          height="24"
        />
        New Chat
      `;
    }
  };
  window.toggleMaximize = function () {
    if (!chatPopup) return;
    const maximizeIcon = document.getElementById("maximizeIcon");
    if (isMaximized) {
      // Minimize - update transition for smoother minimizing
      // chatPopup.style.transition =
      //   "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      chatPopup.classList.remove("maximized");
      isMaximized = false;
    } else {
      // Maximize - use longer transition for expanding
      // chatPopup.style.transition =
      //   "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      chatPopup.classList.add("maximized");
      isMaximized = true;
    }
  };
  window.showCloseConfirmation = function () {
    // Create confirmation modal inside the chat popup
    let confirmationModal = document.getElementById("closeConfirmationModal");
    if (!confirmationModal) {
      confirmationModal = document.createElement("div");
      confirmationModal.id = "closeConfirmationModal";
      confirmationModal.className = "chat-confirmation-modal";
      confirmationModal.innerHTML = `
        <div class="chat-confirmation-overlay"></div>
        <div class="chat-confirmation-content">
          <div class="chat-confirmation-message">
            Are you sure you want to close the chat?
          </div>
          <div class="chat-confirmation-buttons">
            <button class="chat-confirmation-btn cancel-btn" onclick="hideCloseConfirmation()">Cancel</button>
            <button class="chat-confirmation-btn ok-btn" onclick="confirmCloseChat()">OK</button>
          </div>
        </div>
      `;
      // Append to chat popup instead of document body
      chatPopup.appendChild(confirmationModal);
    }
    confirmationModal.style.display = "flex";
  };
  window.hideCloseConfirmation = function () {
    const confirmationModal = document.getElementById("closeConfirmationModal");
    if (confirmationModal) {
      confirmationModal.style.display = "none";
    }
  };
  window.addMessage = function (content, isUser = false) {
    // Generate fresh timestamp for each message
    const now = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = now.toLocaleString("en-US", options).replace(",", "");

    // Parse markdown content to HTML (only for bot messages, keep user messages as plain text)
    const processedContent = isUser ? content : parseMarkdown(content);

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "bot"}`;
    messageDiv.innerHTML = `
    <div class="message-container">
                <div class="message-avatar ${isUser ? "user" : "bot"}">
                    ${isUser ? "You" : "BlendED AI Assistant"}
                <span class="message-time">${formattedTime}</span>
                </div>
                <div class="message-content">
                    ${processedContent}
                </div>
            `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  window.showTypingIndicator = function () {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = `
                <div class="message-avatar bot">BlendED AI Assistant</div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  window.hideTypingIndicator = function () {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  };
  window.sendMessage = async function () {
    if (!chatInput) {
      console.error("Chat input not initialized");
      return;
    }

    const message = chatInput.value.trim();
    if (!message) return;

    // Hide welcome message and suggestions after first message
    const welcomeMessage = document.querySelector(".welcome-message");
    if (welcomeMessage) {
      welcomeMessage.classList.add("hidden");
    }

    // Remove prompt suggestions after user starts chatting
    const suggestions = document.querySelector(".prompt-suggestions");
    if (suggestions) {
      suggestions.remove();
    }

    // Add user message
    addMessage(message, true);
    chatInput.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Send query to API and get response
    try {
      const botResponse = await sendQueryToAPI(message);
      hideTypingIndicator();
      addMessage(botResponse);
    } catch (error) {
      hideTypingIndicator();
      addMessage("Sorry, there was an error processing your message.");
      console.error("Error in sendMessage:", error);
    }
  };
  window.sendSuggestion = function (suggestion) {
    // Remove suggestions immediately when one is clicked
    const suggestionsContainer = document.querySelector(".prompt-suggestions");
    if (suggestionsContainer) {
      suggestionsContainer.remove();
    }
    
    chatInput.value = suggestion;
    sendMessage();
  };
  window.getBotResponse = function (message) {
    const responses = [
      "I'm here to help you with your projects and questions. What would you like to know more about?",
      "That's an interesting question! Let me think about that and provide you with some helpful information.",
      "I can assist you with various topics including coding, project management, and general questions. How can I help you today?",
      "Thanks for asking! I'm designed to be helpful with a wide range of topics. Is there something specific you'd like to explore?",
      "I'm ready to help you tackle your challenges and answer your questions. What's on your mind?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  window.handleKeyPress = function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  // Create toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "chat-button";
  toggleBtn.onclick = function () {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };
  const chatIcon = document.createElement("img");
  chatIcon.src = "assets/images/speech-bubble.png";
  chatIcon.alt = "Chat";
  chatIcon.width = 48;
  chatIcon.height = 43;
  // Append image to button
  toggleBtn.appendChild(chatIcon);
  document.body.appendChild(toggleBtn);
  // Close chat when pressing Escape key
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      chatPopup &&
      chatPopup.classList.contains("active")
    ) {
      closeChat();
    }
  });
})();
