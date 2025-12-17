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

// Classwork Specific State
let editingClassworkId = null;
let sectionsList = []; // Array of section objects {id, name}

// =============================================
// Initialize App
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    initPasswordProtection();
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
        initializeAppContent();
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = input.value;

        if (password === CORRECT_PASSWORD) {
            sessionStorage.setItem('french-app-auth', 'true');
            modal.classList.add('hidden');
            app.classList.remove('hidden');
            initializeAppContent();
            showToast('Bienvenue! 🇫🇷', 'success');
        } else {
            error.classList.remove('hidden');
            input.value = '';
            input.focus();
            setTimeout(() => error.classList.add('hidden'), 3000);
        }
    });
}

function initializeAppContent() {
    initNavigation();
    initForms();
    initClassworkUI();
    initVocabulary();
    loadAllData();
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

    // Detail modal close (for other sections still using modal)
    const closeDetailBtn = document.getElementById('close-detail');
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', () => {
            document.getElementById('detail-modal').classList.add('hidden');
        });
    }

    // Close modal on overlay click
    const detailModal = document.getElementById('detail-modal');
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target.id === 'detail-modal') {
                document.getElementById('detail-modal').classList.add('hidden');
            }
        });
    }
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
// Classwork Library Logic
// =============================================

function initClassworkUI() {
    // Top Level Buttons
    document.getElementById('btn-new-section').addEventListener('click', promptNewSection);
    document.getElementById('btn-new-classwork').addEventListener('click', () => openClassworkEditor(null));

    // Filters
    document.getElementById('cw-search').addEventListener('input', debounce(loadClasswork, 500));
    document.getElementById('cw-filter-section').addEventListener('change', loadClasswork);
    document.getElementById('cw-filter-date').addEventListener('change', loadClasswork);

    // Editor Actions
    document.getElementById('btn-back-library').addEventListener('click', () => toggleClassworkView('list'));
    document.getElementById('btn-save-note').addEventListener('click', saveClassworkNote);
    document.getElementById('btn-ai-format').addEventListener('click', formatNotesWithAI);
}

function toggleClassworkView(viewName) {
    const listContainer = document.getElementById('classwork-library-view');
    const editorContainer = document.getElementById('classwork-editor-view');
    const filters = document.querySelector('.library-filters'); // Use class for selection
    const headerActions = document.querySelector('.section-header-row .header-actions');

    if (viewName === 'editor') {
        listContainer.classList.add('hidden');
        editorContainer.classList.remove('hidden');
        if (filters) filters.classList.add('hidden');
        if (headerActions) headerActions.classList.add('hidden');
    } else {
        listContainer.classList.remove('hidden');
        editorContainer.classList.add('hidden');
        if (filters) filters.classList.remove('hidden');
        if (headerActions) headerActions.classList.remove('hidden');
        loadClasswork(); // Refresh list on return
    }
}

async function loadSections() {
    try {
        const { data, error } = await supabase
            .from('french_sections')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        sectionsList = data || [];

        // Populate Filter Dropdown
        const filterSelect = document.getElementById('cw-filter-section');
        const currentFilter = filterSelect.value;
        filterSelect.innerHTML = '<option value="">All Sections</option>';
        sectionsList.forEach(sec => {
            filterSelect.innerHTML += `<option value="${sec.id}">${sec.name}</option>`;
        });
        filterSelect.value = currentFilter;

        // Populate Editor Dropdown
        const editorSelect = document.getElementById('editor-section');
        editorSelect.innerHTML = '<option value="">Uncategorized</option>';
        sectionsList.forEach(sec => {
            editorSelect.innerHTML += `<option value="${sec.id}">${sec.name}</option>`;
        });

    } catch (err) {
        console.error('Error loading sections:', err);
    }
}

async function promptNewSection() {
    const name = prompt("Enter section name (e.g., 'Conversation Class', 'Verbs 101'):");
    if (!name) return;

    try {
        const { error } = await supabase
            .from('french_sections')
            .insert({ name });

        if (error) throw error;

        showToast(`Section "${name}" created!`, 'success');
        loadSections();
    } catch (err) {
        showToast('Failed to create section', 'error');
        console.error(err);
    }
}

async function loadClasswork() {
    const grid = document.getElementById('classwork-grid');
    // Ensure we are in list view
    if (document.getElementById('classwork-library-view').classList.contains('hidden')) return;

    // Filters
    const searchQuery = document.getElementById('cw-search')?.value.toLowerCase();
    const sectionId = document.getElementById('cw-filter-section')?.value;
    const dateFilter = document.getElementById('cw-filter-date')?.value;

    try {
        let query = supabase
            .from('french_classwork')
            .select(`
                *,
                french_sections(name)
            `)
            .order('date', { ascending: false });

        if (sectionId) {
            query = query.eq('section_id', sectionId);
        }

        if (dateFilter) {
            query = query.eq('date', dateFilter);
        }

        const { data, error } = await query;

        if (error) throw error;

        let filteredData = data;

        // Client-side search for more flexibility on tags/content
        if (searchQuery) {
            filteredData = data.filter(item => {
                const textMatch = (item.raw_notes || '').toLowerCase().includes(searchQuery) ||
                    (item.formatted_notes || '').toLowerCase().includes(searchQuery);
                const tagMatch = (item.tags || []).some(t => t.toLowerCase().includes(searchQuery));
                return textMatch || tagMatch;
            });
        }

        if (!filteredData || filteredData.length === 0) {
            grid.innerHTML = '<p class="empty-state card-wide">No classwork found matching criteria.</p>';
            return;
        }

        grid.innerHTML = filteredData.map(item => `
            <div class="note-card" onclick="openClassworkEditor('${item.id}')">
                <div class="note-header">
                    <span>${formatDate(item.date)}</span>
                    <span style="font-weight:600; color:var(--accent-blue-light);">${item.french_sections?.name || 'Uncategorized'}</span>
                </div>
                <div class="note-title">${extractTitle(item)}</div>
                <div class="note-preview">${stripHtml(item.formatted_notes || item.raw_notes || '')}</div>
                ${item.tags && item.tags.length > 0 ? `
                    <div class="note-tags">
                        ${item.tags.slice(0, 3).map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');

    } catch (err) {
        console.error('Error loading classwork:', err);
        grid.innerHTML = '<p class="empty-state">Error loading notes. check console.</p>';
    }
}

async function openClassworkEditor(id) {
    editingClassworkId = id;
    toggleClassworkView('editor');

    // Reset Form
    document.getElementById('editor-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('editor-section').value = '';
    document.getElementById('editor-tags').value = '';
    document.getElementById('editor-raw').value = '';
    document.getElementById('editor-formatted').value = '';
    document.getElementById('editor-status').textContent = id ? 'Loading...' : 'New Note';

    if (id) {
        try {
            const { data, error } = await supabase
                .from('french_classwork')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            document.getElementById('editor-date').value = data.date;
            document.getElementById('editor-section').value = data.section_id || '';
            document.getElementById('editor-tags').value = (data.tags || []).join(', ');
            document.getElementById('editor-raw').value = data.raw_notes || '';
            document.getElementById('editor-formatted').value = data.formatted_notes || '';
            document.getElementById('editor-status').textContent = 'Editing Mode';

        } catch (err) {
            showToast('Failed to load note details', 'error');
            console.error(err);
            toggleClassworkView('list');
        }
    }
}

async function formatNotesWithAI() {
    const rawNotes = document.getElementById('editor-raw').value;
    const btn = document.getElementById('btn-ai-format');

    if (!rawNotes) {
        showToast('Please enter some raw notes first.', 'error');
        return;
    }

    try {
        setLoading(btn, true);
        const aiResult = await callEdgeFunction('format-notes', { notes: rawNotes });

        document.getElementById('editor-formatted').value = aiResult.formatted_notes;

        // Append new tags to existing ones
        const currentTagsStr = document.getElementById('editor-tags').value;
        const currentTags = currentTagsStr ? currentTagsStr.split(',').map(t => t.trim()) : [];
        const newTags = aiResult.tags || [];
        const mergedTags = [...new Set([...currentTags, ...newTags])]; // Unique
        document.getElementById('editor-tags').value = mergedTags.join(', ');

        showToast('AI Formatting Complete!', 'success');

    } catch (err) {
        console.error(err);
        showToast('AI Formatting failed', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function saveClassworkNote() {
    const btn = document.getElementById('btn-save-note');
    const date = document.getElementById('editor-date').value;
    const sectionId = document.getElementById('editor-section').value || null;
    const tagsStr = document.getElementById('editor-tags').value;
    const rawNotes = document.getElementById('editor-raw').value;
    const formattedNotes = document.getElementById('editor-formatted').value;

    const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t.length > 0);

    if (!rawNotes) {
        showToast('Note content cannot be empty', 'error');
        return;
    }

    try {
        setLoading(btn, true);

        const payload = {
            date,
            section_id: sectionId,
            tags,
            raw_notes: rawNotes,
            formatted_notes: formattedNotes
        };

        let result;
        if (editingClassworkId) {
            // Update
            result = await supabase
                .from('french_classwork')
                .update(payload)
                .eq('id', editingClassworkId);
        } else {
            // Insert
            result = await supabase
                .from('french_classwork')
                .insert(payload);
        }

        if (result.error) throw result.error;

        showToast('Note saved successfully!', 'success');

        // If it was new, we can just switch back to list. Or stay. Let's switch back.
        toggleClassworkView('list');

    } catch (err) {
        console.error(err);
        showToast('Failed to save note', 'error');
    } finally {
        setLoading(btn, false);
    }
}

// Helper to get a preview title from formatted notes (usually first H1 or H2)
function extractTitle(item) {
    const text = item.formatted_notes || item.raw_notes || '';
    // Try to find a header markdown
    const match = text.match(/^#+\s+(.*)$/m);
    if (match) return match[1];

    // Or just first line
    const firstLine = text.split('\n')[0];
    return truncate(firstLine, 40);
}

function stripHtml(markdown) {
    return markdown
        .replace(/[#*`_~]/g, '') // remove markdown chars
        .replace(/\n/g, ' ');
}

// =============================================
// Forms (Legacy/Other Sections)
// =============================================

function initForms() {
    // Homework form
    const hwForm = document.getElementById('homework-form');
    if (hwForm) hwForm.addEventListener('submit', handleHomeworkSubmit);

    // Grammar form
    const grForm = document.getElementById('grammar-form');
    if (grForm) grForm.addEventListener('submit', handleGrammarSubmit);

    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const hwDate = document.getElementById('hw-date');
    if (hwDate) hwDate.value = today;
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
    const vocabForm = document.getElementById('vocab-topic-form');
    if (vocabForm) vocabForm.addEventListener('submit', handleVocabTopicSubmit);

    // Gender quiz button
    const genQuizBtn = document.getElementById('generate-gender-quiz');
    if (genQuizBtn) genQuizBtn.addEventListener('click', generateGenderQuiz);

    // Verb type buttons
    document.querySelectorAll('.verb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.verb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentVerbType = btn.dataset.verb;
        });
    });

    // Generate verbs button
    const genVerbsBtn = document.getElementById('generate-verbs');
    if (genVerbsBtn) genVerbsBtn.addEventListener('click', generateVerbs);
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
// Data Loading (General)
// =============================================

async function loadAllData() {
    await Promise.all([
        loadSections(),
        loadClasswork(),
        loadHomework(),
        loadVocabulary(),
        loadGrammar()
    ]);
}

async function loadHomework() {
    try {
        const { data, error } = await supabase
            .from('french_homework')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        const list = document.getElementById('homework-list');
        if (!list) return;

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

        if (topicList) {
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
        }

        // Verb vocabulary
        const verbData = data?.filter(v => v.vocab_type === 'verb') || [];
        const verbList = document.getElementById('verb-list');

        if (verbList) {
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
        if (!list) return;

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
// Detail Views (Legacy/Other)
// =============================================

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

        // Helper function to extract French word from various property names
        const getFrench = (word) => {
            return word.french || word.french_word || word.word_french ||
                word.word || word.terme || word.mot ||
                Object.values(word).find(v => typeof v === 'string' && /[éèêëàâäùûüôöîïç]/i.test(v)) || '';
        };

        // Helper function to extract English translation
        const getEnglish = (word) => {
            return word.english || word.english_translation || word.translation ||
                word.meaning || word.definition || word.traduction || '';
        };

        // Helper function to extract gender
        const getGender = (word) => {
            return word.gender || word.genre || word.article || '-';
        };

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
                                <td style="padding: 0.75rem;">${getFrench(word)}</td>
                                <td style="padding: 0.75rem;">${getEnglish(word)}</td>
                                <td style="padding: 0.75rem;">${getGender(word)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (data.vocab_type === 'verb' && data.content.verbs) {
            vocabHtml = data.content.verbs.map(verb => `
                <div style="background: var(--bg-input); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <h4 style="color: var(--accent-blue-light); margin-bottom: 0.5rem;">${verb.infinitive || verb.verb || verb.infinitif || ''}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${verb.english || verb.meaning || verb.translation || ''}</p>
                    ${verb.present || verb.conjugation || verb.present_tense ? `
                        <p style="font-size: 0.875rem;"><strong>Present:</strong> ${JSON.stringify(verb.present || verb.conjugation || verb.present_tense)}</p>
                    ` : ''}
                    ${verb.example || verb.example_sentence ? `<p style="font-style: italic; margin-top: 0.5rem;">"${verb.example || verb.example_sentence}"</p>` : ''}
                </div>
            `).join('');
        } else {
            // Fallback: try to render as a table with whatever keys exist
            const items = data.content.vocabulary || data.content.words || data.content.items || [];
            if (Array.isArray(items) && items.length > 0) {
                const keys = Object.keys(items[0]);
                vocabHtml = `
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                ${keys.map(k => `<th style="text-align: left; padding: 0.75rem; text-transform: capitalize;">${k.replace(/_/g, ' ')}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr style="border-bottom: 1px solid var(--border-subtle);">
                                    ${keys.map(k => `<td style="padding: 0.75rem;">${typeof item[k] === 'object' ? JSON.stringify(item[k]) : (item[k] || '-')}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } else {
                vocabHtml = `<pre style="white-space: pre-wrap;">${JSON.stringify(data.content, null, 2)}</pre>`;
            }
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
    const text = btn.innerText; // Basic fallback

    // Better handling if text is in a span
    const span = btn.querySelector('span');

    btn.disabled = loading;
    if (spinner) spinner.classList.toggle('hidden', !loading);
    if (span) span.style.opacity = loading ? '0.5' : '1';
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

// Simple debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
window.showClassworkDetail = openClassworkEditor; // Remapped to editor
window.showHomeworkDetail = showHomeworkDetail;
window.showVocabDetail = showVocabDetail;
window.showGrammarDetail = showGrammarDetail;
window.checkGenderAnswer = checkGenderAnswer;
window.openClassworkEditor = openClassworkEditor; // Explicit
