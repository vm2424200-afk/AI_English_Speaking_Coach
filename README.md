# 🎙️ SpeakEase AI – English Speaking Coach
### *10 Days English Improvement Challenge*

> A fully functional, responsive, and visually modern web application designed to help beginner students overcome speaking hesitation, master core sentence structures, and achieve conversational English fluency in 10 days.

Built with **HTML5**, **CSS3**, and **Vanilla JavaScript** — completely static and 100% compatible with **GitHub Pages** with zero backend or build setup required.

---

## 🌟 Key Highlights & Live Features

### 1. 🏠 Home Dashboard
- **Personalized Welcome Banner**: Greets the user with their name, current active day, and learning streak.
- **Dynamic Challenge Ring**: Circular SVG progress ring tracking overall 10-day challenge completion (0% to 100%).
- **4 Real-Time Stat Cards**:
  - 📅 **Days Completed** ($X$ / 10 Days)
  - 🔥 **Active Daily Streak** (calculated automatically with date tracking in `localStorage`)
  - 📖 **Vocabulary Mastered** (count of learned and favorited words)
  - 💬 **Coach Conversations** (total practice turns completed)
- **Today's Lesson Spotlight**: Direct quick-access card to start today's lesson or practice in AI Chat.
- **Daily Motivation & Spoken Tip**: Daily inspirational quotes and listening tips with Text-to-Speech pronunciation.
- **Quick Learning Action Tiles**: Instant shortcuts to Chat, Scenarios, Grammar Checker, and Vocabulary Quiz.

---

### 2. 👩‍🏫 AI Chatbot – English Speaking Coach (The Flagship Feature)
The heart of the application is an intelligent, client-side conversational AI coach named **Coach Maya**.
- **Interactive Onboarding Flow**: Welcomes new learners, asks for their name, and determines their English proficiency level (*Beginner*, *Intermediate*, or *Advanced*).
- **Intent Recognition & Slot Filling**: Understands greetings, self-introductions, requests for grammar help, vocabulary questions, interview tips, roleplay prompts, motivation, and small talk.
- **On-The-Fly Grammar Error Interception**: When a user makes a common English mistake (e.g., *"Yesterday I go to college"*), the coach gently acknowledges, formats a side-by-side correction (*"Yesterday I went to college"*), explains *why* in simple English, and challenges the user to re-use the target pattern.
- **Real-World Roleplay State Machine**: Conducts interactive multi-turn dialogues for scenarios like ordering food, asking directions, or answering job interview questions.
- **Text-to-Speech (TTS)**: Reads coach messages aloud with customizable speech speeds (Slow 0.85x, Normal 1.0x, Fast 1.15x) using the browser's `SpeechSynthesis` API.
- **Speech-to-Text (STT)**: Microphone button powered by the Web Speech API (`SpeechRecognition`), allowing users to practice speaking out loud.
- **Suggested Prompt Chips**: Horizontally scrollable quick-reply suggestions for effortless conversation starting.
- **Full History Persistence**: Saves chats in `localStorage` with a clear chat button.

---

### 3. 📅 10-Day English Learning Plan
A structured, sequential curriculum covering essential conversational milestones:
- **Day 1**: Basic Greetings & Self-Introduction
- **Day 2**: Daily Use English Sentences & Polite Requests (*Could you... / Would you mind...*)
- **Day 3**: Sentence Formation & Core Grammar (Subject + Verb + Object, Articles *a / an / the*)
- **Day 4**: Tenses & Verb Usage (Past Simple vs. Present, Irregular verbs: *went, saw, bought*)
- **Day 5**: Vocabulary Building & Collocations (*make a decision* vs. *do homework*)
- **Day 6**: Asking Questions & The Answer+Detail Technique
- **Day 7**: Real-Life Conversations & Social Small Talk (Giving opinions & polite disagreement)
- **Day 8**: Speaking About Yourself & Storytelling (Connectors: *Initially, Suddenly, Eventually*)
- **Day 9**: Interview & Professional English (Past-Present-Future framework)
- **Day 10**: Final Speaking Challenge & Graduation Speech

**Each Day includes:**
1. Clear **Learning Objective**.
2. Beginner-friendly **Explanation & Audio Pronunciation Examples**.
3. **Interactive 3-Question Practice Quiz** with instant visual feedback and explanations.
4. **Speaking Practice Challenge** with a single click to test in AI Chat.
5. **Progressive Unlocking System** (Day $N+1$ unlocks upon completing Day $N$, with an optional test-unlock toggle for evaluation).

---

### 4. 📖 Vocabulary Builder & Interactive Quiz
- **Curated Database**: 30+ high-frequency vocabulary words with phonetic IPA guides, parts of speech, simplified English definitions, and contextual example sentences.
- **Interactive Audio**: Listen to proper pronunciation for every single word.
- **Category Filter & Search**: Filter by *Personal Growth*, *Daily Life*, *Grammar*, *Fluency*, *Professional*, or *Favorites*.
- **Save to Favorites**: One-click star button to bookmark difficult words in `localStorage`.
- **Vocabulary Mastery Quiz**: Generates randomized 5-question multiple-choice quizzes with real-time scoring and celebratory confetti!

---

### 5. ✍️ Instant Grammar Correction Tool
- **Dedicated Sentence Lab**: Allows learners to test any English sentence before speaking.
- **ESL/EFL Rule Engine**: Detects common beginner pitfalls:
  - Subject-Verb Agreement (*"He don't"* $\to$ *"He doesn't"*)
  - Past Tense Confusion (*"Yesterday I go"* $\to$ *"Yesterday I went"*)
  - Auxiliary Redundancy (*"Did you went"* $\to$ *"Did you go"*)
  - Verb vs. Adjective (*"I am agree"* $\to$ *"I agree"*)
  - Missing Prepositions (*"listen music"* $\to$ *"listen to music"*, *"married with"* $\to$ *"married to"*)
  - Article Errors (*"a apple"* $\to$ *"an apple"*, *"an university"* $\to$ *"a university"*)
  - Uncountable Nouns (*"an advice"* $\to$ *"some advice"*, *"many furnitures"* $\to$ *"furniture"*)
  - Double Negatives (*"I don't know nothing"* $\to$ *"I don't know anything"*)
- **Visual Diff**: Displays original text with strikethrough and corrected sentence in bold emerald green, paired with simple explanations and an action button to practice the sentence in AI Chat.

---

### 6. 🎭 Daily Speaking Practice Scenarios
6 realistic roleplay simulations:
1. 🍽️ **Ordering Food at a Restaurant** (Waiter & customer dialogue)
2. 🗺️ **Asking for Directions in a City** (Landmarks, turns, walking distance)
3. ☕ **Talking with Friends & Making Plans** (Weekend catch-ups, coffee dates)
4. 🎓 **Talking to Teachers / Professors** (Clarifying assignments, office hours)
5. 💼 **Job Interview Practice** (Elevator pitch, strengths, team collaboration)
6. 🛍️ **Shopping at a Clothing Store** (Sizes, discounts, fitting rooms)

---

### 7. 📊 Progress Tracker & Official Graduation Certificate
- **Visual Matrix**: Status node for each of the 10 days (*Completed*, *In Progress*, or *Locked*).
- **Speaking Analytics**: Tracks lessons completed, conversation turns, mastered vocabulary, grammar corrections, and active streak.
- **Profile Customization**: Update name and proficiency level at any time.
- **Printable Graduation Certificate**: Unlocks upon finishing Day 10 (or accessible via Preview). Features a luxury gold-bordered layout, student name, issue date, verification badge, and one-click **Print / Save as PDF** support.
- **Safe Reset**: Allows starting the 10-day challenge anew with a confirmation modal.

---

## 💻 Tech Stack & Architecture

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible forms, audio integration |
| **CSS3** | Modern Blue/Purple/White design system, Glassmorphism, CSS Grid, Flexbox, Animations |
| **Vanilla JavaScript (ES6+)** | State management, Conversational AI logic, Speech APIs, Canvas confetti |
| **LocalStorage API** | Complete client-side persistence of user profile, chats, progress & vocabulary |
| **Web Speech API** | `SpeechSynthesis` for Text-to-Speech & `SpeechRecognition` for voice input |

### Zero Build Tools Required
- **No Node.js, Webpack, or npm dependencies**.
- **No external paid API keys exposed** in frontend JavaScript.
- Runs anywhere simply by opening `index.html` in a web browser.

---

## 📁 File Structure

```
c:\chatbot\
├── index.html       # Single Page Application layout & accessible modal dialogs
├── style.css        # Responsive styling, color themes, glassmorphism, mobile drawer & print media queries
├── data.js          # Curriculum (10 lessons), 30+ vocabulary cards, 20+ grammar rules, scenarios, quotes
├── chatbot.js       # Conversational Intelligence: intent recognition, slot filling, scenario state machine
├── script.js        # Controller: LocalStorage sync, Speech (TTS/STT), UI routing, quiz engine, confetti
└── README.md        # Comprehensive documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can run the website locally in seconds without installing anything:

### Method 1: Direct File Open (Easiest)
1. Navigate to the project folder (`C:\chatbot`).
2. Double-click **`index.html`** to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Method 2: Using VS Code Live Server
1. Open the `C:\chatbot` folder in **Visual Studio Code**.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. The app will launch at `http://127.0.0.1:5500/index.html`.

### Method 3: Using Python Built-in Server
Open PowerShell or Command Prompt inside `C:\chatbot` and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy to GitHub Pages

Follow these simple steps to host the project for free on GitHub Pages:

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in.
2. Click the **"+"** icon in the top right and select **New repository**.
3. Name your repository (e.g., `ai-english-speaking-coach`).
4. Ensure the repository is set to **Public**.
5. Click **Create repository** (do not initialize with README since you already have one).

### Step 2: Push Your Local Files to GitHub
Open PowerShell in `C:\chatbot` and execute:
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial release: SpeakEase AI English Speaking Coach"

# Rename branch to main
git branch -M main

# Link to your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ai-english-speaking-coach.git

# Push files to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (tab at the top).
3. In the left sidebar, scroll down to the **Code and automation** section and click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
5. Wait 1–2 minutes. Refresh the page until GitHub displays:
   > *"Your site is live at https://YOUR_USERNAME.github.io/ai-english-speaking-coach/"*

🎉 Your AI English Speaking Coach is now live on the internet!

---

## 🎓 College Assignment / Viva Presentation Talking Points

If presenting this project for an evaluation, viva, or college assignment, highlight these key design points:

1. **Problem Statement**:
   - Traditional language learning focuses heavily on passive reading and grammar rules, leaving students afraid of making verbal mistakes when speaking.
   - SpeakEase AI acts as an encouraging, patient personal coach available 24/7 without judgment.

2. **Client-Side AI & Privacy Architecture**:
   - Instead of exposing sensitive, costly API keys in frontend JavaScript, the application implements an advanced rule-based conversational intelligence engine (`chatbot.js`).
   - Uses **regular expressions**, **entity extraction**, **slot-filling**, and **context state machines** to provide meaningful, educational corrections in real-time.
   - All user data and chat history remain securely stored in the user's browser via the **Web Storage API (LocalStorage)**.

3. **Multimodal Accessibility**:
   - **Web Speech Synthesis API** allows users to hear native-like pronunciation.
   - **Web Speech Recognition API** enables hands-free spoken input through the microphone.
   - **Print CSS Media Queries** allow instant PDF generation of the official graduation certificate.

---

## 📄 License
This project is released under the **MIT License**. Free for educational and personal use.
