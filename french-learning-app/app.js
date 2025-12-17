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
    initHomeworkUI(); // New
    initVocabulary(); // Vocab still uses old layout for now?
    initGrammarUI(); // Enhanced
    initResources();
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
    document.getElementById('btn-delete-note').addEventListener('click', () => deleteItem('french_classwork', editingClassworkId, loadClasswork));
    document.getElementById('btn-ai-format').addEventListener('click', formatNotesWithAI);
}

function toggleClassworkView(viewName) {
    const listContainer = document.getElementById('classwork-library-view');
    const editorContainer = document.getElementById('classwork-editor-view');
    const filters = document.querySelector('.library-filters'); // Use class for selection
    const headerActions = document.querySelector('.section-header-row .header-actions');
    const backBtn = document.getElementById('btn-back-library');

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
    document.getElementById('btn-delete-note').style.display = id ? 'block' : 'none';

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

async function deleteItem(table, id, successCallback) {
    if (!id || !confirm('Are you sure you want to delete this item? This cannot be undone.')) return;

    try {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id);

        if (error) throw error;

        showToast('Item deleted successfully', 'success');
        if (successCallback) successCallback(); // Reload view
        toggleClassworkView('list'); // Return to list if in editor

    } catch (err) {
        console.error(err);
        showToast('Failed to delete item', 'error');
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

// =============================================
// Homework (Enhanced)
// =============================================

function initHomeworkUI() {
    // Add Homework Button
    document.getElementById('btn-new-homework')?.addEventListener('click', () => {
        openHomeworkEditor(null);
    });

    // Back Button
    document.getElementById('btn-back-homework')?.addEventListener('click', () => {
        toggleHomeworkView('list');
    });

    // Delete Button
    document.getElementById('btn-delete-homework')?.addEventListener('click', () => {
        const id = document.getElementById('hw-id').value;
        if (id) deleteItem('french_homework', id, loadHomework);
    });

    // Form Submit
    const form = document.getElementById('homework-form');
    if (form) form.addEventListener('submit', handleHomeworkSubmit);
}

function toggleHomeworkView(viewName) {
    const listContainer = document.getElementById('homework-library-view');
    const editorContainer = document.getElementById('homework-editor-view');
    const headerActions = document.querySelector('#homework-section .header-actions');

    if (viewName === 'editor') {
        listContainer.classList.add('hidden');
        editorContainer.classList.remove('hidden');
        if (headerActions) headerActions.classList.add('hidden');
    } else {
        listContainer.classList.remove('hidden');
        editorContainer.classList.add('hidden');
        if (headerActions) headerActions.classList.remove('hidden');
        loadHomework();
    }
}

async function openHomeworkEditor(id) {
    toggleHomeworkView('editor');

    const form = document.getElementById('homework-form');
    const deleteBtn = document.getElementById('btn-delete-homework');
    const title = document.getElementById('hw-form-title');

    if (!id) {
        // New Mode
        form.reset();
        document.getElementById('hw-id').value = '';
        document.getElementById('hw-date').value = new Date().toISOString().split('T')[0];
        deleteBtn.classList.add('hidden');
        title.textContent = 'Add Homework';
    } else {
        // Edit Mode
        title.textContent = 'Edit Homework';
        deleteBtn.classList.remove('hidden');

        try {
            const { data, error } = await supabase
                .from('french_homework')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            document.getElementById('hw-id').value = data.id;
            document.getElementById('hw-date').value = data.date;
            document.getElementById('hw-given').value = data.hw_given;
            document.getElementById('hw-done').value = data.hw_done || '';

        } catch (err) {
            console.error(err);
            showToast('Failed to load homework details', 'error');
            toggleHomeworkView('list');
        }
    }
}

async function handleHomeworkSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');

    const id = document.getElementById('hw-id').value;
    const date = document.getElementById('hw-date').value;
    const hwGiven = document.getElementById('hw-given').value;
    const hwDone = document.getElementById('hw-done').value;

    try {
        setLoading(btn, true);

        let result;
        if (id) {
            // Update
            result = await supabase
                .from('french_homework')
                .update({
                    date,
                    hw_given: hwGiven,
                    hw_done: hwDone
                })
                .eq('id', id);
        } else {
            // Insert
            result = await supabase
                .from('french_homework')
                .insert({
                    date,
                    hw_given: hwGiven,
                    hw_done: hwDone
                });
        }

        if (result.error) throw result.error;

        showToast('Homework saved!', 'success');
        toggleHomeworkView('list');

    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Failed to save homework', 'error');
    } finally {
        setLoading(btn, false);
    }
}

// =============================================
// Grammar (Enhanced)
// =============================================

function initGrammarUI() {
    // New Topic Button
    document.getElementById('btn-new-grammar')?.addEventListener('click', () => {
        openGrammarEditor(null);
    });

    // Back Button
    document.getElementById('btn-back-grammar')?.addEventListener('click', () => {
        toggleGrammarView('list');
    });

    // Delete Button
    document.getElementById('btn-delete-grammar')?.addEventListener('click', () => {
        // ID is stored in the delete button's onclick or we can track it
        const id = document.getElementById('btn-delete-grammar').dataset.id;
        if (id) deleteItem('french_grammar', id, loadGrammar);
    });

    // Form Submit
    const form = document.getElementById('grammar-form');
    if (form) form.addEventListener('submit', handleGrammarSubmit);
}

function toggleGrammarView(viewName) {
    const listContainer = document.getElementById('grammar-library-view');
    const editorContainer = document.getElementById('grammar-editor-view');
    const headerActions = document.querySelector('#grammar-section .header-actions');

    if (viewName === 'editor') {
        listContainer.classList.add('hidden');
        editorContainer.classList.remove('hidden');
        if (headerActions) headerActions.classList.add('hidden');
    } else {
        listContainer.classList.remove('hidden');
        editorContainer.classList.add('hidden');
        if (headerActions) headerActions.classList.remove('hidden');
        loadGrammar();
    }
}

async function openGrammarEditor(id) {
    // This is actually for "New Topic" (Generator)
    toggleGrammarView('editor');

    document.getElementById('grammar-detail-content').classList.add('hidden');
    document.getElementById('grammar-generator-content').classList.remove('hidden');

    document.getElementById('btn-delete-grammar').classList.add('hidden'); // No delete for new

    // Reset form
    document.getElementById('grammar-form').reset();
}

async function openGrammarDetail(id) {
    toggleGrammarView('editor');

    const detailContent = document.getElementById('grammar-detail-content');
    const generatorContent = document.getElementById('grammar-generator-content');
    const deleteBtn = document.getElementById('btn-delete-grammar');

    detailContent.classList.remove('hidden');
    generatorContent.classList.add('hidden');

    // Show Delete Button and store ID
    deleteBtn.classList.remove('hidden');
    deleteBtn.dataset.id = id;

    // Load Data
    try {
        const { data, error } = await supabase
            .from('french_grammar')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        document.getElementById('grammar-detail-title').textContent = data.topic;
        document.getElementById('grammar-detail-body').innerHTML = renderMarkdown(data.notes);

    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load grammar notes', 'error');
        toggleGrammarView('list');
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
        const { data, error } = await supabase
            .from('french_grammar')
            .insert({
                topic,
                notes: aiResult.notes
            })
            .select()
            .single();

        if (error) throw error;

        showToast('Grammar notes generated and saved!', 'success');

        // Open the newly created note
        openGrammarDetail(data.id);

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
// Resources (New)
// =============================================

function initResources() {
    const btnAdd = document.getElementById('btn-add-resource');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const formContainer = document.getElementById('resource-form-container');
            formContainer.classList.toggle('hidden');
        });
    }

    const resForm = document.getElementById('resource-form');
    if (resForm) resForm.addEventListener('submit', handleResourceSubmit);

    // Filters
    document.getElementById('res-search')?.addEventListener('input', debounce(loadResources, 500));
    document.getElementById('res-filter-type')?.addEventListener('change', loadResources);
}

async function handleResourceSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');

    const title = document.getElementById('res-title').value;
    const url = document.getElementById('res-url').value;
    const type = document.getElementById('res-type').value;

    try {
        setLoading(btn, true);

        const { error } = await supabase
            .from('french_resources')
            .insert({
                title,
                url,
                type
            });

        if (error) throw error;

        showToast('Resource added!', 'success');
        e.target.reset();
        document.getElementById('resource-form-container').classList.add('hidden');
        loadResources();

    } catch (err) {
        console.error(err);
        showToast('Failed to add resource', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function loadResources() {
    const grid = document.getElementById('resources-grid');
    if (!grid) return;

    const searchQuery = document.getElementById('res-search')?.value.toLowerCase();
    const typeFilter = document.getElementById('res-filter-type')?.value;

    try {
        let query = supabase
            .from('french_resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
        if (typeFilter) query = query.eq('type', typeFilter);

        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            grid.innerHTML = '<p class="empty-state card-wide">No resources yet</p>';
            return;
        }

        grid.innerHTML = data.map(item => {
            let mediaContent = '';

            if (item.type === 'video' && item.url.includes('youtu')) {
                const videoId = getYoutubeId(item.url);
                if (videoId) {
                    mediaContent = `
                        <div style="aspect-ratio: 16/9; margin-bottom: 1rem; border-radius: var(--radius-md); overflow: hidden;">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                }
            }

            const typeIcons = {
                video: '🎥',
                article: '📄',
                tool: '🛠️',
                other: '🔗'
            };
            const icon = typeIcons[item.type] || '🔗';

            return `
                <div class="note-card" style="height: auto; cursor: default;">
                    <div class="note-header">
                        <span>${icon} ${item.type.toUpperCase()}</span>
                        <button class="btn-text" onclick="deleteItem('french_resources', '${item.id}', loadResources)" style="color:var(--accent-red); font-size:0.8rem;">Delete</button>
                    </div>
                    <div class="note-title"><a href="${item.url}" target="_blank" style="color:white; text-decoration:none;">${item.title} ↗</a></div>
                    ${mediaContent}
                    ${item.description ? `<p class="note-preview">${item.description}</p>` : ''}
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error(err);
    }
}

function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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
        loadGrammar(),
        loadResources()
    ]);
}

async function loadHomework() {
    const grid = document.getElementById('homework-grid');
    if (!grid) return;

    try {
        const { data, error } = await supabase
            .from('french_homework')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            grid.innerHTML = '<p class="empty-state card-wide">No homework yet</p>';
            return;
        }

        grid.innerHTML = data.map(entry => {
            const isDone = entry.hw_done && entry.hw_done.length > 5;
            return `
            <div class="note-card" onclick="openHomeworkEditor('${entry.id}')">
                <div class="note-header">
                    <span>${formatDate(entry.date)}</span>
                    <span style="color: ${isDone ? 'var(--accent-green)' : 'var(--accent-red)'}">
                        ${isDone ? 'Done' : 'Pending'}
                    </span>
                </div>
                <div class="note-title">${truncate(entry.hw_given, 50)}</div>
                <p class="note-preview">${entry.hw_done ? truncate(entry.hw_done, 80) : 'No work recorded'}</p>
            </div>
        `}).join('');

    } catch (error) {
        console.error('Error loading homework:', error);
        grid.innerHTML = '<p class="empty-state">Error loading homework</p>';
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
                verbList.innerHTML = '<p class="empty-state">No verbs yet</p>';
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
    const grid = document.getElementById('grammar-grid');
    if (!grid) return;

    try {
        const { data, error } = await supabase
            .from('french_grammar')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            grid.innerHTML = '<p class="empty-state card-wide">No grammar notes yet</p>';
            return;
        }

        grid.innerHTML = data.map(entry => `
            <div class="note-card" onclick="openGrammarDetail('${entry.id}')">
                <div class="note-header">
                    <span>Grammar</span>
                    <span>${formatDate(entry.created_at)}</span>
                </div>
                <div class="note-title">${entry.topic}</div>
                <p class="note-preview">${truncate(entry.notes, 100)}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading grammar:', error);
        grid.innerHTML = '<p class="empty-state">Error loading grammar</p>';
    }
}

// =============================================
// Detail Views (Legacy Modal - optional for other sections)
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

            <button onclick="deleteItem('french_homework', '${data.id}', loadHomework)" class="btn btn-secondary btn-full" style="margin-top: 2rem; color: #ff6b6b; border-color: #ff6b6b;">Delete Homework</button>
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
                (word.verb && word.verb.french) || '';
        };

        const getEnglish = (word) => {
            return word.english || word.english_word || word.word_english ||
                word.meaning || word.traduction ||
                (word.verb && word.verb.english) || '';
        };

        const renderTable = (items) => {
            return `
                <div class="vocab-table">
                    ${items.map(item => `
                        <div class="vocab-row">
                            <span class="fr">${getFrench(item)}</span>
                            <span class="en">${getEnglish(item)}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        };

        // Handle different data structures
        if (data.content) {
            if (data.vocab_type === 'verb' && data.content.verbs) {
                // Verb List
                vocabHtml = renderTable(data.content.verbs);
            } else if (data.content.vocabulary) {
                // Topic Vocabulary
                vocabHtml = renderTable(data.content.vocabulary);
            } else if (Array.isArray(data.content)) {
                // Direct Array
                vocabHtml = renderTable(data.content);
            } else if (data.content.words) {
                // Gender Quiz / Word list
                vocabHtml = renderTable(data.content.words);
            } else {
                vocabHtml = '<p>Data structure not recognized</p>';
            }
        }

        content.innerHTML = `
            <h2>📖 ${data.topic}</h2>
            <div class="detail-date">${formatDate(data.created_at)}</div>
            ${vocabHtml}
            <button onclick="deleteItem('french_vocabulary', '${data.id}', loadVocabulary)" class="btn btn-secondary btn-full" style="margin-top: 2rem; color: #ff6b6b; border-color: #ff6b6b;">Delete Vocabulary</button>
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
            <button onclick="deleteItem('french_grammar', '${data.id}', loadGrammar)" class="btn btn-secondary btn-full" style="margin-top: 2rem; color: #ff6b6b; border-color: #ff6b6b;">Delete Note</button>
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
    // Only implemented for French AI
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
    if (!btn) return;
    const spinner = btn.querySelector('.spinner');
    const span = btn.querySelector('span');

    btn.disabled = loading;
    if (spinner) spinner.classList.toggle('hidden', !loading);
    if (span) span.style.opacity = loading ? '0.5' : '1';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        // If YYYY-MM-DD
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [y, m, d] = dateStr.split('-').map(Number);
            const date = new Date(y, m - 1, d);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        // Fallback for timestamps
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
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
    if (!container) return; // Guard

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
window.showClassworkDetail = openClassworkEditor;
window.showHomeworkDetail = showHomeworkDetail;
window.showVocabDetail = showVocabDetail;
window.showGrammarDetail = showGrammarDetail;
window.checkGenderAnswer = checkGenderAnswer;
window.openClassworkEditor = openClassworkEditor;
window.openHomeworkEditor = openHomeworkEditor;
window.openGrammarEditor = openGrammarEditor;
window.openGrammarDetail = openGrammarDetail;
window.deleteItem = deleteItem;
window.loadResources = loadResources;
