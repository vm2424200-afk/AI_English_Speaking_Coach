/**
 * AI English Speaking Coach - Conversational Intelligence Engine
 * Handles Intent Recognition, Context Management, Grammar Error Interception,
 * Slot-filling, Scenario State Machine & Dynamic Response Generation.
 */

class SpeakingCoachAI {
    constructor() {
        this.profile = {
            name: "Learner",
            level: "Beginner", // Beginner, Intermediate, Advanced
            isOnboarded: false,
            goal: "Improve spoken English fluency in 10 days"
        };

        this.conversationState = {
            awaiting: null, // "name", "level", "scenario_turn", "lesson_practice"
            currentScenario: null, // scenario object if roleplaying
            scenarioStep: 0,
            activeDayLesson: null,
            lastDetectedError: null,
            turnCount: 0
        };

        this.history = [];
    }

    // Initialize or sync with localStorage
    init(savedProfile) {
        if (savedProfile) {
            this.profile = { ...this.profile, ...savedProfile };
        }
    }

    setProfile(key, value) {
        this.profile[key] = value;
    }

    // Check message for grammatical errors using our rule engine
    analyzeGrammar(text) {
        const cleanText = text.trim();
        if (!cleanText || cleanText.length < 5) return null;

        for (const rule of APP_DATA.grammarRules) {
            if (rule.regex.test(cleanText)) {
                let corrected = "";
                if (rule.replace) {
                    corrected = cleanText.replace(rule.regex, rule.replace);
                } else if (rule.fixMap) {
                    const match = cleanText.match(rule.regex);
                    if (match && match[1]) {
                        const word = match[1].toLowerCase();
                        const fix = rule.fixMap[word] || word;
                        corrected = cleanText.replace(new RegExp(`\\b${word}\\b`, "i"), fix);
                    }
                }

                if (corrected && corrected.toLowerCase() !== cleanText.toLowerCase()) {
                    return {
                        ruleName: rule.ruleName,
                        original: cleanText,
                        corrected: corrected,
                        explanation: rule.explanation,
                        example: rule.example
                    };
                }
            }
        }
        return null;
    }

    // Main entry point to process a user message
    processMessage(userMessage) {
        this.conversationState.turnCount++;
        const rawText = userMessage.trim();
        const lower = rawText.toLowerCase();

        // 1. Check for grammar correction first to teach on-the-fly
        const grammarCorrection = this.analyzeGrammar(rawText);
        if (grammarCorrection) {
            this.conversationState.lastDetectedError = grammarCorrection;
        }

        // 2. Check if we are currently awaiting a specific slot (Onboarding flow)
        if (this.conversationState.awaiting === "name") {
            return this.handleNameInput(rawText);
        }

        if (this.conversationState.awaiting === "level") {
            return this.handleLevelInput(lower);
        }

        // 3. Check if we are inside an active roleplay scenario
        if (this.conversationState.currentScenario) {
            return this.handleScenarioDialogue(rawText, lower, grammarCorrection);
        }

        // 4. Intent Classification
        const intent = this.classifyIntent(lower, rawText);

        // 5. Generate Response based on Intent & State
        return this.generateIntentResponse(intent, rawText, lower, grammarCorrection);
    }

    classifyIntent(lower, raw) {
        // Greetings
        if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|greetings)\b/i.test(lower)) {
            return "greeting";
        }

        // Farewell
        if (/^(bye|goodbye|see you|good night|talk to you later|cya)\b/i.test(lower)) {
            return "farewell";
        }

        // Name Introduction: "My name is John" / "I am Sarah"
        if (/\b(?:my name is|i am|i'm|call me)\s+([a-z\s]+)/i.test(lower) && !this.profile.name) {
            return "self_intro";
        }

        // Asking for Coach's identity or role
        if (/(who are you|what is your name|what can you do|how do you work|introduce yourself)/i.test(lower)) {
            return "bot_identity";
        }

        // Grammar inquiry or request to check
        if (/(correct my|check this|is this correct|grammar rule|why do we say|is it correct to say)/i.test(lower)) {
            return "grammar_check";
        }

        // Vocabulary inquiry
        if (/(what does (?:the word )?[a-z]+ mean|meaning of|definition of|synonym of|vocabulary)/i.test(lower)) {
            return "vocabulary_inquiry";
        }

        // Roleplay request
        if (/(practice (?:ordering|restaurant|interview|directions|friends|teacher|shopping)|let'?s roleplay|scenario)/i.test(lower)) {
            return "start_scenario";
        }

        // Motivation / Fear of speaking
        if (/(nervous|scared|shy|afraid to speak|fear|lack confidence|embarrassed|mistakes)/i.test(lower)) {
            return "motivation";
        }

        // 10-day challenge questions
        if (/(day \d+|lesson|curriculum|challenge|how to improve in 10 days)/i.test(lower)) {
            return "challenge_query";
        }

        // Interview practice request
        if (/(interview question|tell me about yourself|job interview|mock interview)/i.test(lower)) {
            return "interview_query";
        }

        // Gratitude / Compliments
        if (/(thank you|thanks|you are great|awesome|helpful|appreciate)/i.test(lower)) {
            return "gratitude";
        }

        // How are you?
        if (/(how are you|how is it going|how do you do)/i.test(lower)) {
            return "how_are_you";
        }

        // General conversational / speaking practice
        return "conversational_free";
    }

    generateIntentResponse(intent, raw, lower, grammarCorrection) {
        let replyText = "";
        let quickReplies = [];

        // If grammar mistake was caught and user didn't explicitly ask for grammar check,
        // we formulate an encouraging teaching response that addresses BOTH the mistake and the topic.
        const grammarPrefix = grammarCorrection ? this.formatGrammarCorrectionSnippet(grammarCorrection) : "";

        switch (intent) {
            case "greeting": {
                const greetings = [
                    `Hello ${this.profile.name}! It's great to see you today. How is your English practice going so far?`,
                    `Hi there, ${this.profile.name}! Welcome back. Are you ready to speak some English today?`,
                    `Good day, ${this.profile.name}! A warm welcome to our practice session. Tell me, how was your day today?`
                ];
                replyText = greetings[Math.floor(Math.random() * greetings.length)];
                quickReplies = ["My day was great!", "I want to practice speaking", "Can you check my sentence?", "Let's do a roleplay"];
                break;
            }

            case "how_are_you": {
                replyText = `I'm doing wonderful and feeling excited to coach you today! 😊 How are you feeling right now? Remember, speaking about your day in English is the fastest way to build confidence.`;
                quickReplies = ["I'm feeling energetic!", "A bit tired, but ready to learn", "I want to improve my tenses"];
                break;
            }

            case "self_intro": {
                // Extract name if possible
                const match = raw.match(/\b(?:my name is|i am|i'm|call me)\s+([a-zA-Z]+)/i);
                if (match && match[1]) {
                    this.profile.name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
                    replyText = `Wonderful to meet you, ${this.profile.name}! 🎉 That was a very smooth introduction. What is your biggest goal for this 10-day challenge?`;
                    quickReplies = ["Speak fluently in meetings", "Crack a job interview", "Speak without fear of mistakes", "Improve my daily grammar"];
                } else {
                    replyText = `Pleasure to meet you! Introducing yourself with clarity is step one of Day 1. Could you also share where you are from and what your favorite hobby is?`;
                    quickReplies = ["I am from...", "In my free time, I like to...", "Let's do Day 1 lesson"];
                }
                break;
            }

            case "bot_identity": {
                replyText = `I am your personal **AI English Speaking Coach**! 🚀 My mission is to help you transform your English communication in 10 days. I can:
- Practice conversational speaking with you
- Roleplay real-life scenarios (restaurant, job interview, directions)
- Catch grammar mistakes and explain why in plain English
- Guide you through your 10-day daily lessons
- Pronounce words out loud using Text-to-Speech!

What would you like to focus on right now?`;
                quickReplies = ["Start Day 1 Lesson", "Practice Job Interview", "Check my Grammar", "Order food at restaurant"];
                break;
            }

            case "grammar_check": {
                if (grammarCorrection) {
                    replyText = `Here is my detailed feedback on your sentence:

${grammarPrefix}

Would you like to try rewriting that sentence now? I'm listening!`;
                } else {
                    replyText = `Your sentence sounds completely natural and grammatically correct! Excellent job! 🌟 What else would you like to say?`;
                }
                quickReplies = ["Give me another sentence to test", "Explain past tense", "Let's practice speaking"];
                break;
            }

            case "vocabulary_inquiry": {
                // Check if user asked about a word in our vocabulary
                const foundWord = APP_DATA.vocabulary.find(v => lower.includes(v.word.toLowerCase()));
                if (foundWord) {
                    replyText = `**${foundWord.word}** ${foundWord.phonetic} (*${foundWord.pos}*):
- **Meaning:** ${foundWord.meaning}
- **Example:** "${foundWord.example}"
- **Synonyms:** ${foundWord.synonyms.join(", ")}

💡 **Speaking Challenge:** Try using **${foundWord.word}** in a sentence of your own! Reply with your sentence and I'll review it.`;
                } else {
                    replyText = `To enrich your vocabulary, check out the **Vocabulary Builder** section! Here is a powerful word for today:

**Articulate** / ɑːrˈtɪk.jə.lət / (*adjective*):
- **Meaning:** Able to express thoughts and ideas clearly and effectively.
- **Example:** "An articulate speaker connects with their audience effortlessly."

Can you try using **articulate** in a sentence?`;
                }
                quickReplies = ["I want to become articulate", "Give me another word", "Take a vocabulary quiz"];
                break;
            }

            case "start_scenario": {
                let chosen = null;
                if (lower.includes("restaurant") || lower.includes("food") || lower.includes("order")) chosen = "restaurant";
                else if (lower.includes("direction") || lower.includes("lost")) chosen = "directions";
                else if (lower.includes("interview") || lower.includes("job")) chosen = "interview";
                else if (lower.includes("friend")) chosen = "friends";
                else if (lower.includes("teacher") || lower.includes("professor")) chosen = "teacher";
                else if (lower.includes("intro") || lower.includes("meet")) chosen = "self_intro";
                else if (lower.includes("shop")) chosen = "shopping";
                else chosen = "restaurant"; // default

                return this.startScenario(chosen);
            }

            case "motivation": {
                const quoteObj = APP_DATA.motivationalQuotes[Math.floor(Math.random() * APP_DATA.motivationalQuotes.length)];
                replyText = `It is 100% normal to feel nervous when speaking a new language! Every fluent speaker you admire once felt exactly the same way. ❤️

*"${quoteObj.quote}"* — ${quoteObj.author}

Remember: **Accuracy comes from practice, not perfection.** You don't have to be perfect; you just have to speak!

What is one small sentence you'd like to say right now?`;
                quickReplies = ["I can do this!", "Yesterday I practiced English", "How do I stop feeling shy?"];
                break;
            }

            case "challenge_query": {
                const dayMatch = lower.match(/day\s*(\d+)/i);
                if (dayMatch && dayMatch[1]) {
                    const dayNum = parseInt(dayMatch[1], 10);
                    const lesson = APP_DATA.lessons.find(l => l.day === dayNum);
                    if (lesson) {
                        replyText = `📘 **Day ${lesson.day}: ${lesson.title}** (${lesson.duration})
- **Objective:** ${lesson.objective}
- **Key Practice:** "${lesson.speakingPrompt}"

You can click **10-Day Plan** in the sidebar to complete the full interactive exercises and quiz! Ready to practice this topic right now?`;
                        quickReplies = [`Practice Day ${lesson.day}`, "Go to Lessons", "Ask another question"];
                        break;
                    }
                }
                replyText = `Our **10-Day English Challenge** is structured step-by-step:
- Days 1-3: Foundations, Daily Sentences & Sentence Structure
- Days 4-6: Tenses, Vocabulary & Asking Engaging Questions
- Days 7-8: Social Fluency & Storytelling
- Days 9-10: Professional Interviews & Graduation Challenge!

Which day would you like to review?`;
                quickReplies = ["Day 1 - Greetings", "Day 4 - Tenses", "Day 9 - Interviews", "Day 10 - Final Challenge"];
                break;
            }

            case "interview_query": {
                replyText = `Let's practice for an interview! 💼

Here is one of the most common questions:
**"Could you tell me a little about yourself and what you are passionate about?"**

💡 *Tip:* Use the **Present - Past - Future** formula we learn in Day 9. Take your time and reply with 2-3 sentences!`;
                quickReplies = ["I am currently a student...", "My background is in...", "Could you give me an example answer?"];
                break;
            }

            case "gratitude": {
                replyText = `You are very welcome, ${this.profile.name}! It is a true pleasure working with you. Your dedication is inspiring! What should we practice next?`;
                quickReplies = ["Let's roleplay ordering food", "Give me a speaking topic", "Check my grammar"];
                break;
            }

            case "farewell": {
                replyText = `Goodbye for now, ${this.profile.name}! 👋 Great job putting in the practice today. Remember, consistency is the key to fluency. See you tomorrow for your next daily challenge!`;
                quickReplies = ["See you tomorrow!", "Thanks Coach!", "Have a great day!"];
                break;
            }

            case "conversational_free":
            default: {
                // If there's an error detected, provide the correction and prompt for continuation
                if (grammarCorrection) {
                    replyText = `${grammarPrefix}

Now, let's keep the conversation going! Tell me, what do you usually enjoy doing during your free time or weekends?`;
                    quickReplies = ["I enjoy listening to music", "I like hanging out with friends", "I love reading interesting books"];
                } else {
                    // Smart contextual conversation partner
                    replyText = this.generateConversationalResponse(raw, lower);
                    quickReplies = ["Tell me more", "How would a native speaker say this?", "Let's do a roleplay scenario", "Give me a speaking tip"];
                }
                break;
            }
        }

        return {
            text: replyText,
            grammarCorrection: grammarCorrection,
            quickReplies: quickReplies,
            state: this.conversationState
        };
    }

    // Natural conversation generator for free-talk
    generateConversationalResponse(raw, lower) {
        if (lower.includes("weather") || lower.includes("rain") || lower.includes("sunny") || lower.includes("hot")) {
            return `Talking about the weather is classic English small talk! How is the weather where you are living right now? Is it pleasant or quite hot/cold?`;
        }

        if (lower.includes("college") || lower.includes("university") || lower.includes("study") || lower.includes("school")) {
            return `Education and college life give you so many great stories to tell! What subject or major are you currently studying, and what do you find most interesting about it?`;
        }

        if (lower.includes("work") || lower.includes("job") || lower.includes("office") || lower.includes("company")) {
            return `Workplace communication requires confidence and clarity! What does a typical day at your work or project look like?`;
        }

        if (lower.includes("hobby") || lower.includes("music") || lower.includes("movie") || lower.includes("book") || lower.includes("cricket") || lower.includes("football") || lower.includes("game")) {
            return `That sounds engaging! Having fun passions gives you instant topics to discuss with anyone. How often do you get time to enjoy that, and what got you started with it?`;
        }

        if (lower.includes("food") || lower.includes("cook") || lower.includes("coffee") || lower.includes("dinner") || lower.includes("lunch")) {
            return `Mmm, delicious! What is your all-time favorite meal or dish to eat, and can you describe what it tastes like?`;
        }

        // Engaging open-ended fallback
        const conversationalPrompts = [
            `That's an interesting thought! Could you elaborate a little more on that? Adding an extra sentence helps build your speaking stamina.`,
            `I love how you expressed that! If you were explaining this to an international friend, what details would you add?`,
            `Well said! Communicating clearly is all about expressing your viewpoint. What else would you like to share about this?`,
            `Good communication! To expand your answer, try using the 'Answer + Reason' technique. Why do you feel that way?`
        ];

        return conversationalPrompts[Math.floor(Math.random() * conversationalPrompts.length)];
    }

    // Format grammar correction in the friendly coach format requested
    formatGrammarCorrectionSnippet(c) {
        return `Good try! 😊

**The correct sentence is:** *${c.corrected}*

**Why?** ${c.explanation}

${c.example ? `*Example:* ${c.example}` : ""}`;
    }

    // Roleplay Scenario Management
    startScenario(scenarioId) {
        const scenario = APP_DATA.scenarios.find(s => s.id === scenarioId) || APP_DATA.scenarios[0];
        this.conversationState.currentScenario = scenario;
        this.conversationState.scenarioStep = 1;

        return {
            text: `🎭 **Starting Roleplay: ${scenario.title}**
*You are playing the role of:* **${scenario.userRole}**
*I am playing:* **${scenario.coachRole}**

---
${scenario.introMessage}`,
            grammarCorrection: null,
            quickReplies: scenario.sampleTurn.slice(0, 3),
            state: this.conversationState,
            isScenarioStart: true
        };
    }

    handleScenarioDialogue(rawText, lower, grammarCorrection) {
        const scenario = this.conversationState.currentScenario;
        this.conversationState.scenarioStep++;
        const step = this.conversationState.scenarioStep;

        const grammarNote = grammarCorrection ? `${this.formatGrammarCorrectionSnippet(grammarCorrection)}\n\n---\n` : "";

        // Exit command
        if (lower.includes("stop") || lower.includes("exit scenario") || lower.includes("end roleplay")) {
            const ended = this.conversationState.currentScenario.title;
            this.conversationState.currentScenario = null;
            this.conversationState.scenarioStep = 0;
            return {
                text: `You have completed the **${ended}** practice! Great effort stepping out of your comfort zone. What would you like to do next?`,
                grammarCorrection: grammarCorrection,
                quickReplies: ["Review another scenario", "Check my progress", "Chat freely"],
                state: this.conversationState
            };
        }

        let coachReply = "";
        let quickReplies = [];

        // Scenario dynamic step handler
        if (scenario.id === "restaurant") {
            if (step === 2) {
                coachReply = `Excellent choice! A refreshing drink is on its way. Here is our menu. Today we have a wonderful grilled herb chicken and a creamy mushroom pasta. What would you like to have for your main course?`;
                quickReplies = ["I would like the grilled herb chicken, please.", "Could I have the creamy mushroom pasta?", "Is there a vegetarian option?"];
            } else if (step === 3) {
                coachReply = `Coming right up! That is one of our chef's favorites. Would you care for any dessert or side salad with that?`;
                quickReplies = ["Just the main dish is fine, thank you.", "Could I get a small side salad?", "What desserts do you have?"];
            } else if (step >= 4) {
                coachReply = `Here is your food, freshly prepared! I hope you enjoy your meal. Whenever you are ready, just let me know if you would like anything else or if you'd like the check.`;
                quickReplies = ["Could we please have the bill?", "Everything was delicious, thank you!", "End roleplay"];
                if (lower.includes("bill") || lower.includes("check")) {
                    coachReply = `Certainly! Here is your bill. It comes to $24.50. You can pay with cash or card. Thank you so much for dining with us at The Bistro!`;
                    quickReplies = ["Here is my card, thank you!", "End roleplay", "Start another scenario"];
                }
            }
        } else if (scenario.id === "interview") {
            if (step === 2) {
                coachReply = `Thank you for sharing that background. You clearly have genuine enthusiasm. Next question: **What would you say is your greatest strength, and can you share an example of when you used it?**`;
                quickReplies = ["One of my strengths is problem-solving...", "I work very well in teams...", "I am a fast and adaptable learner..."];
            } else if (step === 3) {
                coachReply = `That is an impactful example. Adaptability and problem-solving are vital for our team. Could you also tell me how you handle constructive feedback or tight deadlines?`;
                quickReplies = ["I stay calm and prioritize key tasks.", "I welcome feedback as an opportunity to grow.", "I communicate early with team members."];
            } else {
                coachReply = `Impressive answers! You expressed your thoughts clearly and professionally. Do you have any questions for me about the company or the team culture?`;
                quickReplies = ["What does success look like in this role?", "How does the team support professional growth?", "End roleplay"];
            }
        } else if (scenario.id === "directions") {
            if (step === 2) {
                coachReply = `Yes, of course! You just go straight down this avenue for two blocks, then turn left at the bookstore. You'll see the metro station right opposite the pharmacy. Is that clear, or would you like me to repeat?`;
                quickReplies = ["That's very clear, thank you!", "Is it within walking distance?", "How long does it take to walk there?"];
            } else {
                coachReply = `It only takes about 5 minutes on foot! You can't miss it. Have a wonderful time exploring our city!`;
                quickReplies = ["Thank you so much! Have a great day.", "End roleplay", "Practice another scenario"];
            }
        } else if (scenario.id === "self_intro") {
            if (step === 2) {
                coachReply = `A pleasure to meet you! That was a really smooth opening. What field are you currently working in or studying at college?`;
                quickReplies = ["I am currently studying Computer Science.", "I work in engineering and technology.", "I am preparing for higher studies."];
            } else if (step === 3) {
                coachReply = `That sounds very promising! What inspired you to choose that field, and what hobbies do you like to enjoy when you're not busy?`;
                quickReplies = ["I love solving real-world problems.", "In my free time, I love sports and reading.", "I enjoy learning new languages!"];
            } else {
                coachReply = `It was wonderful getting to know you! You communicated with fantastic warmth and clarity. Let's definitely stay in touch!`;
                quickReplies = ["Thank you! Have a wonderful day.", "End roleplay", "Start another scenario"];
            }
        } else if (scenario.id === "friends") {
            if (step === 2) {
                coachReply = `Awesome! I'm so glad we both got some free time. Have you checked out that new cafe on 5th Street? I hear they have great coffee and snacks.`;
                quickReplies = ["I haven't been there yet, but I'd love to try it!", "What time works best for you?", "That sounds like a great plan."];
            } else if (step === 3) {
                coachReply = `How about this Saturday around 4:00 PM? We can catch up on our projects and relax.`;
                quickReplies = ["Saturday at 4:00 PM works perfectly for me!", "Could we do Sunday afternoon instead?", "Sounds like a solid plan!"];
            } else {
                coachReply = `It's a date! Looking forward to Saturday at 4. Take care until then!`;
                quickReplies = ["See you then! Bye!", "End roleplay", "Practice another scenario"];
            }
        } else if (scenario.id === "teacher") {
            if (step === 2) {
                coachReply = `Of course! Let's take a look at your assignment questions together. What specific concept or section are you finding most challenging?`;
                quickReplies = ["I want to clarify the formatting requirements.", "I was hoping to get feedback on my thesis.", "Could you explain the deadline policy?"];
            } else if (step === 3) {
                coachReply = `That makes total sense. My advice is to break it down into two clear arguments and cite your sources thoroughly. Would you like to submit a rough draft by Thursday for preliminary feedback?`;
                quickReplies = ["Yes, that would be extremely helpful! Thank you.", "I will prepare the draft tonight.", "Thank you for your guidance, Professor."];
            } else {
                coachReply = `You're very welcome! You are on the right track. Best of luck with the assignment, and feel free to reach out anytime!`;
                quickReplies = ["Thank you for your time! Have a great afternoon.", "End roleplay", "Practice another scenario"];
            }
        } else {
            // General scenario progression (e.g. shopping or custom)
            coachReply = `That was a natural response! Let's continue. How would you wrap up this conversation politely?`;
            quickReplies = ["Thank you for your help!", "It was great talking to you.", "End roleplay"];
        }

        return {
            text: `${grammarNote}${coachReply}`,
            grammarCorrection: grammarCorrection,
            quickReplies: quickReplies,
            state: this.conversationState
        };
    }

    // Onboarding handlers
    startOnboarding() {
        this.conversationState.awaiting = "name";
        return {
            text: `👋 **Welcome to your 10-Day AI English Speaking Coach!**

I am Maya, your personal speech and conversation partner. Together, we are going to build your speaking confidence step-by-step.

To begin our journey, **what is your name?**`,
            quickReplies: ["My name is...", "I'm Rahul", "I'm Priya", "I'm Alex"]
        };
    }

    handleNameInput(input) {
        let cleanName = input.replace(/^(my name is|i am|i'm|call me)\s*/i, "").trim();
        cleanName = cleanName.replace(/[.!,?]/g, "");
        if (!cleanName || cleanName.length < 2) cleanName = "Friend";

        this.profile.name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        this.conversationState.awaiting = "level";

        return {
            text: `Pleased to meet you, **${this.profile.name}**! 🌟

Now, how would you describe your current English speaking level?
- **Beginner:** "I know basic words, but I hesitate to speak full sentences."
- **Intermediate:** "I can speak simple English, but I make grammar mistakes and get stuck."
- **Advanced:** "I speak well, but I want to polish my fluency, vocabulary, and professional interview skills."`,
            quickReplies: ["Beginner", "Intermediate", "Advanced"]
        };
    }

    handleLevelInput(input) {
        if (input.includes("adv")) {
            this.profile.level = "Advanced";
        } else if (input.includes("inter")) {
            this.profile.level = "Intermediate";
        } else {
            this.profile.level = "Beginner";
        }

        this.conversationState.awaiting = null;
        this.profile.isOnboarded = true;

        return {
            text: `Perfect! I've set your profile to **${this.profile.level}**. 🎯

Here is our plan:
1. **Day 1 Challenge:** Basic Greetings & Self-Introduction
2. **Daily Practice:** Chat with me anytime to practice speaking, correct mistakes, and build habits.
3. **Voice Mode:** You can tap the 🎤 microphone button to speak instead of typing!

Are you ready to begin **Day 1**?`,
            quickReplies: ["Start Day 1 Lesson", "Let's chat a bit first", "How do I practice speaking?"]
        };
    }
}

// Global instance
if (typeof window !== "undefined") {
    window.SpeakingCoachAI = SpeakingCoachAI;
}
