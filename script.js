/**
 * AI English Speaking Coach - Main Application Controller
 * Coordinates UI Navigation, LocalStorage State, Speech (TTS/STT),
 * Lesson Modals, Vocabulary Quizzes, Grammar Checker, and Confetti.
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. STATE & STORAGE MANAGEMENT
    // =========================================================================

    const STORAGE_KEY = "speakease_english_coach_data";

    // Default Application State
    const defaultState = {
        profile: {
            name: "Learner",
            level: "Beginner",
            streak: 1,
            lastActiveDate: new Date().toISOString().split("T")[0],
            isOnboarded: false
        },
        progress: {
            unlockedDay: 1,
            completedDays: [], // [1, 2, ...]
            testUnlockAll: false,
            quizzesPassed: 0,
            grammarErrorsCorrected: 0,
            totalTurns: 0
        },
        vocabulary: {
            favorites: [], // array of vocab IDs
            learned: []
        },
        chatHistory: [],
        settings: {
            theme: "light",
            ttsEnabled: true,
            ttsSpeed: 1.0
        }
    };

    // Load state from localStorage or initialize with defaults
    let state = loadState();

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return {
                    ...defaultState,
                    ...parsed,
                    profile: { ...defaultState.profile, ...(parsed.profile || {}) },
                    progress: { ...defaultState.progress, ...(parsed.progress || {}) },
                    vocabulary: { ...defaultState.vocabulary, ...(parsed.vocabulary || {}) },
                    settings: { ...defaultState.settings, ...(parsed.settings || {}) }
                };
            }
        } catch (e) {
            console.error("Failed to load state from localStorage:", e);
        }
        return JSON.parse(JSON.stringify(defaultState));
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Failed to save state:", e);
        }
        syncUI();
    }

    // Daily streak check
    function updateDailyStreak() {
        const today = new Date().toISOString().split("T")[0];
        const last = state.profile.lastActiveDate;

        if (last !== today) {
            const lastDate = new Date(last);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                state.profile.streak += 1;
            } else if (diffDays > 1) {
                state.profile.streak = 1;
            }
            state.profile.lastActiveDate = today;
            saveState();
        }
    }
    updateDailyStreak();

    // Instantiate Chatbot AI Coach
    const coachAI = new SpeakingCoachAI();
    coachAI.init(state.profile);

    // =========================================================================
    // 2. SPEECH SYNTHESIS (TTS) & RECOGNITION (STT)
    // =========================================================================

    const synth = window.speechSynthesis;
    let preferredVoice = null;

    function initVoices() {
        if (!synth) return;
        const voices = synth.getVoices();
        // Look for English natural voice
        preferredVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Zira"))) ||
                         voices.find(v => v.lang.startsWith("en")) ||
                         voices[0];
    }
    if (synth) {
        initVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = initVoices;
        }
    }

    function speakText(text, rate = 1.0) {
        if (!synth || !text) return;
        synth.cancel(); // Stop any currently playing speech

        // Strip markdown stars/formatting for clean speech
        const clean = text.replace(/[*_#`~[\]]/g, "").replace(/https?:\/\/\S+/g, "").trim();
        const utterance = new SpeechSynthesisUtterance(clean);
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = rate || state.settings.ttsSpeed || 1.0;
        utterance.pitch = 1.0;
        synth.speak(utterance);
    }

    // Speech-to-Text Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isRecording = false;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            isRecording = true;
            const micBtn = document.getElementById("mic-btn");
            const sttStatus = document.getElementById("stt-status");
            if (micBtn) micBtn.classList.add("recording");
            if (sttStatus) sttStatus.style.display = "flex";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById("chat-input");
            if (chatInput) {
                chatInput.value = transcript;
                chatInput.focus();
            }
            showToast(`Voice captured: "${transcript}"`, "info");
        };

        recognition.onerror = (event) => {
            console.warn("Speech recognition error:", event.error);
            showToast("Microphone error or permission denied.", "warning");
            stopSTT();
        };

        recognition.onend = () => {
            stopSTT();
        };
    }

    function toggleSTT() {
        if (!recognition) {
            showToast("Speech recognition is not supported in this browser. Please use Chrome or Edge.", "warning");
            return;
        }
        if (isRecording) {
            recognition.stop();
            stopSTT();
        } else {
            try {
                recognition.start();
            } catch (err) {
                console.warn(err);
                stopSTT();
            }
        }
    }

    function stopSTT() {
        isRecording = false;
        const micBtn = document.getElementById("mic-btn");
        const sttStatus = document.getElementById("stt-status");
        if (micBtn) micBtn.classList.remove("recording");
        if (sttStatus) sttStatus.style.display = "none";
    }

    // =========================================================================
    // 3. NAVIGATION ROUTER
    // =========================================================================

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".content-section");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    function navigateTo(sectionId) {
        // Hide all sections
        sections.forEach(s => s.classList.remove("active"));
        navLinks.forEach(l => l.classList.remove("active"));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add("active");
            window.location.hash = sectionId;
        }

        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }

        // Close mobile sidebar if open
        if (sidebar && sidebar.classList.contains("open")) {
            closeMobileSidebar();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Handle Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const section = link.getAttribute("data-section");
            navigateTo(section);
        });
    });

    // Handle Quick Action card clicks on Dashboard
    document.querySelectorAll(".action-card").forEach(card => {
        card.addEventListener("click", () => {
            const action = card.getAttribute("data-action");
            navigateTo(action);
        });
    });

    // Mobile Sidebar Toggles
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

    function openMobileSidebar() {
        if (sidebar) sidebar.classList.add("open");
        if (sidebarOverlay) sidebarOverlay.classList.add("active");
    }

    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("active");
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", closeMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeMobileSidebar);

    // Initial hash routing or default to dashboard
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && document.getElementById(initialHash)) {
        navigateTo(initialHash);
    } else {
        navigateTo("dashboard");
    }

    // =========================================================================
    // 4. THEME TOGGLING (DARK / LIGHT)
    // =========================================================================

    function applyTheme(theme) {
        document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
        state.settings.theme = theme;
        const icons = document.querySelectorAll(".theme-icon");
        icons.forEach(i => i.textContent = theme === "dark" ? "☀️" : "🌙");
    }

    function toggleTheme() {
        const newTheme = state.settings.theme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
        saveState();
    }

    const mobileThemeBtn = document.getElementById("mobile-theme-btn");
    const sidebarThemeBtn = document.getElementById("sidebar-theme-btn");
    if (mobileThemeBtn) mobileThemeBtn.addEventListener("click", toggleTheme);
    if (sidebarThemeBtn) sidebarThemeBtn.addEventListener("click", toggleTheme);

    applyTheme(state.settings.theme || "light");

    // =========================================================================
    // 5. DASHBOARD UI SYNC
    // =========================================================================

    function syncUI() {
        const completedCount = state.progress.completedDays.length;
        const progressPercent = Math.min(100, Math.round((completedCount / 10) * 100));
        const currentDay = Math.min(10, completedCount + 1);

        // Sidebar widgets
        const sidebarUser = document.getElementById("sidebar-user-name");
        const sidebarLevel = document.getElementById("sidebar-user-level");
        const sidebarProgressNum = document.getElementById("sidebar-progress-num");
        const sidebarProgressBar = document.getElementById("sidebar-progress-bar");
        const sidebarDayStatus = document.getElementById("sidebar-day-status");

        if (sidebarUser) sidebarUser.textContent = state.profile.name;
        if (sidebarLevel) sidebarLevel.textContent = state.profile.level;
        if (sidebarProgressNum) sidebarProgressNum.textContent = `${progressPercent}%`;
        if (sidebarProgressBar) sidebarProgressBar.style.width = `${progressPercent}%`;
        if (sidebarDayStatus) sidebarDayStatus.textContent = `Day ${currentDay} of 10 • ${completedCount === 10 ? 'Challenge Finished! 🏆' : 'In Progress'}`;

        // Dashboard Hero widgets
        const heroName = document.getElementById("hero-user-name");
        const heroDay = document.getElementById("hero-current-day");
        const heroPercent = document.getElementById("hero-progress-percent");
        const heroStage = document.getElementById("hero-stage-text");
        const dashRing = document.getElementById("dashboard-progress-ring");

        if (heroName) heroName.textContent = state.profile.name;
        if (heroDay) heroDay.textContent = currentDay;
        if (heroPercent) heroPercent.textContent = `${progressPercent}%`;
        if (heroStage) heroStage.textContent = `Day ${currentDay} / 10`;

        if (dashRing) {
            const radius = dashRing.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progressPercent / 100) * circumference;
            dashRing.style.strokeDasharray = `${circumference} ${circumference}`;
            dashRing.style.strokeDashoffset = offset;
        }

        // Dashboard 4 Key Stats
        const statDays = document.getElementById("stat-days-completed");
        const statStreak = document.getElementById("stat-streak-days");
        const statWords = document.getElementById("stat-words-learned");
        const statConvo = document.getElementById("stat-conversations");

        if (statDays) statDays.textContent = `${completedCount} / 10`;
        if (statStreak) statStreak.textContent = `${state.profile.streak} Day${state.profile.streak > 1 ? 's' : ''}`;
        if (statWords) statWords.textContent = `${state.vocabulary.learned.length} Words`;
        if (statConvo) statConvo.textContent = `${state.progress.totalTurns} Turns`;

        // Today's Lesson spotlight on dashboard
        const currentLesson = APP_DATA.lessons.find(l => l.day === currentDay) || APP_DATA.lessons[0];
        const todayTitle = document.getElementById("today-lesson-title");
        const todayDesc = document.getElementById("today-lesson-desc");
        const todayDuration = document.getElementById("today-lesson-duration");
        const todayPhrases = document.getElementById("today-lesson-phrases");

        if (todayTitle) todayTitle.textContent = `Day ${currentLesson.day}: ${currentLesson.title}`;
        if (todayDesc) todayDesc.textContent = currentLesson.description;
        if (todayDuration) todayDuration.textContent = currentLesson.duration;
        if (todayPhrases) {
            todayPhrases.innerHTML = currentLesson.keyPhrases.slice(0, 3).map(p => `<span class="phrase-pill">"${p}"</span>`).join("");
        }

        // Lessons section progress
        const lessonsCount = document.getElementById("lessons-completed-count");
        const lessonsMainBar = document.getElementById("lessons-main-progress");
        if (lessonsCount) lessonsCount.textContent = completedCount;
        if (lessonsMainBar) lessonsMainBar.style.width = `${progressPercent}%`;

        // Progress Tracker section
        const progressBadge = document.getElementById("progress-percentage-badge");
        if (progressBadge) progressBadge.textContent = `${progressPercent}% Completed`;

        const statLessonsVal = document.getElementById("stats-lessons-val");
        const statConvoVal = document.getElementById("stats-convo-val");
        const statVocabVal = document.getElementById("stats-vocab-val");
        const statGrammarVal = document.getElementById("stats-grammar-val");
        const statQuizVal = document.getElementById("stats-quiz-val");
        const statStreakVal = document.getElementById("stats-streak-val");

        if (statLessonsVal) statLessonsVal.textContent = `${completedCount} / 10`;
        if (statConvoVal) statConvoVal.textContent = `${state.progress.totalTurns} turns`;
        if (statVocabVal) statVocabVal.textContent = `${state.vocabulary.learned.length} words`;
        if (statGrammarVal) statGrammarVal.textContent = `${state.progress.grammarErrorsCorrected} errors`;
        if (statQuizVal) statQuizVal.textContent = `${state.progress.quizzesPassed} quizzes`;
        if (statStreakVal) statStreakVal.textContent = `🔥 ${state.profile.streak} Day${state.profile.streak > 1 ? 's' : ''}`;

        // Profile adjustment inputs
        const profileNameInput = document.getElementById("profile-name-input");
        const profileLevelSelect = document.getElementById("profile-level-select");
        if (profileNameInput && !profileNameInput.value) profileNameInput.value = state.profile.name;
        if (profileLevelSelect) profileLevelSelect.value = state.profile.level;

        // Certificate unlock state
        const certBtn = document.getElementById("view-certificate-btn");
        if (certBtn) {
            certBtn.disabled = completedCount < 10;
        }

        // Render matrix in progress section
        renderProgressMatrix();
    }

    // Daily Motivational Quote & Audio Tip
    function initDailyMotivation() {
        const quoteObj = APP_DATA.motivationalQuotes[0];
        const tipText = APP_DATA.dailyTips[0];

        const quoteElem = document.getElementById("daily-quote-text");
        const authorElem = document.getElementById("daily-quote-author");
        const tipElem = document.getElementById("daily-tip-text");

        if (quoteElem) quoteElem.textContent = `"${quoteObj.quote}"`;
        if (authorElem) authorElem.textContent = `— ${quoteObj.author}`;
        if (tipElem) tipElem.innerHTML = tipText;

        const speakQuoteBtn = document.getElementById("speak-quote-btn");
        if (speakQuoteBtn) {
            speakQuoteBtn.addEventListener("click", () => {
                speakText(`${quoteObj.quote} by ${quoteObj.author}. Today's Tip: ${tipText.replace(/<[^>]*>?/gm, '')}`);
            });
        }
    }
    initDailyMotivation();

    // Hero buttons
    const heroContinueBtn = document.getElementById("hero-continue-btn");
    const heroChatBtn = document.getElementById("hero-chat-btn");
    const todayStartBtn = document.getElementById("today-start-lesson-btn");
    const todayChatBtn = document.getElementById("today-practice-chat-btn");

    if (heroContinueBtn) heroContinueBtn.addEventListener("click", () => navigateTo("lessons"));
    if (heroChatBtn) heroChatBtn.addEventListener("click", () => navigateTo("chat"));
    if (todayStartBtn) {
        todayStartBtn.addEventListener("click", () => {
            const currentDay = Math.min(10, state.progress.completedDays.length + 1);
            openLessonModal(currentDay);
        });
    }
    if (todayChatBtn) {
        todayChatBtn.addEventListener("click", () => {
            const currentDay = Math.min(10, state.progress.completedDays.length + 1);
            const lesson = APP_DATA.lessons.find(l => l.day === currentDay) || APP_DATA.lessons[0];
            navigateTo("chat");
            handleUserSend(lesson.speakingPrompt);
        });
    }

    // =========================================================================
    // 6. CHATBOT CONTROLLER
    // =========================================================================

    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const typingIndicator = document.getElementById("typing-indicator");
    const chatChips = document.getElementById("chat-chips");
    const clearChatBtn = document.getElementById("clear-chat-btn");
    const ttsToggle = document.getElementById("tts-toggle");
    const ttsSpeedSelect = document.getElementById("tts-speed-select");
    const micBtn = document.getElementById("mic-btn");
    const sttStopBtn = document.getElementById("stt-stop-btn");
    const scenarioActiveBar = document.getElementById("scenario-active-bar");
    const scenarioActiveTitle = document.getElementById("scenario-active-title");
    const scenarioActiveStep = document.getElementById("scenario-active-step");
    const scenarioExitBtn = document.getElementById("scenario-exit-btn");

    // Initialize TTS settings from state
    if (ttsToggle) {
        ttsToggle.checked = state.settings.ttsEnabled !== false;
        ttsToggle.addEventListener("change", (e) => {
            state.settings.ttsEnabled = e.target.checked;
            saveState();
        });
    }

    if (ttsSpeedSelect) {
        ttsSpeedSelect.value = state.settings.ttsSpeed || "1.0";
        ttsSpeedSelect.addEventListener("change", (e) => {
            state.settings.ttsSpeed = parseFloat(e.target.value);
            saveState();
        });
    }

    if (micBtn) micBtn.addEventListener("click", toggleSTT);
    if (sttStopBtn) sttStopBtn.addEventListener("click", stopSTT);

    // Initial Chat messages
    function initChat() {
        chatMessages.innerHTML = "";
        if (state.chatHistory && state.chatHistory.length > 0) {
            state.chatHistory.forEach(msg => renderChatMessage(msg.sender, msg.text, msg.grammarCorrection, false, msg.time));
        } else {
            // Coach opening greeting & onboarding
            const onboarding = coachAI.startOnboarding();
            appendCoachMessage(onboarding.text, null, onboarding.quickReplies);
        }
    }

    function appendUserMessage(text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        renderChatMessage("user", text, null, true, time);

        state.chatHistory.push({ sender: "user", text, grammarCorrection: null, time });
        state.progress.totalTurns += 1;
        saveState();
    }

    function appendCoachMessage(text, grammarCorrection = null, quickReplies = []) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        renderChatMessage("coach", text, grammarCorrection, true, time);

        state.chatHistory.push({ sender: "coach", text, grammarCorrection, time });
        if (grammarCorrection) {
            state.progress.grammarErrorsCorrected += 1;
        }
        saveState();

        // Render Quick reply chips
        renderQuickChips(quickReplies);

        // Auto TTS speech if enabled
        if (state.settings.ttsEnabled) {
            speakText(text, state.settings.ttsSpeed);
        }

        // Sync roleplay banner
        syncScenarioBanner();
    }

    function renderChatMessage(sender, text, grammarCorrection = null, shouldScroll = true, time = "") {
        const row = document.createElement("div");
        row.className = `message-row ${sender}`;

        const avatar = document.createElement("div");
        avatar.className = "msg-avatar";
        avatar.textContent = sender === "user" ? "👤" : "👩‍🏫";

        const bubbleWrap = document.createElement("div");
        bubbleWrap.className = "msg-bubble-wrap";

        const bubble = document.createElement("div");
        bubble.className = "msg-bubble";

        // Convert newlines & markdown bold to HTML
        let formattedText = escapeHTML(text)
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br>");

        bubble.innerHTML = formattedText;

        // If grammar correction was caught, append visual comparison card
        if (grammarCorrection) {
            const grammarBox = document.createElement("div");
            grammarBox.className = "chat-grammar-box";
            grammarBox.innerHTML = `
                <div class="chat-grammar-header">
                    <span>💡 Coach Maya's Grammar Tip</span>
                </div>
                <div class="correction-diff">
                    <span class="diff-original">${escapeHTML(grammarCorrection.original)}</span>
                    <span class="diff-arrow">➔</span>
                    <span class="diff-corrected">${escapeHTML(grammarCorrection.corrected)}</span>
                </div>
                <div class="diff-explanation">
                    <strong>Rule:</strong> ${escapeHTML(grammarCorrection.ruleName)}<br>
                    ${escapeHTML(grammarCorrection.explanation)}
                </div>
            `;
            bubble.appendChild(grammarBox);
        }

        // Meta footer (timestamp & speak button)
        const meta = document.createElement("div");
        meta.className = "msg-meta-row";
        meta.innerHTML = `<span>${time || 'Just now'}</span>`;

        if (sender === "coach") {
            const listenBtn = document.createElement("button");
            listenBtn.className = "listen-msg-btn";
            listenBtn.innerHTML = `<span>🔊 Listen</span>`;
            listenBtn.addEventListener("click", () => speakText(text, state.settings.ttsSpeed));
            meta.appendChild(listenBtn);
        }

        bubbleWrap.appendChild(bubble);
        bubbleWrap.appendChild(meta);

        row.appendChild(avatar);
        row.appendChild(bubbleWrap);

        chatMessages.appendChild(row);

        if (shouldScroll) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function renderQuickChips(replies = []) {
        chatChips.innerHTML = "";
        const defaultChips = [
            "👋 Hello! Let's practice",
            "✍️ Check: Yesterday I go to college...",
            "💼 Interview self-introduction",
            "🍽️ Order food at restaurant",
            "💡 Daily speaking tip"
        ];

        const list = (replies && replies.length > 0) ? replies : defaultChips;
        list.forEach(prompt => {
            const btn = document.createElement("button");
            btn.className = "chip-btn";
            btn.textContent = prompt;
            btn.addEventListener("click", () => handleUserSend(prompt));
            chatChips.appendChild(btn);
        });
    }

    function syncScenarioBanner() {
        if (!scenarioActiveBar) return;
        const currentScenario = coachAI.conversationState.currentScenario;
        if (currentScenario) {
            scenarioActiveBar.style.display = "flex";
            if (scenarioActiveTitle) scenarioActiveTitle.textContent = currentScenario.title;
            if (scenarioActiveStep) scenarioActiveStep.textContent = `Turn ${coachAI.conversationState.scenarioStep}`;
        } else {
            scenarioActiveBar.style.display = "none";
        }
    }

    if (scenarioExitBtn) {
        scenarioExitBtn.addEventListener("click", () => {
            handleUserSend("End roleplay scenario");
        });
    }

    function handleUserSend(customText = null) {
        const text = customText !== null ? customText : chatInput.value.trim();
        if (!text) return;

        chatInput.value = "";
        appendUserMessage(text);

        // Show typing indicator
        if (typingIndicator) typingIndicator.style.display = "flex";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Natural simulation thinking delay (500ms - 850ms)
        const delay = Math.min(850, 450 + text.length * 10);
        setTimeout(() => {
            if (typingIndicator) typingIndicator.style.display = "none";
            const response = coachAI.processMessage(text);

            // Sync profile changes (e.g. name or level updated during chat)
            state.profile.name = coachAI.profile.name;
            state.profile.level = coachAI.profile.level;

            appendCoachMessage(response.text, response.grammarCorrection, response.quickReplies);
            saveState();
        }, delay);
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener("click", () => handleUserSend());
    }

    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleUserSend();
            }
        });
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", () => {
            if (confirm("Clear current conversation history with Coach Maya?")) {
                state.chatHistory = [];
                coachAI.conversationState.currentScenario = null;
                saveState();
                initChat();
                showToast("Chat history cleared.", "info");
            }
        });
    }

    initChat();

    // =========================================================================
    // 7. 10-DAY CURRICULUM LESSONS CONTROLLER
    // =========================================================================

    const lessonsGrid = document.getElementById("lessons-grid-container");
    const unlockAllBtn = document.getElementById("unlock-all-btn");

    if (unlockAllBtn) {
        unlockAllBtn.addEventListener("click", () => {
            state.progress.testUnlockAll = !state.progress.testUnlockAll;
            saveState();
            renderLessonsGrid();
            showToast(state.progress.testUnlockAll ? "All 10 Days Unlocked for testing!" : "Standard progressive unlock restored.", "info");
        });
    }

    function renderLessonsGrid() {
        if (!lessonsGrid) return;
        lessonsGrid.innerHTML = "";

        APP_DATA.lessons.forEach(lesson => {
            const isCompleted = state.progress.completedDays.includes(lesson.day);
            const isUnlocked = state.progress.testUnlockAll || lesson.day === 1 || state.progress.completedDays.includes(lesson.day - 1);

            const card = document.createElement("div");
            card.className = `lesson-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`;

            card.innerHTML = `
                <div class="lesson-card-header">
                    <span class="day-badge">Day ${lesson.day}</span>
                    <span class="lesson-status-badge ${isCompleted ? 'status-completed' : (isUnlocked ? 'status-unlocked' : 'status-locked')}">
                        ${isCompleted ? '✓ Completed' : (isUnlocked ? 'Ready to Learn' : '🔒 Locked')}
                    </span>
                </div>
                <h3 class="lesson-card-title">${lesson.title}</h3>
                <p class="lesson-card-desc">${lesson.description}</p>
                <div class="lesson-key-phrases">
                    ${lesson.keyPhrases.slice(0, 3).map(p => `<span class="key-phrase-tag">${p}</span>`).join("")}
                </div>
                <div class="lesson-card-footer">
                    <span class="lesson-duration">⏱️ ${lesson.duration}</span>
                    <button class="btn ${isCompleted ? 'btn-outline-sm' : 'btn-primary'} open-lesson-btn" ${!isUnlocked ? 'disabled' : ''}>
                        ${isCompleted ? 'Review Lesson' : 'Start Day ' + lesson.day}
                    </button>
                </div>
            `;

            const startBtn = card.querySelector(".open-lesson-btn");
            if (startBtn && isUnlocked) {
                startBtn.addEventListener("click", () => openLessonModal(lesson.day));
            }

            lessonsGrid.appendChild(card);
        });
    }

    // Lesson Modal Handlers
    const lessonModal = document.getElementById("lesson-modal");
    const closeLessonModalBtn = document.getElementById("close-lesson-modal-btn");
    const modalCancelBtn = document.getElementById("modal-cancel-btn");
    const modalCompleteBtn = document.getElementById("modal-complete-day-btn");
    const modalPracticeChatBtn = document.getElementById("modal-practice-chat-btn");

    let currentModalDay = 1;

    function openLessonModal(day) {
        const lesson = APP_DATA.lessons.find(l => l.day === day);
        if (!lesson || !lessonModal) return;

        currentModalDay = day;

        document.getElementById("modal-day-badge").textContent = `Day ${lesson.day}`;
        document.getElementById("modal-lesson-title").textContent = lesson.title;
        document.getElementById("modal-lesson-objective").innerHTML = `<strong>🎯 Learning Goal:</strong> ${lesson.objective}`;
        document.getElementById("modal-lesson-content").innerHTML = lesson.explanation;
        document.getElementById("modal-speaking-prompt").textContent = `"${lesson.speakingPrompt}"`;

        // Render Quiz
        renderLessonQuiz(lesson.quiz);

        // Update Complete Button Text
        const isCompleted = state.progress.completedDays.includes(day);
        modalCompleteBtn.innerHTML = isCompleted ? `<span>Already Completed (Re-save)</span> <span>✓</span>` : `<span>Mark Day Completed & Unlock Next</span> <span>✓</span>`;

        lessonModal.style.display = "flex";
    }

    function closeLessonModal() {
        if (lessonModal) lessonModal.style.display = "none";
    }

    if (closeLessonModalBtn) closeLessonModalBtn.addEventListener("click", closeLessonModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener("click", closeLessonModal);

    if (modalPracticeChatBtn) {
        modalPracticeChatBtn.addEventListener("click", () => {
            const lesson = APP_DATA.lessons.find(l => l.day === currentModalDay);
            closeLessonModal();
            navigateTo("chat");
            handleUserSend(`I'm practicing Day ${lesson.day}: "${lesson.speakingPrompt}"`);
        });
    }

    if (modalCompleteBtn) {
        modalCompleteBtn.addEventListener("click", () => {
            if (!state.progress.completedDays.includes(currentModalDay)) {
                state.progress.completedDays.push(currentModalDay);
                state.progress.completedDays.sort((a, b) => a - b);
                state.progress.unlockedDay = Math.max(state.progress.unlockedDay, currentModalDay + 1);
                state.progress.quizzesPassed += 1;
                saveState();

                triggerConfetti();
                showToast(`🎉 Day ${currentModalDay} Completed! Outstanding work!`, "success");
            } else {
                showToast(`Day ${currentModalDay} reviewed!`, "info");
            }
            closeLessonModal();
            renderLessonsGrid();
        });
    }

    function renderLessonQuiz(quizList) {
        const container = document.getElementById("modal-quiz-container");
        if (!container) return;
        container.innerHTML = "";

        quizList.forEach((q, qIndex) => {
            const qBlock = document.createElement("div");
            qBlock.className = "quiz-question-block";

            const qText = document.createElement("div");
            qText.className = "quiz-q-text";
            qText.textContent = `${qIndex + 1}. ${q.question}`;
            qBlock.appendChild(qText);

            const optionsList = document.createElement("div");
            optionsList.className = "quiz-options-list";

            const feedback = document.createElement("div");
            feedback.className = "quiz-feedback-box";
            feedback.style.display = "none";

            q.options.forEach((opt, optIndex) => {
                const optBtn = document.createElement("button");
                optBtn.className = "quiz-option-btn";
                optBtn.textContent = opt;

                optBtn.addEventListener("click", () => {
                    // Disable all buttons in this block
                    const allBtns = optionsList.querySelectorAll(".quiz-option-btn");
                    allBtns.forEach(b => b.disabled = true);

                    if (optIndex === q.correctIndex) {
                        optBtn.classList.add("correct");
                        feedback.style.display = "block";
                        feedback.style.background = "var(--success-light)";
                        feedback.style.color = "var(--success)";
                        feedback.innerHTML = `<strong>Correct! 🎉</strong> ${q.explanation}`;
                    } else {
                        optBtn.classList.add("incorrect");
                        allBtns[q.correctIndex].classList.add("correct");
                        feedback.style.display = "block";
                        feedback.style.background = "var(--danger-light)";
                        feedback.style.color = "var(--danger)";
                        feedback.innerHTML = `<strong>Not quite.</strong> ${q.explanation}`;
                    }
                });

                optionsList.appendChild(optBtn);
            });

            qBlock.appendChild(optionsList);
            qBlock.appendChild(feedback);
            container.appendChild(qBlock);
        });
    }

    renderLessonsGrid();

    // =========================================================================
    // 8. VOCABULARY BUILDER CONTROLLER
    // =========================================================================

    const vocabCardsGrid = document.getElementById("vocab-cards-grid");
    const vocabSearchInput = document.getElementById("vocab-search-input");
    const vocabCategoryFilters = document.getElementById("vocab-category-filters");
    const openVocabQuizBtn = document.getElementById("open-vocab-quiz-btn");

    let currentVocabFilter = "all";
    let currentVocabSearch = "";

    function renderVocabularyGrid() {
        if (!vocabCardsGrid) return;
        vocabCardsGrid.innerHTML = "";

        const filtered = APP_DATA.vocabulary.filter(item => {
            const matchesSearch = item.word.toLowerCase().includes(currentVocabSearch) ||
                                  item.meaning.toLowerCase().includes(currentVocabSearch) ||
                                  item.synonyms.some(s => s.toLowerCase().includes(currentVocabSearch));

            let matchesCat = true;
            if (currentVocabFilter === "favorites") {
                matchesCat = state.vocabulary.favorites.includes(item.id);
            } else if (currentVocabFilter !== "all") {
                matchesCat = item.category === currentVocabFilter;
            }

            return matchesSearch && matchesCat;
        });

        // Update counts
        const countAll = document.getElementById("count-all");
        const countFav = document.getElementById("count-fav");
        if (countAll) countAll.textContent = APP_DATA.vocabulary.length;
        if (countFav) countFav.textContent = state.vocabulary.favorites.length;

        if (filtered.length === 0) {
            vocabCardsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <h3>No words found</h3>
                <p>Try searching for a different word or clearing your category filter.</p>
            </div>`;
            return;
        }

        filtered.forEach(v => {
            const isFav = state.vocabulary.favorites.includes(v.id);
            const isLearned = state.vocabulary.learned.includes(v.id);

            const card = document.createElement("div");
            card.className = "vocab-card";

            card.innerHTML = `
                <div class="vocab-header-row">
                    <div>
                        <div class="vocab-word">${v.word}</div>
                        <div class="vocab-phonetic">${v.phonetic}</div>
                    </div>
                    <div class="vocab-actions-top">
                        <button class="icon-btn-sm speak-word-btn" title="Listen to pronunciation">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                        </button>
                        <button class="favorite-btn ${isFav ? 'active' : ''}" title="Save to favorites">★</button>
                    </div>
                </div>
                <span class="pos-tag">${v.pos}</span>
                <p class="vocab-meaning">${v.meaning}</p>
                <div class="vocab-example">"${v.example}"</div>
                <div class="vocab-footer">
                    <span class="vocab-day-tag">Day ${v.day} • ${v.category}</span>
                    <button class="btn-xs ${isLearned ? 'btn-success' : 'btn-outline'} toggle-learned-btn">
                        ${isLearned ? '✓ Learned' : '+ Mark Learned'}
                    </button>
                </div>
            `;

            // Speak word button
            card.querySelector(".speak-word-btn").addEventListener("click", () => {
                speakText(`${v.word}. ${v.example}`, 0.9);
            });

            // Toggle favorite
            card.querySelector(".favorite-btn").addEventListener("click", () => {
                if (state.vocabulary.favorites.includes(v.id)) {
                    state.vocabulary.favorites = state.vocabulary.favorites.filter(id => id !== v.id);
                    showToast(`Removed "${v.word}" from favorites.`, "info");
                } else {
                    state.vocabulary.favorites.push(v.id);
                    showToast(`⭐ Saved "${v.word}" to favorites!`, "success");
                }
                saveState();
                renderVocabularyGrid();
            });

            // Toggle learned
            card.querySelector(".toggle-learned-btn").addEventListener("click", () => {
                if (state.vocabulary.learned.includes(v.id)) {
                    state.vocabulary.learned = state.vocabulary.learned.filter(id => id !== v.id);
                } else {
                    state.vocabulary.learned.push(v.id);
                    showToast(`Marked "${v.word}" as mastered! 🎯`, "success");
                }
                saveState();
                renderVocabularyGrid();
            });

            vocabCardsGrid.appendChild(card);
        });
    }

    if (vocabSearchInput) {
        vocabSearchInput.addEventListener("input", (e) => {
            currentVocabSearch = e.target.value.toLowerCase().trim();
            renderVocabularyGrid();
        });
    }

    if (vocabCategoryFilters) {
        vocabCategoryFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-pill");
            if (!btn) return;

            vocabCategoryFilters.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            currentVocabFilter = btn.getAttribute("data-category");
            renderVocabularyGrid();
        });
    }

    renderVocabularyGrid();

    // Vocabulary Quiz Modal Handlers
    const vocabQuizModal = document.getElementById("vocab-quiz-modal");
    const closeVocabQuizBtn = document.getElementById("close-vocab-quiz-btn");
    const vocabQuizBody = document.getElementById("vocab-quiz-body");
    const vocabQuizFooter = document.getElementById("vocab-quiz-footer");

    if (openVocabQuizBtn) {
        openVocabQuizBtn.addEventListener("click", () => startVocabQuiz());
    }
    if (closeVocabQuizBtn) {
        closeVocabQuizBtn.addEventListener("click", () => {
            if (vocabQuizModal) vocabQuizModal.style.display = "none";
        });
    }

    function startVocabQuiz() {
        if (!vocabQuizModal) return;
        vocabQuizModal.style.display = "flex";

        // Shuffle & pick 5 words
        const words = [...APP_DATA.vocabulary].sort(() => 0.5 - Math.random()).slice(0, 5);
        let currentQuestion = 0;
        let score = 0;

        function showQuestion(index) {
            if (index >= words.length) {
                // Completed quiz
                state.progress.quizzesPassed += 1;
                saveState();
                triggerConfetti();

                vocabQuizBody.innerHTML = `
                    <div style="text-align: center; padding: 2rem 1rem;">
                        <span style="font-size: 4rem;">🏆</span>
                        <h3 style="font-size: 1.8rem; margin: 1rem 0 0.5rem;">Quiz Complete!</h3>
                        <p style="font-size: 1.1rem; color: var(--accent-purple); font-weight: 700;">You scored ${score} out of ${words.length}!</p>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">Great job expanding your English vocabulary bank.</p>
                    </div>
                `;
                vocabQuizFooter.innerHTML = `
                    <button class="btn btn-outline" id="quiz-close-btn">Close</button>
                    <button class="btn btn-primary" id="quiz-retry-btn">Try Another Quiz</button>
                `;
                document.getElementById("quiz-close-btn").addEventListener("click", () => vocabQuizModal.style.display = "none");
                document.getElementById("quiz-retry-btn").addEventListener("click", () => startVocabQuiz());
                return;
            }

            const current = words[index];
            // Pick 3 distractors
            const distractors = APP_DATA.vocabulary.filter(w => w.id !== current.id).sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [...distractors.map(d => d.meaning), current.meaning].sort(() => 0.5 - Math.random());
            const correctIdx = options.indexOf(current.meaning);

            vocabQuizBody.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-purple);">Question ${index + 1} of ${words.length}</span>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Score: ${score}</span>
                </div>
                <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem;">What is the meaning of "<span style="color: var(--primary-blue); font-weight: 800;">${current.word}</span>"?</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;"><em>Example sentence: "${current.example}"</em></p>
                <div class="quiz-options-list" id="vquiz-options"></div>
                <div id="vquiz-feedback" class="quiz-feedback-box" style="display: none; margin-top: 1rem;"></div>
            `;

            const optsContainer = document.getElementById("vquiz-options");
            const feedbackElem = document.getElementById("vquiz-feedback");

            options.forEach((opt, optIdx) => {
                const btn = document.createElement("button");
                btn.className = "quiz-option-btn";
                btn.textContent = opt;

                btn.addEventListener("click", () => {
                    const allBtns = optsContainer.querySelectorAll(".quiz-option-btn");
                    allBtns.forEach(b => b.disabled = true);

                    if (optIdx === correctIdx) {
                        score++;
                        btn.classList.add("correct");
                        feedbackElem.style.display = "block";
                        feedbackElem.style.background = "var(--success-light)";
                        feedbackElem.style.color = "var(--success)";
                        feedbackElem.innerHTML = `<strong>Spot on! 🎉</strong> That's the exact meaning of "${current.word}".`;
                    } else {
                        btn.classList.add("incorrect");
                        allBtns[correctIdx].classList.add("correct");
                        feedbackElem.style.display = "block";
                        feedbackElem.style.background = "var(--danger-light)";
                        feedbackElem.style.color = "var(--danger)";
                        feedbackElem.innerHTML = `<strong>Not quite.</strong> The correct definition is: <em>${current.meaning}</em>`;
                    }

                    setTimeout(() => {
                        showQuestion(index + 1);
                    }, 1400);
                });

                optsContainer.appendChild(btn);
            });

            vocabQuizFooter.innerHTML = `<button class="btn btn-outline" id="quit-quiz-btn">Quit Quiz</button>`;
            document.getElementById("quit-quiz-btn").addEventListener("click", () => vocabQuizModal.style.display = "none");
        }

        showQuestion(0);
    }

    // =========================================================================
    // 9. GRAMMAR CORRECTION TOOL CONTROLLER
    // =========================================================================

    const grammarInputText = document.getElementById("grammar-input-text");
    const checkGrammarBtn = document.getElementById("check-grammar-btn");
    const clearGrammarBtn = document.getElementById("clear-grammar-btn");
    const grammarResultCard = document.getElementById("grammar-result-card");
    const grammarResultHeader = document.getElementById("grammar-result-header");
    const grammarResultBody = document.getElementById("grammar-result-body");
    const practiceGrammarInChatBtn = document.getElementById("practice-grammar-in-chat-btn");

    // Sample sentence pills
    document.querySelectorAll(".sample-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            if (grammarInputText) {
                grammarInputText.value = pill.getAttribute("data-sample");
                runGrammarCheck();
            }
        });
    });

    if (clearGrammarBtn) {
        clearGrammarBtn.addEventListener("click", () => {
            if (grammarInputText) grammarInputText.value = "";
            if (grammarResultCard) grammarResultCard.style.display = "none";
        });
    }

    if (checkGrammarBtn) {
        checkGrammarBtn.addEventListener("click", runGrammarCheck);
    }

    function runGrammarCheck() {
        const text = grammarInputText ? grammarInputText.value.trim() : "";
        if (!text) {
            showToast("Please enter an English sentence to check.", "warning");
            return;
        }

        const analysis = coachAI.analyzeGrammar(text);
        if (grammarResultCard) grammarResultCard.style.display = "block";

        if (analysis) {
            state.progress.grammarErrorsCorrected += 1;
            saveState();

            grammarResultHeader.innerHTML = `
                <div class="grammar-status-banner needs-work">
                    <span class="status-icon">⚠️</span>
                    <div>
                        <h4 style="font-size: 1.1rem;">Correction Needed</h4>
                        <p style="font-size: 0.85rem; margin: 0;">We identified a grammatical slip and provided the standard English version below.</p>
                    </div>
                </div>
            `;

            grammarResultBody.innerHTML = `
                <div class="grammar-comparison-box">
                    <div class="comparison-col original">
                        <div class="comp-header">Original Sentence</div>
                        <div class="comp-sentence">${escapeHTML(analysis.original)}</div>
                    </div>
                    <div class="comparison-col corrected">
                        <div class="comp-header">Corrected Sentence</div>
                        <div class="comp-sentence"><strong>${escapeHTML(analysis.corrected)}</strong></div>
                    </div>
                </div>

                <div class="grammar-rule-detail-card">
                    <span class="rule-name-badge">Rule: ${escapeHTML(analysis.ruleName)}</span>
                    <div class="rule-explanation-text">
                        <strong>Why is this rule important?</strong><br>
                        ${escapeHTML(analysis.explanation)}
                    </div>
                    ${analysis.example ? `<div class="rule-example-text"><strong>Example:</strong> <em>${escapeHTML(analysis.example)}</em></div>` : ''}
                </div>
            `;

            if (practiceGrammarInChatBtn) {
                practiceGrammarInChatBtn.onclick = () => {
                    navigateTo("chat");
                    handleUserSend(`Could you explain why "${analysis.original}" should be "${analysis.corrected}"?`);
                };
            }
        } else {
            grammarResultHeader.innerHTML = `
                <div class="grammar-status-banner perfect">
                    <span class="status-icon">🎉</span>
                    <div>
                        <h4 style="font-size: 1.1rem;">Awesome! Natural & Grammatically Correct!</h4>
                        <p style="font-size: 0.85rem; margin: 0;">Your sentence follows natural English grammar rules and sounds great.</p>
                    </div>
                </div>
            `;

            grammarResultBody.innerHTML = `
                <div class="comparison-col corrected" style="margin-bottom: 1rem;">
                    <div class="comp-header">Sentence Verified</div>
                    <div class="comp-sentence">"${escapeHTML(text)}"</div>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">
                    Keep expressing yourself in complete sentences! Regular writing and speaking are the twin engines of fluency.
                </p>
            `;

            if (practiceGrammarInChatBtn) {
                practiceGrammarInChatBtn.onclick = () => {
                    navigateTo("chat");
                    handleUserSend(text);
                };
            }
        }

        grammarResultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // =========================================================================
    // 10. SPEAKING SCENARIOS CONTROLLER
    // =========================================================================

    const scenariosGrid = document.getElementById("scenarios-grid");

    function renderScenarios() {
        if (!scenariosGrid) return;
        scenariosGrid.innerHTML = "";

        APP_DATA.scenarios.forEach(sc => {
            const card = document.createElement("div");
            card.className = "scenario-card";

            card.innerHTML = `
                <div class="scenario-top-row">
                    <span class="scenario-icon">${sc.icon}</span>
                    <span class="scenario-badge">${sc.badge}</span>
                </div>
                <h3 class="scenario-title">${sc.title}</h3>
                <div class="scenario-roles">
                    <div class="role-item">
                        <span class="role-tag">You:</span>
                        <span>${sc.userRole}</span>
                    </div>
                    <div class="role-item">
                        <span class="role-tag">Coach:</span>
                        <span>${sc.coachRole}</span>
                    </div>
                </div>
                <p class="scenario-desc">${sc.description}</p>
                <div class="scenario-key-vocab">
                    ${sc.keyVocab.slice(0, 3).map(v => `<span class="vocab-chip">${v}</span>`).join("")}
                </div>
                <div class="scenario-card-footer">
                    <button class="btn btn-primary start-roleplay-btn" style="width: 100%;">
                        <span>Start Roleplay in Chat</span>
                        <span>💬</span>
                    </button>
                </div>
            `;

            card.querySelector(".start-roleplay-btn").addEventListener("click", () => {
                navigateTo("chat");
                const res = coachAI.startScenario(sc.id);
                appendCoachMessage(res.text, null, res.quickReplies);
            });

            scenariosGrid.appendChild(card);
        });
    }
    renderScenarios();

    // =========================================================================
    // 11. PROGRESS TRACKER & CERTIFICATE CONTROLLER
    // =========================================================================

    function renderProgressMatrix() {
        const matrix = document.getElementById("days-matrix");
        if (!matrix) return;
        matrix.innerHTML = "";

        const completed = state.progress.completedDays;
        const current = Math.min(10, completed.length + 1);

        for (let day = 1; day <= 10; day++) {
            const isDone = completed.includes(day);
            const isCurrent = day === current;

            const node = document.createElement("div");
            node.className = `day-node ${isDone ? 'completed' : ''} ${isCurrent ? 'active-day' : ''}`;

            node.innerHTML = `
                <span class="day-node-num">DAY ${day}</span>
                <span class="day-node-icon">${isDone ? '✓' : (isCurrent ? '⭐' : '🔒')}</span>
                <span class="day-node-label">${isDone ? 'Finished' : (isCurrent ? 'Current' : 'Locked')}</span>
            `;

            node.style.cursor = "pointer";
            node.addEventListener("click", () => {
                openLessonModal(day);
            });

            matrix.appendChild(node);
        }
    }

    // Save profile from Progress section
    const saveProfileBtn = document.getElementById("save-profile-btn");
    const openProfileBtn = document.getElementById("open-profile-btn");

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", () => {
            const nameInput = document.getElementById("profile-name-input");
            const levelSelect = document.getElementById("profile-level-select");

            if (nameInput && nameInput.value.trim()) {
                state.profile.name = nameInput.value.trim();
                coachAI.profile.name = state.profile.name;
            }
            if (levelSelect) {
                state.profile.level = levelSelect.value;
                coachAI.profile.level = state.profile.level;
            }

            saveState();
            showToast("Profile settings saved successfully! 🌟", "success");
        });
    }

    if (openProfileBtn) {
        openProfileBtn.addEventListener("click", () => {
            navigateTo("progress");
            const nameInput = document.getElementById("profile-name-input");
            if (nameInput) nameInput.focus();
        });
    }

    // Certificate Modals & Printing
    const certificateModal = document.getElementById("certificate-modal");
    const viewCertificateBtn = document.getElementById("view-certificate-btn");
    const previewCertificateBtn = document.getElementById("preview-certificate-btn");
    const closeCertModalBtn = document.getElementById("close-cert-modal-btn");
    const closeCertActionBtn = document.getElementById("close-cert-action-btn");
    const printCertificateBtn = document.getElementById("print-certificate-btn");

    function openCertificate() {
        if (!certificateModal) return;
        const studentName = document.getElementById("cert-student-name");
        const issueDate = document.getElementById("cert-issue-date");

        if (studentName) studentName.textContent = state.profile.name || "English Learner";
        if (issueDate) {
            const todayStr = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
            issueDate.textContent = `Date: ${todayStr}`;
        }

        certificateModal.style.display = "flex";
        triggerConfetti();
    }

    if (viewCertificateBtn) viewCertificateBtn.addEventListener("click", openCertificate);
    if (previewCertificateBtn) previewCertificateBtn.addEventListener("click", openCertificate);
    if (closeCertModalBtn) closeCertModalBtn.addEventListener("click", () => certificateModal.style.display = "none");
    if (closeCertActionBtn) closeCertActionBtn.addEventListener("click", () => certificateModal.style.display = "none");

    if (printCertificateBtn) {
        printCertificateBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // Reset Progress Modal Handlers
    const resetProgressBtn = document.getElementById("reset-progress-btn");
    const resetConfirmModal = document.getElementById("reset-confirm-modal");
    const closeResetModalBtn = document.getElementById("close-reset-modal-btn");
    const cancelResetBtn = document.getElementById("cancel-reset-btn");
    const confirmResetBtn = document.getElementById("confirm-reset-btn");

    if (resetProgressBtn) {
        resetProgressBtn.addEventListener("click", () => {
            if (resetConfirmModal) resetConfirmModal.style.display = "flex";
        });
    }

    function closeResetModal() {
        if (resetConfirmModal) resetConfirmModal.style.display = "none";
    }

    if (closeResetModalBtn) closeResetModalBtn.addEventListener("click", closeResetModal);
    if (cancelResetBtn) cancelResetBtn.addEventListener("click", closeResetModal);

    if (confirmResetBtn) {
        confirmResetBtn.addEventListener("click", () => {
            localStorage.removeItem(STORAGE_KEY);
            state = JSON.parse(JSON.stringify(defaultState));
            coachAI.profile = { ...defaultState.profile };
            coachAI.conversationState = {
                awaiting: null,
                currentScenario: null,
                scenarioStep: 0,
                activeDayLesson: null,
                lastDetectedError: null,
                turnCount: 0
            };
            saveState();
            closeResetModal();
            initChat();
            renderLessonsGrid();
            renderVocabularyGrid();
            showToast("Challenge progress has been reset. Ready for a fresh start!", "info");
            navigateTo("dashboard");
        });
    }

    // =========================================================================
    // 12. UTILITIES: TOASTS, CONFETTI & ESCAPING
    // =========================================================================

    function showToast(message, type = "info") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        const icon = type === "success" ? "🎉" : (type === "warning" ? "⚠️" : "💡");
        toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Canvas Confetti Generator
    function triggerConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ["#2563eb", "#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#6366f1"];

        for (let i = 0; i < 90; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 4 + 3,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 8 - 4
            });
        }

        let animationFrame;
        const startTime = Date.now();

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
            });

            if (Date.now() - startTime < 3500) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        }

        render();
    }

    // Initial UI Sync
    syncUI();
});
