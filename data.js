/**
 * AI English Speaking Coach - 10-Day Challenge
 * Comprehensive Data Module: Lessons, Vocabulary, Grammar Rules, Scenarios & Prompts
 */

const APP_DATA = {
    // 10-Day English Challenge Curriculum
    lessons: [
        {
            day: 1,
            title: "Basic Greetings & Self-Introduction",
            category: "Foundations",
            duration: "15 mins",
            description: "Learn how to greet people naturally in formal and informal situations, introduce yourself with confidence, and ask polite opening questions.",
            objective: "By the end of today, you will be able to introduce yourself in 30 seconds smoothly and greet anyone appropriately.",
            explanation: `
                <h3>1. Formal vs. Informal Greetings</h3>
                <p>English greetings depend on who you are talking to. Using the right greeting creates a great first impression!</p>
                <ul>
                    <li><strong>Formal (Work, Teachers, Strangers):</strong> "Good morning / afternoon / evening", "Hello, how are you today?", "It is a pleasure to meet you."</li>
                    <li><strong>Informal (Friends, Peers):</strong> "Hi there!", "Hey! How's it going?", "What's up?", "Good to see you!"</li>
                </ul>

                <h3>2. The Perfect 3-Step Self-Introduction</h3>
                <p>When someone says <em>"Tell me a little about yourself"</em>, use this simple 3-step formula:</p>
                <ol>
                    <li><strong>Name & Origin:</strong> "Hello, my name is [Name]. I am from [City/Country]."</li>
                    <li><strong>Role / Occupation:</strong> "Currently, I am a student studying [Subject] / I work as [Job]."</li>
                    <li><strong>Hobby / Passion:</strong> "In my free time, I really enjoy [reading books / coding / playing sports]."</li>
                </ol>
            `,
            examples: [
                {
                    speaker: "Alex",
                    text: "Good morning! My name is Alex. It is a pleasure to meet you.",
                    audioText: "Good morning! My name is Alex. It is a pleasure to meet you."
                },
                {
                    speaker: "Coach",
                    text: "Nice to meet you too, Alex! What do you like to do in your free time?",
                    audioText: "Nice to meet you too, Alex! What do you like to do in your free time?"
                },
                {
                    speaker: "Alex",
                    text: "I really enjoy reading books and practicing my spoken English.",
                    audioText: "I really enjoy reading books and practicing my spoken English."
                }
            ],
            keyPhrases: [
                "Pleasure to meet you",
                "How are you doing today?",
                "I am currently studying...",
                "In my free time, I like to..."
            ],
            quiz: [
                {
                    question: "Which of the following is the most suitable greeting for a job interview?",
                    options: [
                        "Good morning, it is a pleasure to meet you.",
                        "Hey buddy, what's up?",
                        "Yo! How's life?",
                        "What's going on?"
                    ],
                    correctIndex: 0,
                    explanation: "'Good morning, it is a pleasure to meet you' is polite, professional, and formal."
                },
                {
                    question: "How do you complete this natural self-introduction? 'Hello, I'm Maya. I am _____ Mumbai.'",
                    options: ["from", "of", "to", "at"],
                    correctIndex: 0,
                    explanation: "We use 'from' to indicate our hometown, country, or place of origin."
                },
                {
                    question: "What is a polite response when someone asks 'How are you today?'",
                    options: [
                        "I am doing well, thank you! How about you?",
                        "Why do you ask?",
                        "Yes, I am.",
                        "I am English."
                    ],
                    correctIndex: 0,
                    explanation: "Acknowledging with 'I am doing well, thank you!' and returning the question is the standard polite convention."
                }
            ],
            speakingPrompt: "Introduce yourself in 3 sentences: Say your name, where you are from, and your favorite hobby."
        },
        {
            day: 2,
            title: "Daily Use English Sentences",
            category: "Everyday Speech",
            duration: "20 mins",
            description: "Master high-frequency conversational phrases for daily routines, chores, making requests, and expressing polite gratitude.",
            objective: "Speak naturally about your daily schedule and communicate polite requests with 'Could you' and 'Would you mind'.",
            explanation: `
                <h3>1. Describing Your Morning Routine</h3>
                <p>Use simple present tense to talk about habits:</p>
                <ul>
                    <li>"I usually wake up at 7:00 AM."</li>
                    <li>"I grab a quick cup of coffee and get ready for the day."</li>
                    <li>"I leave home around 8:30 AM to catch the bus."</li>
                </ul>

                <h3>2. Making Polite Requests</h3>
                <p>Instead of demanding <em>"Give me the pen"</em>, English speakers use polite softeners:</p>
                <ul>
                    <li><strong>Could you please...:</strong> "Could you please pass the water?"</li>
                    <li><strong>Would you mind... + -ing:</strong> "Would you mind closing the door?"</li>
                    <li><strong>May I...:</strong> "May I borrow your notebook for a moment?"</li>
                </ul>

                <h3>3. Showing Genuine Appreciation</h3>
                <ul>
                    <li>"I really appreciate your help!"</li>
                    <li>"Thank you so much, that was very kind of you."</li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Student",
                    text: "Could you please explain that once more? I did not catch it.",
                    audioText: "Could you please explain that once more? I did not catch it."
                },
                {
                    speaker: "Coach",
                    text: "Of course! I would be glad to help. Let's look at it step by step.",
                    audioText: "Of course! I would be glad to help. Let's look at it step by step."
                }
            ],
            keyPhrases: [
                "Could you please...",
                "Would you mind helping me?",
                "I really appreciate it.",
                "Have a great day ahead!"
            ],
            quiz: [
                {
                    question: "Choose the most polite way to ask someone to turn down the music:",
                    options: [
                        "Could you please lower the volume a bit?",
                        "Shut that noise down now!",
                        "Lower the music immediately.",
                        "Music is loud, stop it."
                    ],
                    correctIndex: 0,
                    explanation: "'Could you please...' turns a direct order into a courteous, friendly request."
                },
                {
                    question: "Fill in the blank: 'Would you mind _____ me with this heavy box?'",
                    options: ["helping", "help", "helped", "to help"],
                    correctIndex: 0,
                    explanation: "After the phrase 'Would you mind...', we always use the verb in its -ing form (gerund)."
                },
                {
                    question: "How do you respond politely when someone says 'Thank you so much!'?",
                    options: [
                        "You're very welcome! Glad I could help.",
                        "Yes, you must thank me.",
                        "Why not.",
                        "Never."
                    ],
                    correctIndex: 0,
                    explanation: "'You're very welcome!' is the standard polite reply to expressions of gratitude."
                }
            ],
            speakingPrompt: "Describe your morning routine in 3 sentences using words like 'first', 'then', and 'after that'."
        },
        {
            day: 3,
            title: "Sentence Formation & Basic Grammar",
            category: "Grammar Core",
            duration: "20 mins",
            description: "Understand the core S-V-O (Subject + Verb + Object) sentence structure, proper use of articles (a, an, the), and connecting words.",
            objective: "Construct complete, grammatically sound English sentences without feeling confused about word order.",
            explanation: `
                <h3>1. The Golden Rule: S + V + O</h3>
                <p>Every standard English sentence follows the <strong>Subject + Verb + Object</strong> order:</p>
                <ul>
                    <li><strong>Subject:</strong> Who is doing the action? (<em>She / John / The cat</em>)</li>
                    <li><strong>Verb:</strong> What is the action? (<em>reads / cooked / saw</em>)</li>
                    <li><strong>Object:</strong> What receives the action? (<em>a novel / dinner / a bird</em>)</li>
                    <li><em>Example:</em> "Maya (S) speaks (V) fluent English (O)."</li>
                </ul>

                <h3>2. Articles: A, An, or The?</h3>
                <ul>
                    <li><strong>A:</strong> Used before consonant sounds (<em>a book, a university, a doctor</em>).</li>
                    <li><strong>An:</strong> Used before vowel sounds (<em>an apple, an hour, an engineer</em>).</li>
                    <li><strong>The:</strong> Used when talking about a specific item both speaker and listener know (<em>the red car, the sun</em>).</li>
                </ul>

                <h3>3. Simple Connectors</h3>
                <p>Use <strong>and</strong> (addition), <strong>but</strong> (contrast), and <strong>because</strong> (reason) to combine simple sentences into fluent expressions.</p>
            `,
            examples: [
                {
                    speaker: "Coach",
                    text: "Why do we say 'an hour' instead of 'a hour'?",
                    audioText: "Why do we say an hour instead of a hour?"
                },
                {
                    speaker: "Learner",
                    text: "Because 'hour' starts with a silent H, so the first sound is an 'ow' vowel sound!",
                    audioText: "Because hour starts with a silent H, so the first sound is an ow vowel sound!"
                }
            ],
            keyPhrases: [
                "Subject + Verb + Object",
                "An hour / an honest person",
                "I like coffee, but I prefer tea",
                "I am practicing because I want to improve"
            ],
            quiz: [
                {
                    question: "Which sentence has the correct S-V-O word order?",
                    options: [
                        "Sarah drinks fresh orange juice every morning.",
                        "Drinks Sarah fresh orange juice every morning.",
                        "Fresh orange juice Sarah drinks every morning.",
                        "Every morning fresh juice Sarah drinks."
                    ],
                    correctIndex: 0,
                    explanation: "Sarah (Subject) + drinks (Verb) + fresh orange juice (Object)."
                },
                {
                    question: "Choose the correct article: 'She has _____ interview at 2:00 PM.'",
                    options: ["an", "a", "the", "no article needed"],
                    correctIndex: 0,
                    explanation: "'Interview' begins with an 'i' vowel sound, so we use 'an'."
                },
                {
                    question: "Select the sentence with correct article usage:",
                    options: [
                        "He wants to become a doctor.",
                        "He wants to become an doctor.",
                        "He wants to become the doctor of world.",
                        "He wants to become doctor."
                    ],
                    correctIndex: 0,
                    explanation: "We use 'a' before singular professions starting with a consonant sound."
                }
            ],
            speakingPrompt: "Create one sentence using 'because' to explain why you want to improve your English."
        },
        {
            day: 4,
            title: "Tenses & Verb Usage",
            category: "Grammar Core",
            duration: "25 mins",
            description: "Overcome the biggest challenge for beginners: smoothly switching between Past Simple, Present Simple, and Future with confidence.",
            objective: "Correctly use past tense verbs (went, ate, watched) when talking about yesterday, without saying 'Yesterday I go'.",
            explanation: `
                <h3>1. Present vs. Past Simple</h3>
                <p>One of the most frequent mistakes is using present verbs for past events:</p>
                <ul>
                    <li>❌ <em>"Yesterday I go to college and see my friend."</em></li>
                    <li>✅ <em>"Yesterday I <strong>went</strong> to college and <strong>saw</strong> my friend."</em></li>
                </ul>

                <h3>2. Common Irregular Verbs You Must Know</h3>
                <ul>
                    <li><strong>go &rarr; went</strong> ("I went home early.")</li>
                    <li><strong>see &rarr; saw</strong> ("I saw a great movie.")</li>
                    <li><strong>buy &rarr; bought</strong> ("She bought a new laptop.")</li>
                    <li><strong>speak &rarr; spoke</strong> ("We spoke for an hour.")</li>
                    <li><strong>eat &rarr; ate</strong> ("I ate a delicious breakfast.")</li>
                </ul>

                <h3>3. Talking About the Future</h3>
                <p>Use <strong>will + verb</strong> for decisions or promises, and <strong>going to + verb</strong> for planned activities:</p>
                <ul>
                    <li>"I will call you tonight."</li>
                    <li>"Tomorrow, I am going to attend an English workshop."</li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Learner",
                    text: "Last weekend, I visited my grandparents and we cooked lunch together.",
                    audioText: "Last weekend, I visited my grandparents and we cooked lunch together."
                },
                {
                    speaker: "Coach",
                    text: "Brilliant! You correctly used 'visited' and 'cooked' in the past simple.",
                    audioText: "Brilliant! You correctly used visited and cooked in the past simple."
                }
            ],
            keyPhrases: [
                "Yesterday I went to...",
                "Last week I met...",
                "Tomorrow I will...",
                "I am going to practice..."
            ],
            quiz: [
                {
                    question: "Identify the correct past tense sentence:",
                    options: [
                        "Yesterday, I went to the library and studied for two hours.",
                        "Yesterday, I go to the library and study for two hours.",
                        "Yesterday, I have went to the library and study.",
                        "Yesterday, I did went to the library."
                    ],
                    correctIndex: 0,
                    explanation: "'Went' is the past simple of 'go', and 'studied' is the past simple of 'study'."
                },
                {
                    question: "What is the past tense of the verb 'buy'?",
                    options: ["bought", "buyed", "boated", "buying"],
                    correctIndex: 0,
                    explanation: "'Buy' is an irregular verb. Its past simple form is 'bought'."
                },
                {
                    question: "Complete the sentence: 'Did you _____ the email I sent yesterday?'",
                    options: ["receive", "received", "receiving", "receives"],
                    correctIndex: 0,
                    explanation: "After the auxiliary 'did' in a question, we always use the base form of the main verb ('receive')."
                }
            ],
            speakingPrompt: "Tell me two things you did yesterday using past tense verbs like 'went', 'ate', 'watched', or 'read'."
        },
        {
            day: 5,
            title: "Vocabulary Building & Collocations",
            category: "Vocabulary",
            duration: "20 mins",
            description: "Stop translating word-for-word from your native language! Learn natural English word pairs (collocations) and power adjectives.",
            objective: "Express yourself using natural English word combinations like 'make a decision' instead of 'do a decision'.",
            explanation: `
                <h3>1. What are Collocations?</h3>
                <p>Collocations are words that naturally live together in English. Native speakers expect these pairs:</p>
                <ul>
                    <li><strong>Make vs. Do:</strong>
                        <br>We say: <em>make a mistake, make an effort, make a choice, make friends</em>.
                        <br>We say: <em>do homework, do business, do your best, do a favor</em>.
                    </li>
                    <li><strong>Say vs. Tell:</strong>
                        <br>We say: <em>tell someone a story, tell the truth</em> (takes a person).
                        <br>We say: <em>say something, say goodbye</em>.
                </ul>

                <h3>2. Upgrade Boring Words to Expressive Words</h3>
                <ul>
                    <li>Instead of <em>very happy</em> &rarr; <strong>thrilled</strong> or <strong>delighted</strong></li>
                    <li>Instead of <em>very tired</em> &rarr; <strong>exhausted</strong></li>
                    <li>Instead of <em>very busy</em> &rarr; <strong>swamped</strong></li>
                    <li>Instead of <em>very important</em> &rarr; <strong>crucial</strong> or <strong>essential</strong></li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Learner",
                    text: "I was exhausted after my exam, so I took a short break.",
                    audioText: "I was exhausted after my exam, so I took a short break."
                },
                {
                    speaker: "Coach",
                    text: "Excellent word choice! 'Exhausted' is much more expressive than 'very tired'.",
                    audioText: "Excellent word choice! Exhausted is much more expressive than very tired."
                }
            ],
            keyPhrases: [
                "Make a mistake / Make a decision",
                "Do your best / Do a favor",
                "Feel thrilled / Feel exhausted",
                "Crucial step / Valuable lesson"
            ],
            quiz: [
                {
                    question: "Which verb correctly pairs with 'a mistake'?",
                    options: ["make", "do", "create", "construct"],
                    correctIndex: 0,
                    explanation: "In English, the natural collocation is always 'make a mistake'."
                },
                {
                    question: "Which word best replaces 'very tired' in casual conversation?",
                    options: ["exhausted", "lazy", "sleepyhead", "bored"],
                    correctIndex: 0,
                    explanation: "'Exhausted' means completely drained of energy or extremely tired."
                },
                {
                    question: "Complete the collocation: 'Could you _____ me a quick favor?'",
                    options: ["do", "make", "give", "bring"],
                    correctIndex: 0,
                    explanation: "We always say 'do someone a favor'."
                }
            ],
            speakingPrompt: "Use the word 'exhausted' or 'thrilled' in a sentence about an experience you had recently."
        },
        {
            day: 6,
            title: "Asking Questions & Answering",
            category: "Conversational Flow",
            duration: "20 mins",
            description: "Master the art of keeping conversations going! Learn WH-questions, indirect polite questions, and how to avoid one-word answers.",
            objective: "Form both open-ended and closed questions effortlessly, and answer questions with the 'Answer + Reason' method.",
            explanation: `
                <h3>1. WH-Questions (The Information Seekers)</h3>
                <ul>
                    <li><strong>Who:</strong> Asking about people ("Who is your mentor?")</li>
                    <li><strong>What:</strong> Asking about things/actions ("What are your goals?")</li>
                    <li><strong>Where:</strong> Asking about places ("Where do you live?")</li>
                    <li><strong>When:</strong> Asking about time ("When does the session start?")</li>
                    <li><strong>Why:</strong> Asking about reasons ("Why are you learning English?")</li>
                    <li><strong>How:</strong> Asking about method/manner ("How do you stay motivated?")</li>
                </ul>

                <h3>2. The Golden Rule: Avoid 1-Word Answers!</h3>
                <p>When someone asks you a question, don't just say <em>"Yes"</em> or <em>"No"</em>. Use the <strong>Answer + 1 Detail</strong> technique:</p>
                <ul>
                    <li><em>Question:</em> "Do you like watching movies?"</li>
                    <li>❌ <em>"Yes."</em> (Stops conversation!)</li>
                    <li>✅ <em>"Yes, I love sci-fi movies, especially Interstellar, because the music is incredible."</em> (Starts conversation!)</li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Coach",
                    text: "What do you like to do on weekends?",
                    audioText: "What do you like to do on weekends?"
                },
                {
                    speaker: "Learner",
                    text: "I usually go jogging in the park because it helps me clear my mind and stay fit.",
                    audioText: "I usually go jogging in the park because it helps me clear my mind and stay fit."
                }
            ],
            keyPhrases: [
                "What do you think about...",
                "How long have you been...",
                "Could you tell me where...",
                "Yes, definitely! In fact..."
            ],
            quiz: [
                {
                    question: "Which question word asks for the reason behind something?",
                    options: ["Why", "Where", "When", "Which"],
                    correctIndex: 0,
                    explanation: "'Why' asks for reasons, explanations, or motives."
                },
                {
                    question: "Which response demonstrates the 'Answer + Detail' conversation technique?",
                    options: [
                        "Yes, I love travelling because I enjoy discovering new cultures and trying local food.",
                        "Yes.",
                        "No.",
                        "Maybe."
                    ],
                    correctIndex: 0,
                    explanation: "Adding the reason and specific details encourages the other person to continue the conversation."
                },
                {
                    question: "Choose the correct question form to ask about someone's origin:",
                    options: [
                        "Where are you from?",
                        "Where you come from?",
                        "Where from you are?",
                        "From where is you?"
                    ],
                    correctIndex: 0,
                    explanation: "'Where are you from?' is the natural and grammatically correct question."
                }
            ],
            speakingPrompt: "Answer this question with at least two sentences: 'What is your favorite season of the year and why?'"
        },
        {
            day: 7,
            title: "Real-Life Conversations & Socializing",
            category: "Fluency",
            duration: "25 mins",
            description: "Speak with natural flow in casual settings: small talk about weather, making weekend plans, expressing opinions, and agreeing/disagreeing politely.",
            objective: "Express your opinions politely and participate in small talk without awkward silences.",
            explanation: `
                <h3>1. Master Small Talk (The Social Icebreaker)</h3>
                <p>Small talk builds connection before getting to business or deeper topics:</p>
                <ul>
                    <li><strong>Weather:</strong> "Lovely weather outside today, isn't it?"</li>
                    <li><strong>Current Event/Location:</strong> "How was your commute this morning?"</li>
                    <li><strong>Compliment:</strong> "I really like your presentation slides; they were very clear."</li>
                </ul>

                <h3>2. Expressing Opinions Politely</h3>
                <ul>
                    <li>"In my opinion, learning English is all about consistency."</li>
                    <li>"From my perspective, daily practice is better than long weekend study."</li>
                    <li>"I personally believe that making mistakes is the best way to learn."</li>
                </ul>

                <h3>3. Agreeing & Disagreeing Politely</h3>
                <ul>
                    <li><strong>Agreeing:</strong> "I completely agree with you!", "That is a great point!"</li>
                    <li><strong>Polite Disagreement:</strong> "I see your point, but on the other hand...", "I understand, however I feel that..."</li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Friend",
                    text: "Do you want to grab lunch together after class?",
                    audioText: "Do you want to grab lunch together after class?"
                },
                {
                    speaker: "Learner",
                    text: "That sounds fantastic! I know a cozy cafe just down the street. Let's go!",
                    audioText: "That sounds fantastic! I know a cozy cafe just down the street. Let's go!"
                }
            ],
            keyPhrases: [
                "In my opinion...",
                "I see your point, but...",
                "That sounds wonderful!",
                "What are your plans for the weekend?"
            ],
            quiz: [
                {
                    question: "How do you politely disagree with someone in a group discussion?",
                    options: [
                        "I see what you mean, but from my experience...",
                        "You are completely wrong!",
                        "Nonsense, that makes zero sense.",
                        "Stop talking."
                    ],
                    correctIndex: 0,
                    explanation: "'I see what you mean, but...' softens the disagreement while respecting their input."
                },
                {
                    question: "Which of these is a great conversation starter for a social event?",
                    options: [
                        "Hi! How is your day going so far?",
                        "How much money do you earn?",
                        "Why are you standing there?",
                        "You look bored."
                    ],
                    correctIndex: 0,
                    explanation: "Asking how someone's day is going is friendly, open, and universally accepted."
                },
                {
                    question: "What does 'That sounds fantastic!' mean?",
                    options: [
                        "I am enthusiastically agreeing to the idea.",
                        "The noise is too loud.",
                        "I don't understand you.",
                        "I have to leave now."
                    ],
                    correctIndex: 0,
                    explanation: "'That sounds fantastic' is an enthusiastic way of accepting an invitation or idea."
                }
            ],
            speakingPrompt: "Share your opinion on whether online learning is better than classroom learning in 2-3 sentences."
        },
        {
            day: 8,
            title: "Speaking About Yourself & Experiences",
            category: "Fluency",
            duration: "25 mins",
            description: "Learn how to tell compelling short stories about past events, your background, challenges you overcame, and your future ambitions.",
            objective: "Use storytelling connectors (First, Suddenly, Then, In the end) to talk about a memorable personal experience.",
            explanation: `
                <h3>1. Storytelling Connectors</h3>
                <p>When sharing a story or experience, sequence words keep your listener engaged:</p>
                <ul>
                    <li><strong>Beginning:</strong> "A few months ago...", "It all started when...", "Initially..."</li>
                    <li><strong>Middle:</strong> "Then suddenly...", "After that...", "Meanwhile...", "Shortly after..."</li>
                    <li><strong>Climax & Conclusion:</strong> "Eventually...", "In the end...", "That experience taught me that..."</li>
                </ul>

                <h3>2. Describing a Challenge You Overcame</h3>
                <p>Use the STAR formula (Situation, Task, Action, Result):</p>
                <ol>
                    <li><strong>Situation:</strong> "Last semester, our team had a major project deadline."</li>
                    <li><strong>Task:</strong> "We were short on time and had to build a complete demo."</li>
                    <li><strong>Action:</strong> "I organized daily quick catch-ups and divided the tasks."</li>
                    <li><strong>Result:</strong> "We finished on time and received top marks!"</li>
                </ol>
            `,
            examples: [
                {
                    speaker: "Learner",
                    text: "Initially, I was terrified of speaking English in public. However, I practiced every single day with this coach, and now I feel much more confident!",
                    audioText: "Initially, I was terrified of speaking English in public. However, I practiced every single day with this coach, and now I feel much more confident!"
                },
                {
                    speaker: "Coach",
                    text: "Inspiring story! Your use of 'initially' and 'however' made the narrative so engaging.",
                    audioText: "Inspiring story! Your use of initially and however made the narrative so engaging."
                }
            ],
            keyPhrases: [
                "It all started when...",
                "Shortly after that...",
                "Eventually, I realized that...",
                "That experience taught me..."
            ],
            quiz: [
                {
                    question: "Which transition word indicates an unexpected turning point in a story?",
                    options: ["Suddenly", "Firstly", "Secondly", "In conclusion"],
                    correctIndex: 0,
                    explanation: "'Suddenly' signals a rapid or unexpected twist in your story."
                },
                {
                    question: "Which sentence correctly reflects on a past lesson learned?",
                    options: [
                        "That experience taught me the value of patience.",
                        "That experience teaches me yesterday.",
                        "That experience is teach me.",
                        "That experience has learn me."
                    ],
                    correctIndex: 0,
                    explanation: "'Taught' is the correct past simple form of 'teach'."
                },
                {
                    question: "What is the best way to open a story about an unforgettable trip?",
                    options: [
                        "Two years ago, I took a memorable trip to the mountains.",
                        "I go trip two years ago.",
                        "Trip was happen to me.",
                        "Trip mountains me go."
                    ],
                    correctIndex: 0,
                    explanation: "Setting the time frame ('Two years ago') and introducing the subject clearly is the standard narrative opener."
                }
            ],
            speakingPrompt: "Tell a brief 3-sentence story about a memorable trip or event you experienced."
        },
        {
            day: 9,
            title: "Interview & Professional English",
            category: "Professional Mastery",
            duration: "30 mins",
            description: "Prepare for job interviews, college vivas, and workplace meetings. Learn how to answer 'Tell me about yourself' and highlight strengths.",
            objective: "Deliver a polished, professional 60-second elevator pitch answering 'Tell me about yourself' without stammering.",
            explanation: `
                <h3>1. Cracking 'Tell Me About Yourself'</h3>
                <p>Do NOT recite your entire resume! Follow the <strong>Past - Present - Future</strong> framework:</p>
                <ul>
                    <li><strong>Present:</strong> "Currently, I am completing my degree in Computer Science at XYZ University."</li>
                    <li><strong>Past:</strong> "Over the past two years, I have built several web applications and honed my problem-solving skills."</li>
                    <li><strong>Future:</strong> "I am excited about this role because it allows me to combine my passion for coding with real-world impact."</li>
                </ul>

                <h3>2. Highlighting Your Strengths with Evidence</h3>
                <ul>
                    <li>❌ <em>"I am very hardworking."</em> (Too generic!)</li>
                    <li>✅ <em>"One of my key strengths is adaptability. For example, when our project requirements changed last month, I quickly learned a new framework and kept our team on schedule."</em></li>
                </ul>

                <h3>3. Asking Thoughtful Questions to the Interviewer</h3>
                <ul>
                    <li>"What does success look like in this role over the first 90 days?"</li>
                    <li>"What opportunities are there for ongoing learning and mentorship?"</li>
                </ul>
            `,
            examples: [
                {
                    speaker: "Interviewer",
                    text: "Why should we hire you for this position?",
                    audioText: "Why should we hire you for this position?"
                },
                {
                    speaker: "Candidate",
                    text: "I bring a strong foundation in problem-solving, a dedication to clean work, and an eagerness to learn from your experienced team.",
                    audioText: "I bring a strong foundation in problem-solving, a dedication to clean work, and an eagerness to learn from your experienced team."
                }
            ],
            keyPhrases: [
                "Currently, I am focused on...",
                "One of my key strengths is...",
                "I am eager to contribute to...",
                "Could you share more about the team culture?"
            ],
            quiz: [
                {
                    question: "What is the recommended framework for answering 'Tell me about yourself'?",
                    options: [
                        "Present - Past - Future",
                        "Childhood - Hobbies - Complaints",
                        "Salary - Hours - Vacation",
                        "Memorized entire resume line by line"
                    ],
                    correctIndex: 0,
                    explanation: "Present (where you are now), Past (relevant experience/skills), Future (why you're here and excited)."
                },
                {
                    question: "How should you back up a claimed strength in an interview?",
                    options: [
                        "By providing a short concrete example demonstrating the skill.",
                        "By repeating the word five times.",
                        "By saying someone else told you that.",
                        "By promising you are the best person alive."
                    ],
                    correctIndex: 0,
                    explanation: "Concrete examples prove your claims and make your answer credible and memorable."
                },
                {
                    question: "Choose the most professional closing statement for an interview:",
                    options: [
                        "Thank you very much for your time today. I look forward to hearing from you!",
                        "Okay, call me when you decide.",
                        "Give me the job, please.",
                        "See you later, hope you choose me."
                    ],
                    correctIndex: 0,
                    explanation: "Expressing gratitude and professional enthusiasm leaves a stellar final impression."
                }
            ],
            speakingPrompt: "Answer the interview question: 'What is one of your greatest strengths?' with a brief supporting example."
        },
        {
            day: 10,
            title: "Final Speaking Challenge & Capstone",
            category: "Graduation",
            duration: "30 mins",
            description: "Put everything together! Take on the comprehensive 10-day speaking challenge, test your fluency, and claim your Certificate of Completion.",
            objective: "Speak continuously for 2 minutes on a given topic, celebrate your 10-day growth, and download your graduation certificate.",
            explanation: `
                <h3>Congratulations on Reaching Day 10! 🎉</h3>
                <p>Over the last 10 days, you have systematically developed your English communication abilities:</p>
                <ul>
                    <li>Day 1: Clean Greetings & Introductions</li>
                    <li>Day 2: Polite Daily Sentences & Requests</li>
                    <li>Day 3: Solid S-V-O Sentence Structure & Articles</li>
                    <li>Day 4: Confident Past, Present & Future Tenses</li>
                    <li>Day 5: Expressive Vocabulary & Collocations</li>
                    <li>Day 6: Engaging Questions & The Answer+Detail technique</li>
                    <li>Day 7: Smooth Real-Life Socializing & Small Talk</li>
                    <li>Day 8: Engaging Personal Storytelling</li>
                    <li>Day 9: Sharp Professional & Interview Skills</li>
                </ul>

                <h3>Your Final Challenge: The 2-Minute Speech</h3>
                <p>Choose one of the following capstone topics to discuss with your AI Coach in the Chat section:</p>
                <ol>
                    <li><strong>My 10-Day Journey:</strong> What was the most valuable lesson you learned, and how has your confidence grown?</li>
                    <li><strong>My Dream Career:</strong> Where do you see yourself in 3 years, and how will English help you succeed?</li>
                </ol>
            `,
            examples: [
                {
                    speaker: "Coach",
                    text: "Welcome to Day 10! You have worked so hard to build your speaking confidence. Are you ready for your final challenge?",
                    audioText: "Welcome to Day 10! You have worked so hard to build your speaking confidence. Are you ready for your final challenge?"
                },
                {
                    speaker: "Learner",
                    text: "Yes, Coach! I feel ready, proud of my progress, and excited to speak with confidence!",
                    audioText: "Yes, Coach! I feel ready, proud of my progress, and excited to speak with confidence!"
                }
            ],
            keyPhrases: [
                "Throughout this 10-day challenge...",
                "I have noticed a significant improvement in...",
                "Moving forward, I will continue to...",
                "I am confident in my ability to express myself."
            ],
            quiz: [
                {
                    question: "What is the single most important habit for maintaining spoken English fluency?",
                    options: [
                        "Consistent daily speaking practice without fear of making mistakes.",
                        "Memorizing a dictionary once every six months.",
                        "Only speaking English when you have 100% perfect grammar.",
                        "Never practicing out loud."
                    ],
                    correctIndex: 0,
                    explanation: "Consistency and speaking without fear of mistakes are the universal keys to true conversational fluency."
                },
                {
                    question: "When you make a small mistake while speaking in public, what should you do?",
                    options: [
                        "Calmly correct yourself or keep going with a smile.",
                        "Freeze, stop speaking, and apologize profusely.",
                        "Leave the room immediately.",
                        "Vow never to speak English again."
                    ],
                    correctIndex: 0,
                    explanation: "Everyone makes mistakes, even native speakers! Calmly rephrase or keep the conversation flowing."
                },
                {
                    question: "How do you celebrate completing the 10-Day English Speaking Challenge?",
                    options: [
                        "Download my Certificate of Completion and keep practicing daily!",
                        "Delete everything and forget English.",
                        "Pretend it never happened.",
                        "Stop speaking forever."
                    ],
                    correctIndex: 0,
                    explanation: "Claim your certificate, celebrate your dedication, and keep practicing to stay sharp!"
                }
            ],
            speakingPrompt: "Share a 3-sentence summary of how this 10-day challenge helped your confidence in speaking English."
        }
    ],

    // Curated Vocabulary Database (50+ words across days & topics)
    vocabulary: [
        {
            id: "v1",
            word: "Confident",
            phonetic: "/ ˈkɑːn.fə.dənt /",
            pos: "adjective",
            category: "Personal Growth",
            day: 1,
            meaning: "Feeling sure about your own abilities or qualities.",
            example: "With daily practice, she became much more confident speaking English in meetings.",
            synonyms: ["assured", "poised", "bold"]
        },
        {
            id: "v2",
            word: "Greet",
            phonetic: "/ ɡriːt /",
            pos: "verb",
            category: "Greetings",
            day: 1,
            meaning: "To welcome or say hello to someone when you meet them.",
            example: "He greeted the interviewer with a firm handshake and a warm smile.",
            synonyms: ["welcome", "salute", "address"]
        },
        {
            id: "v3",
            word: "Introduce",
            phonetic: "/ ˌɪn.trəˈduːs /",
            pos: "verb",
            category: "Greetings",
            day: 1,
            meaning: "To tell people someone's name and details when they meet for the first time.",
            example: "Let me introduce you to my colleague who works in marketing.",
            synonyms: ["present", "acquaint"]
        },
        {
            id: "v4",
            word: "Appreciate",
            phonetic: "/ əˈpriː.ʃi.eɪt /",
            pos: "verb",
            category: "Daily Life",
            day: 2,
            meaning: "To recognize the good qualities of someone or be thankful for their help.",
            example: "I truly appreciate your guidance on this difficult assignment.",
            synonyms: ["value", "treasure", "be grateful for"]
        },
        {
            id: "v5",
            word: "Polite",
            phonetic: "/ pəˈlaɪt /",
            pos: "adjective",
            category: "Daily Life",
            day: 2,
            meaning: "Having or showing good manners and respect for other people.",
            example: "Saying 'please' and 'thank you' is a simple way to be polite.",
            synonyms: ["courteous", "respectful", "civil"]
        },
        {
            id: "v6",
            word: "Routine",
            phonetic: "/ ruːˈtiːn /",
            pos: "noun",
            category: "Daily Life",
            day: 2,
            meaning: "A usual sequence of activities or habits done regularly.",
            example: "My morning routine includes a 20-minute walk and an English listening lesson.",
            synonyms: ["pattern", "regime", "habit"]
        },
        {
            id: "v7",
            word: "Structure",
            phonetic: "/ ˈstrʌk.tʃɚ /",
            pos: "noun",
            category: "Grammar",
            day: 3,
            meaning: "The way in which parts are arranged to form a whole.",
            example: "Understanding sentence structure makes it easier to write clearly.",
            synonyms: ["framework", "organization", "arrangement"]
        },
        {
            id: "v8",
            word: "Construct",
            phonetic: "/ kənˈstrʌkt /",
            pos: "verb",
            category: "Grammar",
            day: 3,
            meaning: "To build or put together parts systematically.",
            example: "Try to construct complex sentences by combining two simple ideas.",
            synonyms: ["build", "assemble", "form"]
        },
        {
            id: "v9",
            word: "Accurate",
            phonetic: "/ ˈæk.jɚ.ət /",
            pos: "adjective",
            category: "Grammar",
            day: 3,
            meaning: "Correct, exact, and free from errors.",
            example: "His explanation was accurate and helped everyone understand.",
            synonyms: ["precise", "correct", "flawless"]
        },
        {
            id: "v10",
            word: "Irregular",
            phonetic: "/ ɪˈreɡ.jə.lɚ /",
            pos: "adjective",
            category: "Grammar",
            day: 4,
            meaning: "Not following normal rules or regular patterns.",
            example: "'Went', 'bought', and 'ate' are irregular past tense verbs.",
            synonyms: ["unconventional", "abnormal", "variable"]
        },
        {
            id: "v11",
            word: "Consistency",
            phonetic: "/ kənˈsɪs.tən.si /",
            pos: "noun",
            category: "Personal Growth",
            day: 4,
            meaning: "The quality of regularly doing something the same way over time.",
            example: "Consistency in daily practice is the secret to fluent speech.",
            synonyms: ["steadiness", "regularity", "dedication"]
        },
        {
            id: "v12",
            word: "Collocation",
            phonetic: "/ ˌkɑː.ləˈkeɪ.ʃən /",
            pos: "noun",
            category: "Vocabulary",
            day: 5,
            meaning: "A natural combination of words that closely occur together in speech.",
            example: "'Make a decision' is a natural English collocation.",
            synonyms: ["word pairing", "phrase"]
        },
        {
            id: "v13",
            word: "Exhausted",
            phonetic: "/ ɪɡˈzɑː.stɪd /",
            pos: "adjective",
            category: "Vocabulary",
            day: 5,
            meaning: "Extremely tired, having no energy left.",
            example: "After running five miles, he was completely exhausted.",
            synonyms: ["drained", "fatigued", "spent"]
        },
        {
            id: "v14",
            word: "Thrilled",
            phonetic: "/ θrɪld /",
            pos: "adjective",
            category: "Vocabulary",
            day: 5,
            meaning: "Extremely excited and happy about something.",
            example: "I was thrilled to receive positive feedback on my speech.",
            synonyms: ["delighted", "overjoyed", "ecstatic"]
        },
        {
            id: "v15",
            word: "Crucial",
            phonetic: "/ ˈkruː.ʃəl /",
            pos: "adjective",
            category: "Vocabulary",
            day: 5,
            meaning: "Extremely important or necessary for success.",
            example: "Listening carefully is a crucial part of effective communication.",
            synonyms: ["essential", "vital", "critical"]
        },
        {
            id: "v16",
            word: "Inquire",
            phonetic: "/ ɪnˈkwaɪr /",
            pos: "verb",
            category: "Conversational Flow",
            day: 6,
            meaning: "To ask someone for information politely.",
            example: "She phoned the office to inquire about the course schedule.",
            synonyms: ["ask", "query", "investigate"]
        },
        {
            id: "v17",
            word: "Elaborate",
            phonetic: "/ iˈlæb.ə.reɪt /",
            pos: "verb",
            category: "Conversational Flow",
            day: 6,
            meaning: "To add more information or explain something in greater detail.",
            example: "Could you elaborate on that point? It sounds fascinating.",
            synonyms: ["expand", "clarify", "detail"]
        },
        {
            id: "v18",
            word: "Perspective",
            phonetic: "/ pɚˈspek.tɪv /",
            pos: "noun",
            category: "Fluency",
            day: 7,
            meaning: "A particular way of viewing things or personal opinion.",
            example: "From my perspective, travel broadens one's worldview.",
            synonyms: ["viewpoint", "standpoint", "outlook"]
        },
        {
            id: "v19",
            word: "Engage",
            phonetic: "/ ɪnˈɡeɪdʒ /",
            pos: "verb",
            category: "Fluency",
            day: 7,
            meaning: "To participate or become actively involved in a conversation.",
            example: "He knows how to engage listeners with lively humor.",
            synonyms: ["participate", "involve", "interact"]
        },
        {
            id: "v20",
            word: "Memorable",
            phonetic: "/ ˈmem.ər.ə.bəl /",
            pos: "adjective",
            category: "Fluency",
            day: 8,
            meaning: "Worth remembering or easily remembered because it was special.",
            example: "Our college trip to the coastal village was truly memorable.",
            synonyms: ["unforgettable", "noteworthy", "remarkable"]
        },
        {
            id: "v21",
            word: "Overcome",
            phonetic: "/ ˌoʊ.vɚˈkʌm /",
            pos: "verb",
            category: "Personal Growth",
            day: 8,
            meaning: "To successfully deal with a problem or difficulty.",
            example: "She overcame her stage fright by practicing in front of a mirror.",
            synonyms: ["conquer", "surmount", "triumph over"]
        },
        {
            id: "v22",
            word: "Adaptability",
            phonetic: "/ əˌdæp.təˈbɪl.ə.t̬i /",
            pos: "noun",
            category: "Professional Mastery",
            day: 9,
            meaning: "The ability to adjust easily to new conditions or changes.",
            example: "Employers highly value adaptability in today's dynamic workplace.",
            synonyms: ["flexibility", "versatility", "resilience"]
        },
        {
            id: "v23",
            word: "Collaborate",
            phonetic: "/ kəˈlæb.ə.reɪt /",
            pos: "verb",
            category: "Professional Mastery",
            day: 9,
            meaning: "To work together with someone to produce or achieve something.",
            example: "We collaborated with the design team to build this application.",
            synonyms: ["cooperate", "partner", "team up"]
        },
        {
            id: "v24",
            word: "Fluency",
            phonetic: "/ ˈfluː.ən.si /",
            pos: "noun",
            category: "Graduation",
            day: 10,
            meaning: "The ability to speak or write a language easily and smoothly.",
            example: "His spoken English fluency improved dramatically in just ten days.",
            synonyms: ["smoothness", "articulateness", "eloquence"]
        },
        {
            id: "v25",
            word: "Accomplish",
            phonetic: "/ əˈkɑːm.plɪʃ /",
            pos: "verb",
            category: "Graduation",
            day: 10,
            meaning: "To achieve or complete something successfully.",
            example: "You have accomplished a great deal by finishing this challenge!",
            synonyms: ["achieve", "fulfill", "attain"]
        },
        {
            id: "v26",
            word: "Eloquent",
            phonetic: "/ ˈel.ə.kwənt /",
            pos: "adjective",
            category: "Fluency",
            day: 7,
            meaning: "Fluent, persuasive, and graceful in speaking or writing.",
            example: "He gave an eloquent speech that moved the entire audience.",
            synonyms: ["articulate", "expressive", "persuasive"]
        },
        {
            id: "v27",
            word: "Articulate",
            phonetic: "/ ɑːrˈtɪk.jə.lət /",
            pos: "adjective",
            category: "Professional Mastery",
            day: 9,
            meaning: "Able to express thoughts and ideas clearly and effectively.",
            example: "An articulate speaker makes complicated topics easy to understand.",
            synonyms: ["clear", "lucid", "coherent"]
        },
        {
            id: "v28",
            word: "Perseverance",
            phonetic: "/ ˌpɝː.səˈvɪr.əns /",
            pos: "noun",
            category: "Personal Growth",
            day: 10,
            meaning: "Continued effort to do something despite difficulties or obstacles.",
            example: "Through patience and perseverance, she mastered the English language.",
            synonyms: ["persistence", "determination", "grit"]
        },
        {
            id: "v29",
            word: "Spontaneous",
            phonetic: "/ spɑːnˈteɪ.ni.əs /",
            pos: "adjective",
            category: "Fluency",
            day: 7,
            meaning: "Happening naturally without being planned ahead of time.",
            example: "A spontaneous chat with a tourist turned into a great speaking session.",
            synonyms: ["unplanned", "impromptu", "natural"]
        },
        {
            id: "v30",
            word: "Hesitate",
            phonetic: "/ ˈhez.ə.teɪt /",
            pos: "verb",
            category: "Personal Growth",
            day: 1,
            meaning: "To pause before saying or doing something due to uncertainty or fear.",
            example: "Do not hesitate to speak up, even if you are not sure of every word.",
            synonyms: ["waver", "falter", "pause"]
        }
    ],

    // Real-Life Speaking Scenarios (For roleplay practice)
    scenarios: [
        {
            id: "restaurant",
            title: "Ordering Food at a Restaurant",
            icon: "🍽️",
            badge: "Beginner Friendly",
            level: "Beginner",
            description: "Practice greeting the waiter, asking about today's specials, ordering food & drinks, and requesting the bill politely.",
            coachRole: "Friendly Restaurant Waiter at 'The Bistro'",
            userRole: "Customer",
            introMessage: "Welcome to The Bistro! 🍽️ I'll be your waiter today. Can I start you off with something refreshing to drink?",
            keyVocab: ["May I have...", "What do you recommend?", "Could we get the bill?", "Is this dish spicy?"],
            sampleTurn: [
                "I would like a glass of iced lemon tea, please.",
                "What is today's special dish?",
                "Could I get the grilled chicken with roasted vegetables?",
                "Could we please have the bill whenever you have a moment?"
            ]
        },
        {
            id: "directions",
            title: "Asking for Directions in a City",
            icon: "🗺️",
            badge: "Everyday Travel",
            level: "Beginner",
            description: "Learn how to politely stop a passerby, ask how to reach landmarks, understand spatial terms, and thank them.",
            coachRole: "Helpful Local Resident in Downtown",
            userRole: "Visitor / Tourist",
            introMessage: "Excuse me! Are you looking for something around downtown? I know this city very well. How can I help you?",
            keyVocab: ["Excuse me, could you tell me...", "Is it within walking distance?", "How far is it?", "Take the second turn on the left"],
            sampleTurn: [
                "Excuse me! Could you tell me where the nearest metro station is?",
                "Is it within walking distance from here?",
                "Thank you so much for your help! Have a wonderful day."
            ]
        },
        {
            id: "friends",
            title: "Talking with Friends & Making Plans",
            icon: "☕",
            badge: "Casual Social",
            level: "Intermediate",
            description: "Practice casual weekend catch-ups, talking about movies, agreeing on cafe plans, and sharing what you did recently.",
            coachRole: "Close College Friend (Sam)",
            userRole: "Friend",
            introMessage: "Hey! Long time no see! How has your week been going? Did you manage to finish all your assignments?",
            keyVocab: ["What have you been up to?", "That sounds like a plan!", "Are you free this weekend?", "Let's grab a coffee."],
            sampleTurn: [
                "Hey Sam! My week was quite hectic, but I finally finished everything.",
                "Are you free this Saturday afternoon? We could grab coffee at that new cafe.",
                "That sounds like a great plan! What time works best for you?"
            ]
        },
        {
            id: "teacher",
            title: "Talking to Teachers / Professors",
            icon: "🎓",
            badge: "Academic",
            level: "Intermediate",
            description: "Practice polite academic communication: asking for assignment clarification, requesting deadline extensions, and office hours.",
            coachRole: "Professor Henderson (Course Advisor)",
            userRole: "University Student",
            introMessage: "Good afternoon! Please, have a seat. What brings you to my office hours today?",
            keyVocab: ["I was hoping to clarify...", "Would it be possible to...", "I wanted to ask your feedback on...", "Thank you for your time."],
            sampleTurn: [
                "Good afternoon, Professor. Thank you for meeting with me.",
                "I was hoping to clarify the requirements for the final research essay.",
                "Would it be possible to submit a rough draft for your feedback beforehand?"
            ]
        },
        {
            id: "interview",
            title: "Job Interview Practice",
            icon: "💼",
            badge: "Career Ready",
            level: "Advanced",
            description: "Train for a real job or internship interview: introducing yourself, explaining strengths, and answering situational questions.",
            coachRole: "HR Hiring Manager at TechVanguard",
            userRole: "Job Applicant",
            introMessage: "Good morning! Thank you for joining us today for this interview. To begin, could you please tell me a little about yourself and your background?",
            keyVocab: ["My background is in...", "One of my core strengths is...", "I am passionate about...", "In my previous project, I..."],
            sampleTurn: [
                "Good morning! Thank you for this opportunity. I am currently completing my degree in Computer Science...",
                "One of my core strengths is problem-solving and rapid learning.",
                "I am eager to contribute to your engineering team."
            ]
        },
        {
            id: "self_intro",
            title: "Introducing Yourself to New People",
            icon: "🤝",
            badge: "Essential Foundation",
            level: "Beginner",
            description: "Practice introducing your name, hometown, education/work, and hobbies with confidence to a new acquaintance.",
            coachRole: "Friendly Peer at a Social Event (Alex)",
            userRole: "New Acquaintance",
            introMessage: "Hi there! I don't think we've met yet. I'm Alex! It's great to meet you. What brings you to this meetup today?",
            keyVocab: ["My name is...", "I am from...", "Currently I am studying...", "Nice to meet you!"],
            sampleTurn: [
                "Hi Alex! Nice to meet you too. My name is...",
                "I am currently a student studying in college.",
                "In my free time, I really enjoy sports and practicing English. How about you?"
            ]
        },
        {
            id: "shopping",
            title: "Shopping at a Clothing Store",
            icon: "🛍️",
            badge: "Everyday Life",
            level: "Beginner",
            description: "Practice asking for sizes, checking prices, inquiring about discounts, and trying items in the fitting room.",
            coachRole: "Retail Store Assistant",
            userRole: "Shopper",
            introMessage: "Hello! Welcome to Urban Style. Let me know if you are looking for anything specific today!",
            keyVocab: ["Do you have this in medium?", "Where is the fitting room?", "Is there any discount on this?", "I'll take it!"],
            sampleTurn: [
                "Hi! Excuse me, do you have this blue jacket in a medium size?",
                "Could you tell me where the fitting rooms are located?",
                "It fits great! I'll take it, thank you."
            ]
        }
    ],

    // Client-Side Grammar Correction Rules Engine
    grammarRules: [
        {
            id: "past_go",
            regex: /\b(yesterday|last\s+(?:week|month|year|night|weekend))\s+(?:i|we|they|he|she)\s+go\b/i,
            replace: (match) => match.replace(/\bgo\b/i, "went"),
            ruleName: "Past Tense Required",
            explanation: "When you refer to past time periods like 'yesterday' or 'last week', use the past tense 'went' instead of present 'go'.",
            example: "Yesterday I went to college (not 'Yesterday I go')."
        },
        {
            id: "yesterday_i_go",
            regex: /\bi\s+go\s+(?:to\s+)?(college|school|work|market|store|office|party|gym)\s+(yesterday|last\s+(?:week|night|month))\b/i,
            replace: (match) => match.replace(/\bgo\b/i, "went"),
            ruleName: "Past Tense Required",
            explanation: "Since the action took place yesterday, change 'go' to 'went'.",
            example: "I went to college yesterday."
        },
        {
            id: "did_went",
            regex: /\bdid\s+(?:you|he|she|they|we|i)\s+(went|saw|ate|bought|did|spoke)\b/i,
            fixMap: { went: "go", saw: "see", ate: "eat", bought: "buy", did: "do", spoke: "speak" },
            ruleName: "Auxiliary Verb Rule (Did + Base Verb)",
            explanation: "After the past auxiliary 'did' or 'didn't', the main verb must always be in its base form, not past tense.",
            example: "Did you go? (not 'Did you went?'). I didn't see it (not 'I didn't saw it')."
        },
        {
            id: "he_she_dont",
            regex: /\b(he|she|it|my\s+friend|my\s+brother|my\s+sister|the\s+teacher)\s+don't\b/i,
            replace: (match) => match.replace(/don't/i, "doesn't"),
            ruleName: "Subject-Verb Agreement (Third Person Singular)",
            explanation: "With third-person singular subjects (he, she, it, singular nouns), use 'doesn't' instead of 'don't'.",
            example: "He doesn't like coffee (not 'He don't like')."
        },
        {
            id: "he_she_base_verb",
            regex: /\b(he|she|my\s+father|my\s+mother|my\s+friend)\s+(like|want|know|live|work|play|speak)\s+(to|a|an|the|in|at|english|coffee|tennis)\b/i,
            replace: (match, p1, p2, p3) => `${p1} ${p2}s ${p3}`,
            ruleName: "Third-Person Singular -s Ending",
            explanation: "In the present simple tense, third-person singular subjects (he, she, it) require the verb to end in -s or -es.",
            example: "She speaks English (not 'She speak English'). He likes coffee."
        },
        {
            id: "i_am_agree",
            regex: /\bi\s+am\s+agree\b/i,
            replace: () => "I agree",
            ruleName: "'Agree' is a Verb, Not an Adjective",
            explanation: "'Agree' is already a verb in English. You don't need the helper 'am'. Say 'I agree' or 'I don't agree'.",
            example: "I agree with your suggestion (not 'I am agree')."
        },
        {
            id: "listen_music",
            regex: /\blisten(?:ing)?\s+music\b/i,
            replace: (match) => match.toLowerCase().includes("listening") ? "listening to music" : "listen to music",
            ruleName: "Preposition with 'Listen'",
            explanation: "The verb 'listen' is always followed by the preposition 'to' when mentioning what you hear.",
            example: "I love to listen to music (not 'listen music')."
        },
        {
            id: "married_with",
            regex: /\bmarried\s+with\b/i,
            replace: () => "married to",
            ruleName: "Correct Preposition: 'Married to'",
            explanation: "In English, we say someone is 'married to' their spouse, not 'married with'.",
            example: "She is married to a doctor."
        },
        {
            id: "good_in",
            regex: /\bgood\s+in\s+(english|math|science|sports|cooking|coding|singing)\b/i,
            replace: (match, p1) => `good at ${p1}`,
            ruleName: "Ability Preposition: 'Good at'",
            explanation: "When describing a skill or proficiency, the natural English preposition is 'good at', not 'good in'.",
            example: "He is good at English and mathematics."
        },
        {
            id: "article_a_apple",
            regex: /\ba\s+(apple|orange|egg|elephant|interview|idea|island|umbrella|hour|opportunity)\b/i,
            replace: (match, p1) => `an ${p1}`,
            ruleName: "Article 'An' Before Vowel Sounds",
            explanation: "Use 'an' instead of 'a' before words that start with a vowel sound (a, e, i, o, u, or silent h).",
            example: "She ate an apple and scheduled an interview."
        },
        {
            id: "article_an_university",
            regex: /\ban\s+(university|unicorn|european|user|unit)\b/i,
            replace: (match, p1) => `a ${p1}`,
            ruleName: "Article 'A' Before Consonant 'Y' Sounds",
            explanation: "Words like 'university' and 'user' begin with a 'yoo' consonant sound, so we use 'a', not 'an'.",
            example: "She attends a university (sounds like 'yoo-ni-ver-si-ty')."
        },
        {
            id: "many_furnitures",
            regex: /\b(many|two|three)\s+furnitures\b/i,
            replace: () => "pieces of furniture",
            ruleName: "Uncountable Noun: Furniture",
            explanation: "'Furniture' is an uncountable noun in English. It never takes an 's'. Use 'pieces of furniture' or just 'furniture'.",
            example: "We bought some new furniture for our room."
        },
        {
            id: "an_advice",
            regex: /\ban\s+advice\b/i,
            replace: () => "some advice",
            ruleName: "Uncountable Noun: Advice",
            explanation: "'Advice' is uncountable in English. Say 'a piece of advice' or 'some advice', not 'an advice'.",
            example: "My teacher gave me some wonderful advice."
        },
        {
            id: "informations",
            regex: /\binformations\b/i,
            replace: () => "information",
            ruleName: "Uncountable Noun: Information",
            explanation: "'Information' is uncountable. It cannot be pluralized with an 's'.",
            example: "Could you share more information about the project?"
        },
        {
            id: "double_negative",
            regex: /\bi\s+don't\s+know\s+nothing\b/i,
            replace: () => "I don't know anything",
            ruleName: "Avoid Double Negatives",
            explanation: "Two negatives ('don't' + 'nothing') cancel each other out in standard English. Use 'anything' with negative verbs.",
            example: "I don't know anything about that."
        },
        {
            id: "can_to_swim",
            regex: /\bcan\s+to\s+(swim|go|speak|run|drive|cook|help)\b/i,
            replace: (match, p1) => `can ${p1}`,
            ruleName: "Modal Verbs Do Not Take 'To'",
            explanation: "Modal verbs like 'can', 'could', 'must', 'should', and 'will' are followed directly by the base verb without 'to'.",
            example: "I can swim very well (not 'I can to swim')."
        },
        {
            id: "your_youre",
            regex: /\byour\s+(welcome|right|wrong|very\s+kind|the\s+best)\b/i,
            replace: (match, p1) => `you're ${p1}`,
            ruleName: "Your vs. You're Confusion",
            explanation: "'You're' is the contraction of 'you are'. 'Your' indicates possession (e.g. 'your book').",
            example: "You're welcome! / You're right!"
        },
        {
            id: "there_their",
            regex: /\btheir\s+(is|are|was|were)\b/i,
            replace: (match, p1) => `there ${p1}`,
            ruleName: "There vs. Their Confusion",
            explanation: "Use 'there' for locations or existence ('there is/are'). Use 'their' to show possession ('their car').",
            example: "There is a great cafe around the corner."
        },
        {
            id: "loose_lose",
            regex: /\b(don't|did\s+not|might)\s+loose\b/i,
            replace: (match, p1) => `${p1} lose`,
            ruleName: "Loose vs. Lose Confusion",
            explanation: "'Lose' (one 'o') is a verb meaning to misplace or suffer defeat. 'Loose' (two 'o's) means not tight.",
            example: "Don't lose your confidence!"
        },
        {
            id: "people_is",
            regex: /\b(people|many\s+people)\s+is\b/i,
            replace: (match, p1) => `${p1} are`,
            ruleName: "Plural Subject: 'People Are'",
            explanation: "'People' is a plural noun in English, so it takes the plural verb 'are' (or 'were'), not 'is'.",
            example: "People are very friendly here (not 'People is')."
        },
        {
            id: "discuss_about",
            regex: /\bdiscuss\s+about\b/i,
            replace: () => "discuss",
            ruleName: "Redundant Preposition: 'Discuss'",
            explanation: "The verb 'discuss' already means 'talk about'. Do not add 'about' after it.",
            example: "Let's discuss the project (not 'discuss about the project')."
        },
        {
            id: "return_back",
            regex: /\breturn\s+back\b/i,
            replace: () => "return",
            ruleName: "Redundancy: 'Return Back'",
            explanation: "'Return' already means to go or come back. Adding 'back' is redundant.",
            example: "I will return tomorrow (not 'return back')."
        },
        {
            id: "have_years_old",
            regex: /\bi\s+have\s+(\d+|twenty|twenty-one|twenty-two|eighteen|nineteen)\s+years\s+old\b/i,
            replace: (match, p1) => `I am ${p1} years old`,
            ruleName: "Expressing Age: 'I am ... years old'",
            explanation: "In English, we use the verb 'to be' (I am, She is) to state age, not 'have'.",
            example: "I am 20 years old (not 'I have 20 years old')."
        }
    ],

    // Motivational Quotes & Daily Speaking Tips
    motivationalQuotes: [
        {
            quote: "Do not be afraid of mistakes. Mistakes are the stepping stones to English fluency.",
            author: "Coach Maya"
        },
        {
            quote: "Fluency is not about speaking without errors; it is about communicating your ideas with clarity and confidence.",
            author: "Language Learning Principle"
        },
        {
            quote: "Consistency for 15 minutes a day will transform your speaking skills faster than 3 hours once a week.",
            author: "Antigravity Coach"
        },
        {
            quote: "Speak as much as you can, whenever you can. Your voice deserves to be heard!",
            author: "Communication Wisdom"
        },
        {
            quote: "Every expert speaker was once a beginner who refused to quit.",
            author: "Helen Hayes"
        },
        {
            quote: "Confidence comes from action. The more sentences you speak out loud, the easier it gets.",
            author: "Speaking Mastery"
        }
    ],

    dailyTips: [
        "💡 <strong>Today's Tip:</strong> Record yourself speaking for 60 seconds on your phone. Listen back to observe your rhythm and pacing!",
        "💡 <strong>Today's Tip:</strong> When learning a new word, always learn it inside a complete sentence rather than in isolation.",
        "💡 <strong>Today's Tip:</strong> Replace 1-word answers with the 'Answer + Reason' formula to sound instantly more engaging.",
        "💡 <strong>Today's Tip:</strong> Don't apologize for your English. Simply smile, speak slowly, and keep communicating!",
        "💡 <strong>Today's Tip:</strong> Read 5 lines of an English article out loud every morning to train your facial muscles."
    ]
};

// Export to window for global browser access
if (typeof window !== "undefined") {
    window.APP_DATA = APP_DATA;
}
