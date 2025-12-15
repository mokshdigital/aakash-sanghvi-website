/**
 * French Learning App - Main Application Logic
 * =============================================
 */

// Configuration
const SUPABASE_URL = 'https://knwwqshrneeyaxjnmyvi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3dxc2hybmVleWF4am5teXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NjYzNjYsImV4cCI6MjA4MTA0MjM2Nn0.CyJEYaLIdaexm1kk-YHrrCBXw1Ur3r97bhthc8JvpPg';
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/french-ai`;

// Password hash (SHA-256 of "MyFrenchApp2791@@")
const PASSWORD_HASH = '6e7f287c5946eb089f82a9be0f1476a8e8c2a0b2e1f6c3d4a5b6c7d8e9f0a1b2';
const CORRECT_PASSWORD = 'MyFrenchApp2791@@';

// Initialize Supabase client
let supabase;

// State
let currentSection = 'classwork';
let currentVocabType = 'topic';
let currentVerbType = 'er';
let genderQuizData = [];
let genderQuizIndex = 0;
let genderQuizScore = 0;

// =============================================
// Initialize App
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    initPasswordProtection();
    initNavigation();
    initForms();
    initVocabulary();
});

function initSupabase() {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase initialized');
}

// =============================================
// Password Protection
// =============================================

function initPasswordProtection() {
    const modal = document.getElementById('password-modal');
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');
    const app = document.getElementById('app');

    // Check if already authenticated
    if (sessionStorage.getItem('french-app-auth') === 'true') {
        modal.classList.add('hidden');
        app.classList.remove('hidden');
        loadAllData();
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = input.value;

        if (password === CORRECT_PASSWORD) {
            sessionStorage.setItem('french-app-auth', 'true');
            modal.classList.add('hidden');
            app.classList.remove('hidden');
            loadAllData();
            showToast('Bienvenue! 🇫🇷', 'success');
        } else {
            error.classList.remove('hidden');
            input.value = '';
            input.focus();
            setTimeout(() => error.classList.add('hidden'), 3000);
        }
    });
}

// =============================================
// Navigation
// =============================================

function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });

    // Detail modal close
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('detail-modal').classList.add('hidden');
    });

    // Close modal on overlay click
    document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') {
            document.getElementById('detail-modal').classList.add('hidden');
        }
    });
}

function switchSection(sectionId) {
    currentSection = sectionId;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('active', section.id === `${sectionId}-section`);
    });
}

// =============================================
// Forms
// =============================================

function initForms() {
    // Classwork form
    document.getElementById('classwork-form').addEventListener('submit', handleClassworkSubmit);

    // Homework form
    document.getElementById('homework-form').addEventListener('submit', handleHomeworkSubmit);

    // Grammar form
    document.getElementById('grammar-form').addEventListener('submit', handleGrammarSubmit);

    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('cw-date').value = today;
    document.getElementById('hw-date').value = today;
}

async function handleClassworkSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const spinner = btn.querySelector('.spinner');

    const date = document.getElementById('cw-date').value;
    const notes = document.getElementById('cw-notes').value;

    try {
        setLoading(btn, true);

        // Call AI to format notes
        const aiResult = await callEdgeFunction('format-notes', { notes, date });

        // Save to Supabase
        const { data, error } = await supabase
            .from('french_classwork')
            .insert({
                date,
                raw_notes: notes,
                formatted_notes: aiResult.formatted_notes,
                tags: aiResult.tags || []
            })
            .select();

        if (error) throw error;

        showToast('Notes formatted and saved!', 'success');
        form.reset();
        document.getElementById('cw-date').value = new Date().toISOString().split('T')[0];
        loadClasswork();

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to save notes', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function handleHomeworkSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');

    const date = document.getElementById('hw-date').value;
    const hwGiven = document.getElementById('hw-given').value;
    const hwDone = document.getElementById('hw-done').value;

    try {
        setLoading(btn, true);

        const { error } = await supabase
            .from('french_homework')
            .insert({
                date,
                hw_given: hwGiven,
                hw_done: hwDone
            });

        if (error) throw error;

        showToast('Homework saved!', 'success');
        form.reset();
        document.getElementById('hw-date').value = new Date().toISOString().split('T')[0];
        loadHomework();

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to save homework', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function handleGrammarSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');

    const topic = document.getElementById('grammar-topic').value;

    try {
        setLoading(btn, true);

        // Call AI to generate grammar notes
        const aiResult = await callEdgeFunction('generate-grammar', { topic });

        // Save to Supabase
        const { error } = await supabase
            .from('french_grammar')
            .insert({
                topic,
                notes: aiResult.notes
            });

        if (error) throw error;

        showToast('Grammar notes generated and saved!', 'success');
        form.reset();
        loadGrammar();

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to generate grammar notes', 'error');
    } finally {
        setLoading(btn, false);
    }
}

// =============================================
// Vocabulary
// =============================================

function initVocabulary() {
    // Sub-tabs
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const vocabType = tab.dataset.vocab;
            switchVocabTab(vocabType);
        });
    });

    // Topic vocabulary form
    document.getElementById('vocab-topic-form').addEventListener('submit', handleVocabTopicSubmit);

    // Gender quiz button
    document.getElementById('generate-gender-quiz').addEventListener('click', generateGenderQuiz);

    // Verb type buttons
    document.querySelectorAll('.verb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.verb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentVerbType = btn.dataset.verb;
        });
    });

    // Generate verbs button
    document.getElementById('generate-verbs').addEventListener('click', generateVerbs);
}

function switchVocabTab(vocabType) {
    currentVocabType = vocabType;

    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.vocab === vocabType);
    });

    document.querySelectorAll('.vocab-content').forEach(content => {
        content.classList.toggle('active', content.id === `vocab-${vocabType}`);
    });
}

async function handleVocabTopicSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');

    const topic = document.getElementById('vocab-topic-input').value;

    try {
        setLoading(btn, true);

        const aiResult = await callEdgeFunction('generate-vocab', {
            topic,
            vocabType: 'topic'
        });

        const { error } = await supabase
            .from('french_vocabulary')
            .insert({
                topic,
                content: aiResult,
                vocab_type: 'topic'
            });

        if (error) throw error;

        showToast('Vocabulary generated!', 'success');
        form.reset();
        loadVocabulary();

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to generate vocabulary', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function generateGenderQuiz() {
    const btn = document.getElementById('generate-gender-quiz');
    const quizArea = document.getElementById('gender-quiz-area');

    try {
        setLoading(btn, true);

        const aiResult = await callEdgeFunction('generate-vocab', {
            topic: 'common nouns',
            vocabType: 'gender'
        });

        if (aiResult.words && aiResult.words.length > 0) {
            genderQuizData = aiResult.words;
            genderQuizIndex = 0;
            genderQuizScore = 0;
            quizArea.classList.remove('hidden');
            renderGenderQuiz();
        }

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to generate quiz', 'error');
    } finally {
        setLoading(btn, false);
    }
}

function renderGenderQuiz() {
    const quizArea = document.getElementById('gender-quiz-area');

    if (genderQuizIndex >= genderQuizData.length) {
        // Quiz complete
        quizArea.innerHTML = `
            <div class="quiz-word">
                <h4>Quiz Complete! 🎉</h4>
                <p>Score: ${genderQuizScore} / ${genderQuizData.length}</p>
                <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
            </div>
        `;
        return;
    }

    const word = genderQuizData[genderQuizIndex];
    const displayWord = word.french || word.noun || word.word;

    quizArea.innerHTML = `
        <div class="quiz-word">
            <h4>${displayWord.replace(/^(le |la |l')/, '')}</h4>
            <p>${word.english || word.translation || ''}</p>
            <div class="quiz-buttons">
                <button class="quiz-btn masculine" onclick="checkGenderAnswer('masculine')">Le (Masculin)</button>
                <button class="quiz-btn feminine" onclick="checkGenderAnswer('feminine')">La (Féminin)</button>
            </div>
            <div id="quiz-feedback"></div>
            <div class="quiz-progress">Question ${genderQuizIndex + 1} of ${genderQuizData.length}</div>
        </div>
    `;
}

function checkGenderAnswer(answer) {
    const word = genderQuizData[genderQuizIndex];
    const displayWord = word.french || word.noun || word.word || '';
    const isLe = displayWord.toLowerCase().startsWith('le ');
    const correctAnswer = isLe ? 'masculine' : 'feminine';

    const feedback = document.getElementById('quiz-feedback');
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
        genderQuizScore++;
        feedback.innerHTML = `<div class="quiz-result correct">✓ Correct!</div>`;
    } else {
        feedback.innerHTML = `<div class="quiz-result incorrect">✗ Incorrect. It's ${displayWord}</div>`;
    }

    // Next question after delay
    setTimeout(() => {
        genderQuizIndex++;
        renderGenderQuiz();
    }, 1500);
}

async function generateVerbs() {
    const btn = document.getElementById('generate-verbs');

    try {
        setLoading(btn, true);

        const aiResult = await callEdgeFunction('generate-vocab', {
            topic: currentVerbType,
            vocabType: 'verb',
            verbType: currentVerbType
        });

        const { error } = await supabase
            .from('french_vocabulary')
            .insert({
                topic: `${currentVerbType.toUpperCase()} verbs`,
                content: aiResult,
                vocab_type: 'verb'
            });

        if (error) throw error;

        showToast('Verbs generated!', 'success');
        loadVocabulary();

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to generate verbs', 'error');
    } finally {
        setLoading(btn, false);
    }
}

// =============================================
// Data Loading
// =============================================

async function loadAllData() {
    await Promise.all([
        loadClasswork(),
        loadHomework(),
        loadVocabulary(),
        loadGrammar()
    ]);
}

async function loadClasswork() {
    try {
        const { data, error } = await supabase
            .from('french_classwork')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        const list = document.getElementById('classwork-list');

        if (!data || data.length === 0) {
            list.innerHTML = '<p class="empty-state">No entries yet</p>';
            return;
        }

        list.innerHTML = data.map(entry => `
            <div class="entry-item" onclick="showClassworkDetail('${entry.id}')">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-preview">${truncate(entry.raw_notes, 60)}</div>
                ${entry.tags && entry.tags.length > 0 ? `
                    <div class="entry-tags">
                        ${entry.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading classwork:', error);
    }
}

async function loadHomework() {
    try {
        const { data, error } = await supabase
            .from('french_homework')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        const list = document.getElementById('homework-list');

        if (!data || data.length === 0) {
            list.innerHTML = '<p class="empty-state">No homework yet</p>';
            return;
        }

        list.innerHTML = data.map(entry => `
            <div class="entry-item" onclick="showHomeworkDetail('${entry.id}')">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-preview">${truncate(entry.hw_given, 60)}</div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading homework:', error);
    }
}

async function loadVocabulary() {
    try {
        const { data, error } = await supabase
            .from('french_vocabulary')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Topic vocabulary
        const topicData = data?.filter(v => v.vocab_type === 'topic') || [];
        const topicList = document.getElementById('vocab-topic-list');

        if (topicData.length === 0) {
            topicList.innerHTML = '<p class="empty-state">No vocabulary yet</p>';
        } else {
            topicList.innerHTML = topicData.map(entry => `
                <div class="entry-item" onclick="showVocabDetail('${entry.id}')">
                    <div class="entry-date">${entry.topic}</div>
                    <div class="entry-preview">${formatDate(entry.created_at)}</div>
                </div>
            `).join('');
        }

        // Verb vocabulary
        const verbData = data?.filter(v => v.vocab_type === 'verb') || [];
        const verbList = document.getElementById('verb-list');

        if (verbData.length === 0) {
            verbList.innerHTML = '<p class="empty-state">No verbs saved yet</p>';
        } else {
            verbList.innerHTML = verbData.map(entry => `
                <div class="entry-item" onclick="showVocabDetail('${entry.id}')">
                    <div class="entry-date">${entry.topic}</div>
                    <div class="entry-preview">${formatDate(entry.created_at)}</div>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading vocabulary:', error);
    }
}

async function loadGrammar() {
    try {
        const { data, error } = await supabase
            .from('french_grammar')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const list = document.getElementById('grammar-list');

        if (!data || data.length === 0) {
            list.innerHTML = '<p class="empty-state">No grammar notes yet</p>';
            return;
        }

        list.innerHTML = data.map(entry => `
            <div class="entry-item" onclick="showGrammarDetail('${entry.id}')">
                <div class="entry-date">${entry.topic}</div>
                <div class="entry-preview">${formatDate(entry.created_at)}</div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading grammar:', error);
    }
}

// =============================================
// Detail Views
// =============================================

async function showClassworkDetail(id) {
    try {
        const { data, error } = await supabase
            .from('french_classwork')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const modal = document.getElementById('detail-modal');
        const content = document.getElementById('detail-content');

        content.innerHTML = `
            <h2>📚 Classwork Notes</h2>
            <div class="detail-date">${formatDate(data.date)}</div>
            
            ${data.tags && data.tags.length > 0 ? `
                <div class="entry-tags" style="margin-bottom: 1.5rem;">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h3>Formatted Notes</h3>
                <div class="detail-body">${renderMarkdown(data.formatted_notes || data.raw_notes)}</div>
            </div>
            
            <div class="detail-section">
                <h3>Original Notes</h3>
                <div class="detail-body">${data.raw_notes}</div>
            </div>
        `;

        modal.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load entry', 'error');
    }
}

async function showHomeworkDetail(id) {
    try {
        const { data, error } = await supabase
            .from('french_homework')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const modal = document.getElementById('detail-modal');
        const content = document.getElementById('detail-content');

        content.innerHTML = `
            <h2>📝 Homework</h2>
            <div class="detail-date">${formatDate(data.date)}</div>
            
            <div class="detail-section">
                <h3>Assignment Given</h3>
                <div class="detail-body">${data.hw_given}</div>
            </div>
            
            <div class="detail-section">
                <h3>My Work</h3>
                <div class="detail-body">${data.hw_done || 'Not completed yet'}</div>
            </div>
        `;

        modal.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load entry', 'error');
    }
}

async function showVocabDetail(id) {
    try {
        const { data, error } = await supabase
            .from('french_vocabulary')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const modal = document.getElementById('detail-modal');
        const content = document.getElementById('detail-content');

        let vocabHtml = '';

        if (data.vocab_type === 'topic' && data.content.vocabulary) {
            vocabHtml = `
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <th style="text-align: left; padding: 0.75rem;">French</th>
                            <th style="text-align: left; padding: 0.75rem;">English</th>
                            <th style="text-align: left; padding: 0.75rem;">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.content.vocabulary.map(word => `
                            <tr style="border-bottom: 1px solid var(--border-subtle);">
                                <td style="padding: 0.75rem;">${word.french || word.word || ''}</td>
                                <td style="padding: 0.75rem;">${word.english || word.translation || ''}</td>
                                <td style="padding: 0.75rem;">${word.gender || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (data.vocab_type === 'verb' && data.content.verbs) {
            vocabHtml = data.content.verbs.map(verb => `
                <div style="background: var(--bg-input); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <h4 style="color: var(--accent-blue-light); margin-bottom: 0.5rem;">${verb.infinitive || verb.verb}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${verb.english || verb.meaning}</p>
                    ${verb.present || verb.conjugation ? `
                        <p style="font-size: 0.875rem;"><strong>Present:</strong> ${JSON.stringify(verb.present || verb.conjugation)}</p>
                    ` : ''}
                    ${verb.example ? `<p style="font-style: italic; margin-top: 0.5rem;">"${verb.example}"</p>` : ''}
                </div>
            `).join('');
        } else {
            vocabHtml = `<pre style="white-space: pre-wrap;">${JSON.stringify(data.content, null, 2)}</pre>`;
        }

        content.innerHTML = `
            <h2>📖 ${data.topic}</h2>
            <div class="detail-date">${formatDate(data.created_at)}</div>
            
            <div class="detail-section">
                <div class="detail-body">${vocabHtml}</div>
            </div>
        `;

        modal.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load vocabulary', 'error');
    }
}

async function showGrammarDetail(id) {
    try {
        const { data, error } = await supabase
            .from('french_grammar')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const modal = document.getElementById('detail-modal');
        const content = document.getElementById('detail-content');

        content.innerHTML = `
            <h2>📏 ${data.topic}</h2>
            <div class="detail-date">${formatDate(data.created_at)}</div>
            
            <div class="detail-section">
                <div class="detail-body">${renderMarkdown(data.notes)}</div>
            </div>
        `;

        modal.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load grammar notes', 'error');
    }
}

// =============================================
// API Calls
// =============================================

async function callEdgeFunction(endpoint, data) {
    const response = await fetch(`${EDGE_FUNCTION_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API call failed');
    }

    return response.json();
}

// =============================================
// Utilities
// =============================================

function setLoading(btn, loading) {
    const spinner = btn.querySelector('.spinner');
    const text = btn.querySelector('span');

    btn.disabled = loading;
    if (spinner) spinner.classList.toggle('hidden', !loading);
    if (text) text.style.opacity = loading ? '0.5' : '1';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function truncate(str, length) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}

function renderMarkdown(text) {
    if (!text) return '';

    // Simple markdown rendering
    return text
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n/g, '<br>');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Make functions globally available for onclick handlers
window.showClassworkDetail = showClassworkDetail;
window.showHomeworkDetail = showHomeworkDetail;
window.showVocabDetail = showVocabDetail;
window.showGrammarDetail = showGrammarDetail;
window.checkGenderAnswer = checkGenderAnswer;
