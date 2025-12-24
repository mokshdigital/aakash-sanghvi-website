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

// Initialize supabaseClient client
let supabaseClient;

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
let cwSortColumn = 'date'; // Current sort column: 'date', 'section', 'title'
let cwSortDirection = 'desc'; // 'asc' or 'desc'

// Image Upload State
let cwUploadedImages = []; // Array of {file, url, base64, uploading}
const MAX_IMAGES = 5;

// =============================================
// Initialize App
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    initPasswordProtection();
});

function initSupabase() {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ supabaseClient initialized');
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
    initHomeworkUI();
    initVocabulary();
    initMyVocabulary();
    initGrammarUI();
    initQuizzes();
    initChat();
    initResources();
    loadAllData();
}

// =============================================
// Navigation
// =============================================

function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sidebar = document.querySelector('.app-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const menuBtn = document.getElementById('mobile-menu-btn');

    // Mobile Menu Toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        });
    }

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        });
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);

            // Close mobile menu on selection
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
                overlay.classList.add('hidden');
            }
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

    // Reset all nested views to their default state when switching sections
    // This prevents views from other sections from remaining visible

    // Reset Classwork views
    document.getElementById('classwork-library-view')?.classList.remove('hidden');
    document.getElementById('classwork-editor-view')?.classList.add('hidden');
    document.getElementById('classwork-detail-view')?.classList.add('hidden');

    // Reset Homework views
    document.getElementById('homework-library-view')?.classList.remove('hidden');
    document.getElementById('homework-editor-view')?.classList.add('hidden');

    // Reset Vocabulary views
    document.getElementById('vocab-list-view')?.classList.remove('hidden');
    document.getElementById('vocab-detail-view')?.classList.add('hidden');

    // Reset Grammar views
    document.getElementById('grammar-library-view')?.classList.remove('hidden');
    document.getElementById('grammar-editor-view')?.classList.add('hidden');
}

// =============================================
// Classwork Library Logic
// =============================================

// =============================================
// Classwork Library Logic
// =============================================

function initClassworkUI() {
    // Top Level Buttons
    document.getElementById('btn-new-section')?.addEventListener('click', promptNewSection);
    // New Note Button (Library)
    document.getElementById('btn-new-classwork')?.addEventListener('click', () => {
        openClassworkEditor(null);
    });

    // Filters
    document.getElementById('cw-search')?.addEventListener('input', debounce(loadClasswork, 500));
    document.getElementById('cw-filter-section')?.addEventListener('change', loadClasswork);
    document.getElementById('cw-filter-date')?.addEventListener('change', loadClasswork);

    // Clear Filters Button
    document.getElementById('btn-clear-cw-filters')?.addEventListener('click', clearClassworkFilters);

    // Table Header Sorting
    document.querySelectorAll('.cw-table th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            sortClassworkBy(column);
        });
    });

    // Editor Actions
    document.getElementById('btn-back-library')?.addEventListener('click', () => {
        if (editingClassworkId) {
            openClassworkDetail(editingClassworkId); // Go back to detail if editing existing
        } else {
            toggleClassworkView('list');
        }
    });

    // Detail Actions
    document.getElementById('btn-back-cw-list')?.addEventListener('click', () => {
        toggleClassworkView('list');
    });

    document.getElementById('btn-edit-cw')?.addEventListener('click', () => {
        const id = document.getElementById('btn-edit-cw').dataset.id;
        if (id) openClassworkEditor(id);
    });

    document.getElementById('btn-delete-cw-detail')?.addEventListener('click', () => {
        const id = document.getElementById('btn-delete-cw-detail').dataset.id;
        if (id) deleteItem('french_classwork', id, loadClasswork);
    });

    document.getElementById('btn-save-note')?.addEventListener('click', saveClassworkNote);
    // document.getElementById('btn-delete-note')?.addEventListener('click', () => deleteItem('french_classwork', editingClassworkId, loadClasswork));
    document.getElementById('btn-ai-format')?.addEventListener('click', formatNotesWithAI);

    // Image Upload Handlers
    initImageUpload();
}

// Initialize image upload event handlers
function initImageUpload() {
    const uploadZone = document.getElementById('image-upload-zone');
    const fileInput = document.getElementById('image-file-input');
    const rawNotesTextarea = document.getElementById('editor-raw');

    if (!uploadZone || !fileInput) return;

    // Click to open file picker
    uploadZone.addEventListener('click', () => {
        if (!uploadZone.classList.contains('disabled')) {
            fileInput.click();
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleImageFiles(e.target.files);
        fileInput.value = ''; // Reset for re-selection
    });

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        handleImageFiles(e.dataTransfer.files);
    });

    // Mutual exclusivity: disable upload zone when typing
    rawNotesTextarea?.addEventListener('input', () => {
        const hasText = rawNotesTextarea.value.trim().length > 0;
        const hasImages = cwUploadedImages.length > 0;

        if (hasText && !hasImages) {
            uploadZone.classList.add('disabled');
        } else if (!hasText && !hasImages) {
            uploadZone.classList.remove('disabled');
        }
    });
}

// Handle image file selection
async function handleImageFiles(files) {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
        showToast('Please select valid image files', 'error');
        return;
    }

    const remaining = MAX_IMAGES - cwUploadedImages.length;
    if (remaining <= 0) {
        showToast(`Maximum ${MAX_IMAGES} images allowed`, 'error');
        return;
    }

    const toProcess = validFiles.slice(0, remaining);

    if (validFiles.length > remaining) {
        showToast(`Only ${remaining} more image(s) allowed. Added first ${remaining}.`, 'error');
    }

    // Disable raw notes textarea when images are added
    const rawNotesTextarea = document.getElementById('editor-raw');
    if (rawNotesTextarea) {
        rawNotesTextarea.disabled = true;
        rawNotesTextarea.placeholder = 'Images selected — text input disabled';
    }

    // Process each image
    for (const file of toProcess) {
        await processAndUploadImage(file);
    }
}

// Process single image: convert to base64 and upload to storage
async function processAndUploadImage(file) {
    const uploadStatus = document.getElementById('upload-status');
    const statusText = document.getElementById('upload-status-text');

    // Add to array with uploading state
    const imageObj = {
        file,
        base64: null,
        url: null,
        uploading: true
    };
    cwUploadedImages.push(imageObj);
    renderImageThumbnails();

    // Show upload status
    uploadStatus?.classList.remove('hidden');
    statusText.textContent = `Uploading ${cwUploadedImages.length} image(s)...`;

    try {
        // Convert to base64 for AI processing
        imageObj.base64 = await fileToBase64(file);

        // Upload to Supabase Storage
        const fileName = `cw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${file.name.split('.').pop()}`;

        const { data, error } = await supabaseClient.storage
            .from('french-app-images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabaseClient.storage
            .from('french-app-images')
            .getPublicUrl(fileName);

        imageObj.url = urlData.publicUrl;
        imageObj.uploading = false;

        renderImageThumbnails();

    } catch (err) {
        console.error('Image upload error:', err);
        showToast('Failed to upload image', 'error');
        // Remove failed image
        cwUploadedImages = cwUploadedImages.filter(img => img !== imageObj);
        renderImageThumbnails();
    }

    // Hide upload status if all done
    const stillUploading = cwUploadedImages.some(img => img.uploading);
    if (!stillUploading) {
        uploadStatus?.classList.add('hidden');
    }
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Remove uploaded image
function removeUploadedImage(index) {
    const image = cwUploadedImages[index];

    // Delete from storage if uploaded
    if (image.url) {
        const fileName = image.url.split('/').pop();
        supabaseClient.storage
            .from('french-app-images')
            .remove([fileName])
            .catch(err => console.warn('Failed to delete image from storage:', err));
    }

    cwUploadedImages.splice(index, 1);
    renderImageThumbnails();

    // Re-enable raw notes if no images
    if (cwUploadedImages.length === 0) {
        const rawNotesTextarea = document.getElementById('editor-raw');
        if (rawNotesTextarea) {
            rawNotesTextarea.disabled = false;
            rawNotesTextarea.placeholder = 'Type your rough notes here...';
        }
        document.getElementById('image-upload-zone')?.classList.remove('disabled');
    }
}

// Render image thumbnails
function renderImageThumbnails() {
    const container = document.getElementById('image-thumbnails');
    if (!container) return;

    if (cwUploadedImages.length === 0) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.classList.remove('hidden');
    container.innerHTML = cwUploadedImages.map((img, index) => `
        <div class="image-thumb ${img.uploading ? 'uploading' : ''}">
            <img src="${img.base64 || img.url}" alt="Uploaded image ${index + 1}">
            ${!img.uploading ? `<button class="remove-btn" onclick="removeUploadedImage(${index})">×</button>` : ''}
        </div>
    `).join('');
}

// Reset image upload state (called when opening new editor)
function resetImageUpload() {
    cwUploadedImages = [];
    renderImageThumbnails();

    const rawNotesTextarea = document.getElementById('editor-raw');
    if (rawNotesTextarea) {
        rawNotesTextarea.disabled = false;
        rawNotesTextarea.placeholder = 'Type your rough notes here...';
    }

    document.getElementById('upload-status')?.classList.add('hidden');
    document.getElementById('image-upload-zone')?.classList.remove('disabled');
}

// Sort classwork by column
function sortClassworkBy(column) {
    if (cwSortColumn === column) {
        // Toggle direction
        cwSortDirection = cwSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // New column, default to descending for date, ascending for others
        cwSortColumn = column;
        cwSortDirection = column === 'date' ? 'desc' : 'asc';
    }

    // Update header UI
    updateSortHeaderUI();
    loadClasswork();
}

// Update table header sort indicators
function updateSortHeaderUI() {
    document.querySelectorAll('.cw-table th.sortable').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        const icon = th.querySelector('.sort-icon');
        if (icon) icon.textContent = '';

        if (th.dataset.sort === cwSortColumn) {
            th.classList.add(cwSortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            if (icon) icon.textContent = cwSortDirection === 'asc' ? '▲' : '▼';
        }
    });
}

// Clear all classwork filters
function clearClassworkFilters() {
    document.getElementById('cw-search').value = '';
    document.getElementById('cw-filter-section').value = '';
    document.getElementById('cw-filter-date').value = '';
    cwSortColumn = 'date';
    cwSortDirection = 'desc';
    updateSortHeaderUI();
    loadClasswork();
}

function toggleClassworkView(viewName) {
    const listContainer = document.getElementById('classwork-library-view');
    const editorContainer = document.getElementById('classwork-editor-view');
    const detailContainer = document.getElementById('classwork-detail-view');
    const filters = document.querySelector('.library-filters');
    const headerActions = document.querySelector('#classwork-section .header-actions');

    // Hide all
    listContainer.classList.add('hidden');
    editorContainer.classList.add('hidden');
    if (detailContainer) detailContainer.classList.add('hidden');

    if (viewName === 'editor') {
        editorContainer.classList.remove('hidden');
        if (filters) filters.classList.add('hidden');
        if (headerActions) headerActions.classList.add('hidden');
    } else if (viewName === 'detail') {
        if (detailContainer) detailContainer.classList.remove('hidden');
        if (filters) filters.classList.add('hidden'); // Hide filters in detail view too
        if (headerActions) headerActions.classList.add('hidden');
    } else {
        // List
        listContainer.classList.remove('hidden');
        if (filters) filters.classList.remove('hidden');
        if (headerActions) headerActions.classList.remove('hidden');
        loadClasswork(); // Refresh list on return
    }
}

async function loadSections() {
    try {
        const { data, error } = await supabaseClient
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
        const { error } = await supabaseClient
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
    const tbody = document.getElementById('classwork-tbody');
    // Ensure we are in list view
    if (document.getElementById('classwork-library-view').classList.contains('hidden')) return;

    // Filters
    const searchQuery = document.getElementById('cw-search')?.value.toLowerCase();
    const sectionId = document.getElementById('cw-filter-section')?.value;
    const dateFilter = document.getElementById('cw-filter-date')?.value;

    try {
        let query = supabaseClient
            .from('french_classwork')
            .select(`
                *,
                french_sections(name)
            `);

        if (sectionId) {
            query = query.eq('section_id', sectionId);
        }

        if (dateFilter) {
            query = query.eq('date', dateFilter);
        }

        const { data, error } = await query;

        if (error) throw error;

        let filteredData = data || [];

        // Client-side search for more flexibility on tags/content
        if (searchQuery) {
            filteredData = filteredData.filter(item => {
                const textMatch = (item.raw_notes || '').toLowerCase().includes(searchQuery) ||
                    (item.formatted_notes || '').toLowerCase().includes(searchQuery);
                const tagMatch = (item.tags || []).some(t => t.toLowerCase().includes(searchQuery));
                const sectionMatch = (item.french_sections?.name || '').toLowerCase().includes(searchQuery);
                return textMatch || tagMatch || sectionMatch;
            });
        }

        // Client-side sorting
        filteredData.sort((a, b) => {
            let valA, valB;

            switch (cwSortColumn) {
                case 'date':
                    valA = a.date || '';
                    valB = b.date || '';
                    break;
                case 'section':
                    valA = (a.french_sections?.name || 'zzz').toLowerCase();
                    valB = (b.french_sections?.name || 'zzz').toLowerCase();
                    break;
                case 'title':
                    valA = extractTitle(a).toLowerCase();
                    valB = extractTitle(b).toLowerCase();
                    break;
                default:
                    valA = a.date || '';
                    valB = b.date || '';
            }

            if (valA < valB) return cwSortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return cwSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        if (filteredData.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="4">No classwork found matching your criteria.</td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filteredData.map(item => `
            <tr onclick="openClassworkDetail('${item.id}')">
                <td>${formatDate(item.date)}</td>
                <td>${item.french_sections?.name || 'Uncategorized'}</td>
                <td>${extractTitle(item)}</td>
                <td>
                    ${item.tags && item.tags.length > 0
                ? `<div class="cw-tags">${item.tags.slice(0, 3).map(tag => `<span class="cw-tag">${tag}</span>`).join('')}</div>`
                : '<span style="color: var(--text-muted);">—</span>'
            }
                </td>
            </tr>
        `).join('');

    } catch (err) {
        console.error('Error loading classwork:', err);
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="4">Error loading notes. Check console.</td>
            </tr>
        `;
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

    // Reset image upload state
    resetImageUpload();

    // Status update
    const statusElem = document.getElementById('editor-status');
    if (statusElem) statusElem.textContent = id ? 'Loading...' : 'New Note';

    // Delete button in Editor is now legacy/hidden usually, but we keep logic just in case
    // document.getElementById('btn-delete-note').style.display = id ? 'block' : 'none';

    if (id) {
        try {
            const { data, error } = await supabaseClient
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
            if (statusElem) statusElem.textContent = 'Editing Mode';

        } catch (err) {
            showToast('Failed to load note details', 'error');
            console.error(err);
            toggleClassworkView('list');
        }
    }
}

async function openClassworkDetail(id) {
    toggleClassworkView('detail');

    // Store ID on the Edit and Delete buttons for reference
    document.getElementById('btn-edit-cw').dataset.id = id;
    document.getElementById('btn-delete-cw-detail').dataset.id = id; // New Delete Button

    const headerDate = document.getElementById('cw-detail-date');
    const headerSection = document.getElementById('cw-detail-section');
    const headerTags = document.getElementById('cw-detail-tags');
    const contentBody = document.getElementById('cw-detail-content');

    // Clear previous
    contentBody.innerHTML = '<div class="spinner"></div>';

    try {
        const { data, error } = await supabaseClient
            .from('french_classwork')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Populate
        headerDate.textContent = formatDate(data.date);
        headerSection.textContent = data.title || 'Class Note'; // Fallback

        if (data.tags && data.tags.length > 0) {
            headerTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        } else {
            headerTags.innerHTML = '';
        }

        // Prefer formatted notes, fallback to raw notes
        const displayContent = data.formatted_notes || data.raw_notes || 'No content';
        contentBody.innerHTML = renderMarkdown(displayContent);

    } catch (err) {
        console.error(err);
        showToast('Failed to load note details', 'error');
        toggleClassworkView('list');
    }
}

async function formatNotesWithAI() {
    const rawNotes = document.getElementById('editor-raw').value;
    const btn = document.getElementById('btn-ai-format');
    const hasImages = cwUploadedImages.length > 0 && cwUploadedImages.some(img => !img.uploading);
    const hasText = rawNotes.trim().length > 0;

    // Validation: must have either images OR text, not both, not neither
    if (!hasImages && !hasText) {
        showToast('Please add images or enter text notes first.', 'error');
        return;
    }

    try {
        setLoading(btn, true);

        let aiResult;

        if (hasImages) {
            // IMAGE MODE - Send base64 images for vision processing
            btn.innerHTML = '<span class="spinner"></span> Analyzing images...';

            const imageBase64s = cwUploadedImages
                .filter(img => !img.uploading && img.base64)
                .map(img => img.base64);

            const imagePrompt = `You are an expert French Language Tutor. You are analyzing handwritten notes or textbook images about French language learning.

Your Task:
1. Parse and extract all text from the images
2. Identify the French learning topic(s) covered
3. Refine and improve the notes with proper formatting
4. Add helpful examples where appropriate
5. For any French translations, use ONLY English as the translation language

Return strictly valid JSON with this structure:
{
    "formatted_notes": "# Title\\n\\nWell-organized markdown notes with examples and explanations",
    "tags": ["relevant", "topic", "tags"]
}`;

            aiResult = await callEdgeFunction('format-notes', {
                notes: imagePrompt,
                images: imageBase64s
            });
        } else {
            // TEXT MODE - Original behavior with enhanced prompt
            btn.innerHTML = '<span class="spinner"></span> Formatting notes...';

            const textPrompt = `You are an expert French Language Tutor. Your task is to refine and improve the user's French study notes.

Your Task:
1. Refine and improve the structure and clarity of the notes
2. Add helpful examples where appropriate
3. Ensure proper French accents and grammar
4. For any translations, use ONLY English as the translation language
5. If the content is NOT related to French language learning, return a note with 'off-topic' tag

Return strictly valid JSON with this structure:
{
    "formatted_notes": "# Title\\n\\nWell-organized markdown notes",
    "tags": ["relevant", "topic", "tags"]
}

User Notes:
${rawNotes}`;

            aiResult = await callEdgeFunction('format-notes', {
                notes: textPrompt
            });
        }

        console.log('DEBUG: AI Full Result:', aiResult);

        let parsedResult = aiResult;

        // generated text might be nested or stringified
        if (!aiResult.formatted_notes) {
            // Check if it's stringified JSON in a 'formatted', 'reply', or 'content' field
            // Based on latest debug, it returns { "formatted": "stringified_json" }
            const candidate = aiResult.formatted || aiResult.reply || aiResult.content || aiResult.data;

            if (typeof candidate === 'string') {
                try {
                    // It seems the Edge Function returns the JSON string inside 'formatted'
                    parsedResult = JSON.parse(candidate);
                } catch (e) {
                    console.warn('Failed to parse inner string JSON', e);
                    // If parsing fails, maybe the string IS the formatted note?
                    // But for now, we assume it's the JSON structure we asked for.
                }
            } else if (typeof candidate === 'object') {
                parsedResult = candidate;
            }
        }

        if (!parsedResult.formatted_notes) {
            console.error('Missing formatted_notes in:', parsedResult);
            showToast('AI returned unexpected format. Check console.', 'error');
            // Show raw result to user to help debug further if needed
            document.getElementById('editor-formatted').value = JSON.stringify(aiResult, null, 2);
            return;
        }

        document.getElementById('editor-formatted').value = parsedResult.formatted_notes;

        // If using images, also populate raw notes with extracted text info
        if (hasImages) {
            document.getElementById('editor-raw').value = '[Notes extracted from uploaded images]';
            document.getElementById('editor-raw').disabled = true;
        }

        // Append new tags to existing ones
        const currentTagsStr = document.getElementById('editor-tags').value;
        const currentTags = currentTagsStr ? currentTagsStr.split(',').map(t => t.trim()) : [];
        const newTags = parsedResult.tags || [];
        const mergedTags = [...new Set([...currentTags, ...newTags])]; // Unique
        document.getElementById('editor-tags').value = mergedTags.join(', ');

        showToast('AI Formatting Complete!', 'success');

    } catch (err) {
        console.error(err);
        showToast('AI Formatting failed', 'error');
    } finally {
        setLoading(btn, false);
        btn.innerHTML = '✨ Format with AI';
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

    // Get image URLs from uploaded images
    const imageUrls = cwUploadedImages
        .filter(img => !img.uploading && img.url)
        .map(img => img.url);

    // Validation: need either raw notes OR images (for image-based notes)
    const hasContent = rawNotes.trim().length > 0 || imageUrls.length > 0;
    if (!hasContent) {
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
            formatted_notes: formattedNotes,
            image_urls: imageUrls
        };

        let result;
        if (editingClassworkId) {
            // Update
            result = await supabaseClient
                .from('french_classwork')
                .update(payload)
                .eq('id', editingClassworkId);
        } else {
            // Insert
            result = await supabaseClient
                .from('french_classwork')
                .insert(payload);
        }

        if (result.error) throw result.error;

        showToast('Note saved successfully!', 'success');

        // If it was new, go to list (or maybe detail?)
        // If editing, go back to detail view
        if (editingClassworkId) {
            openClassworkDetail(editingClassworkId);
        } else {
            toggleClassworkView('list');
        }

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
        const { error } = await supabaseClient
            .from(table)
            .delete()
            .eq('id', id);

        if (error) throw error;

        showToast('Item deleted successfully', 'success');

        // Return to list view based on table type
        if (table === 'french_classwork') {
            toggleClassworkView('list');
        } else if (table === 'french_homework') {
            toggleHomeworkView('list');
        } else if (table === 'french_grammar') {
            toggleGrammarView('list');
        } else if (table === 'french_resources') {
            loadResources();
        } else if (table === 'french_vocabulary') {
            // Return to vocabulary list view
            document.getElementById('vocab-list-view').classList.remove('hidden');
            document.getElementById('vocab-detail-view').classList.add('hidden');
            loadVocabulary();
        } else if (table === 'my_vocabulary') {
            // Return to my vocabulary list view
            document.querySelector('#myvocab-section .content-grid').classList.remove('hidden');
            document.getElementById('myvocab-detail-view').classList.add('hidden');
            loadMyVocabulary();
        }

        // Also run any custom callback
        if (successCallback) successCallback();

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

    // Save Button (Toolbar)
    document.getElementById('btn-save-homework')?.addEventListener('click', () => {
        form.requestSubmit();
    });
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
            const { data, error } = await supabaseClient
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
    // Button is now outside form or specific ID
    const btn = document.getElementById('btn-save-homework');

    const id = document.getElementById('hw-id').value;
    const date = document.getElementById('hw-date').value;
    const hwGiven = document.getElementById('hw-given').value;
    const hwDone = document.getElementById('hw-done').value;

    try {
        setLoading(btn, true);

        let result;
        if (id) {
            // Update
            result = await supabaseClient
                .from('french_homework')
                .update({
                    date,
                    hw_given: hwGiven,
                    hw_done: hwDone
                })
                .eq('id', id);
        } else {
            // Insert
            result = await supabaseClient
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
        // Note: Sub-views (detail/generator) are managed by openGrammarEditor/openGrammarDetail
    } else {
        listContainer.classList.remove('hidden');
        editorContainer.classList.add('hidden');
        if (headerActions) headerActions.classList.remove('hidden');
        // Hide both sub-views when returning to list
        document.getElementById('grammar-detail-content')?.classList.add('hidden');
        document.getElementById('grammar-generator-content')?.classList.add('hidden');
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
        const { data, error } = await supabaseClient
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

        // Prepesnd 'French' to context to strictly guide the model
        const contextTopic = `French Grammar: ${topic} (Do NOT discuss Spanish/Italian)`;

        // Call AI to generate grammar notes
        const aiResult = await callEdgeFunction('generate-grammar', {
            topic: contextTopic,
            instructions: "You are a dedicated French Language Tutor. Your Task: Generate detailed grammar notes strictly for the FRENCH LANGUAGE ONLY. Critical Rules: 1. Output MUST be ONLY in French and English (for explanations). 2. DO NOT include examples from Spanish, Italian, German, or any other language. I repeat: NO SPANISH, NO ITALIAN. 3. Even if the topic exists in other languages (like -IR verbs), you MUST ONLY cover the French version. 4. Provide the response in JSON format: { \"notes\": \"markdown string\" }"
        });

        // Save to supabaseClient
        const { data, error } = await supabaseClient
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

    // Topic Form
    const topicForm = document.getElementById('vocab-topic-form');
    if (topicForm) topicForm.addEventListener('submit', handleVocabSubmit);

    // Search input
    const searchInput = document.getElementById('vocab-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterVocabularyTopics(e.target.value);
        });
    }

    // Gender Quiz
    document.getElementById('generate-gender-quiz')?.addEventListener('click', generateGenderQuiz);

    // Verbs Form
    const verbSelector = document.querySelector('.verb-type-selector');
    if (verbSelector) {
        verbSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('verb-btn')) {
                document.querySelectorAll('.verb-type-selector .verb-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentVerbType = e.target.dataset.verb;
            }
        });
    }

    // Use generateVerbs (existing function)
    document.getElementById('generate-verbs')?.addEventListener('click', generateVerbs);

    // Detail View Actions
    document.getElementById('btn-back-vocab')?.addEventListener('click', () => {
        document.getElementById('vocab-list-view').classList.remove('hidden');
        document.getElementById('vocab-detail-view').classList.add('hidden');
        // Ensure we're on the vocabulary section and reload the list
        switchSection('vocabulary');
        loadVocabulary();
    });

    document.getElementById('btn-delete-vocab-detail')?.addEventListener('click', () => {
        const id = document.getElementById('btn-delete-vocab-detail').dataset.id;
        if (id) deleteItem('french_vocabulary', id, loadVocabulary);
    });

    // Conjugation Tabs in Detail View
    document.querySelectorAll('#vocab-conjugations-section .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all tabs
            document.querySelectorAll('#vocab-conjugations-section .tab-btn').forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');

            // Filter content
            const tense = e.target.dataset.tab;
            renderConjugations(currentVocabData?.content?.conjugations, tense);
        });
    });

    // Audio Button
    document.getElementById('btn-play-audio')?.addEventListener('click', () => {
        const text = document.getElementById('vocab-detail-summary').textContent;
        if (text) speakText(text);
    });
}

// Store vocabulary data for filtering
let allVocabTopics = [];

function filterVocabularyTopics(query) {
    const topicList = document.getElementById('vocab-topic-list');
    if (!topicList) return;

    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        // Show all topics
        renderVocabTopicList(allVocabTopics);
        return;
    }

    const filtered = allVocabTopics.filter(entry =>
        entry.topic.toLowerCase().includes(searchTerm)
    );

    renderVocabTopicList(filtered);
}

function renderVocabTopicList(topics) {
    const topicList = document.getElementById('vocab-topic-list');
    if (!topicList) return;

    if (topics.length === 0) {
        topicList.innerHTML = '<p class="empty-state">No matching topics found</p>';
    } else {
        topicList.innerHTML = topics.map(entry => `
            <div class="entry-item" onclick="openVocabDetail('${entry.id}')">
                <div class="entry-date">${entry.topic}</div>
                <div class="entry-preview">${formatDate(entry.created_at)}</div>
            </div>
        `).join('');
    }
}

function switchVocabTab(type) {
    // Buttons
    document.querySelectorAll('.sub-tab').forEach(tab => {
        if (tab.dataset.vocab === type) tab.classList.add('active');
        else tab.classList.remove('active');
    });

    // Content Areas
    document.querySelectorAll('.vocab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected
    const selected = document.getElementById(`vocab-${type}`);
    if (selected) selected.classList.add('active');
}

// =============================================
// My Vocabulary Section
// =============================================

let allMyVocabWords = [];
let currentMyVocabData = null;

function initMyVocabulary() {
    // Form submission
    const form = document.getElementById('myvocab-form');
    if (form) {
        form.addEventListener('submit', handleMyVocabSubmit);
    }

    // Search input
    const searchInput = document.getElementById('myvocab-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterMyVocabulary(e.target.value);
        });
    }

    // Back button
    document.getElementById('btn-back-myvocab')?.addEventListener('click', () => {
        document.querySelector('#myvocab-section .content-grid').classList.remove('hidden');
        document.getElementById('myvocab-detail-view').classList.add('hidden');
        loadMyVocabulary();
    });

    // Delete button
    document.getElementById('btn-delete-myvocab')?.addEventListener('click', () => {
        const id = document.getElementById('btn-delete-myvocab').dataset.id;
        if (id) deleteItem('my_vocabulary', id, () => {
            document.querySelector('#myvocab-section .content-grid').classList.remove('hidden');
            document.getElementById('myvocab-detail-view').classList.add('hidden');
            loadMyVocabulary();
        });
    });
}

async function handleMyVocabSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const wordInput = document.getElementById('myvocab-word-input');
    const word = wordInput.value.trim();

    if (!word) return;

    try {
        setLoading(btn, true);

        // Call AI to analyze the word
        const aiResult = await callEdgeFunction('analyze-word', {
            word,
            instructions: "You are a French Language Dictionary. Analyze this word/phrase. Strict Rules: 1. If the input is English, provide the French translation and analysis. 2. If the input is French, provide the English meaning and analysis. 3. If the word is off-topic/offensive, return null. 4. Return the analysis in JSON format with these exact keys: 'french_word' (string), 'gender' (one of: 'm', 'f', or 'n/a'), 'english_meaning' (string), 'example_sentences' (array of AT LEAST 5 objects, each with 'french' and 'english' string keys)."
        });

        // Save to database
        const { data, error } = await supabaseClient
            .from('my_vocabulary')
            .insert({
                french_word: aiResult.french_word || word,
                gender: aiResult.gender || '',
                english_meaning: aiResult.english_meaning || '',
                example_sentences: aiResult.example_sentences || []
            })
            .select()
            .single();

        if (error) throw error;

        showToast('Word added!', 'success');
        wordInput.value = '';
        loadMyVocabulary();
        openMyVocabDetail(data.id);

    } catch (err) {
        console.error(err);
        showToast('Failed to analyze word', 'error');
    } finally {
        setLoading(btn, false);
    }
}

async function loadMyVocabulary() {
    try {
        const { data, error } = await supabaseClient
            .from('my_vocabulary')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allMyVocabWords = data || [];

        // Clear search input
        const searchInput = document.getElementById('myvocab-search');
        if (searchInput) searchInput.value = '';

        renderMyVocabList(allMyVocabWords);

    } catch (error) {
        console.error('Error loading my vocabulary:', error);
    }
}

function filterMyVocabulary(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        renderMyVocabList(allMyVocabWords);
        return;
    }

    const filtered = allMyVocabWords.filter(entry =>
        entry.french_word.toLowerCase().includes(searchTerm) ||
        entry.english_meaning.toLowerCase().includes(searchTerm)
    );

    renderMyVocabList(filtered);
}

function renderMyVocabList(words) {
    const listEl = document.getElementById('myvocab-list');
    if (!listEl) return;

    if (words.length === 0) {
        listEl.innerHTML = '<p class="empty-state">No words found</p>';
    } else {
        listEl.innerHTML = words.map(entry => `
            <div class="entry-item" onclick="openMyVocabDetail('${entry.id}')">
                <div class="entry-date" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="gender-badge ${entry.gender === 'm' ? 'masculine' : 'feminine'}">${entry.gender?.toUpperCase() || '?'}</span>
                    ${entry.french_word}
                </div>
                <div class="entry-preview">${entry.english_meaning}</div>
            </div>
        `).join('');
    }
}

async function openMyVocabDetail(id) {
    const contentGrid = document.querySelector('#myvocab-section .content-grid');
    const detailView = document.getElementById('myvocab-detail-view');

    contentGrid.classList.add('hidden');
    detailView.classList.remove('hidden');

    // Store ID for delete
    document.getElementById('btn-delete-myvocab').dataset.id = id;

    try {
        const { data, error } = await supabaseClient
            .from('my_vocabulary')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        currentMyVocabData = data;

        // Populate header
        document.getElementById('myvocab-detail-word').textContent = data.french_word;

        const genderBadge = document.getElementById('myvocab-detail-gender');
        genderBadge.textContent = data.gender?.toUpperCase() || '?';
        genderBadge.className = `gender-badge ${data.gender === 'm' ? 'masculine' : 'feminine'}`;

        document.getElementById('myvocab-detail-meaning').textContent = data.english_meaning;

        // Populate sentences
        const sentencesEl = document.getElementById('myvocab-detail-sentences');
        const sentences = data.example_sentences || [];

        if (sentences.length > 0) {
            sentencesEl.innerHTML = sentences.map(s => `
                <div class="sentence-item">
                    <div class="sentence-french">${s.french}</div>
                    <div class="sentence-english">${s.english}</div>
                </div>
            `).join('');
        } else {
            sentencesEl.innerHTML = '<p class="empty-state">No example sentences</p>';
        }

    } catch (error) {
        console.error('Error loading word:', error);
        showToast('Failed to load word details', 'error');
    }
}

async function handleVocabSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const topic = document.getElementById('vocab-topic-input').value;

    try {
        setLoading(btn, true);

        // Requested Payload for AI to get enhanced data
        const payload = {
            topic,
            type: 'topic_vocabulary_enhanced', // Custom type to signal enhanced generation
            instructions: "You are a French Language Teacher. Generate comprehensive vocabulary content for the given topic. Return JSON with EXACTLY these keys: 1) 'paragraph' (a 4-5 sentence contextual summary in French using vocabulary from the topic), 2) 'paragraph_english' (English translation of the paragraph), 3) 'vocabulary' (array of EXACTLY 10 objects, each with: 'word' (French), 'meaning' (English), 'gender' (one of: 'Masculine', 'Feminine', 'Masculine Plural', 'Feminine Plural', or 'N/A' for verbs), 'example' (French sentence using the word)), 4) 'conjugations' (array of 3 topic-related verbs, each with: 'verb' (infinitive), 'meaning' (English), 'present' (object with je/tu/il/nous/vous/ils conjugations), 'passe_compose' (same structure), 'futur_simple' (same structure))."
        };

        const aiResult = await callEdgeFunction('generate-vocab', payload);

        // Fallback or Standardize Structure
        // Expecting aiResult to have { vocabulary: [], paragraph: "", paragraph_english: "", conjugations: [] }

        const contentToSave = {
            vocabulary: aiResult.vocabulary || aiResult.words || [],
            paragraph: aiResult.paragraph || '',
            paragraph_english: aiResult.paragraph_english || '',
            conjugations: aiResult.conjugations || []
        };

        const { data, error } = await supabaseClient
            .from('french_vocabulary')
            .insert({
                topic,
                vocab_type: 'topic',
                content: contentToSave
            })
            .select()
            .single();

        if (error) throw error;

        showToast('Vocabulary generated!', 'success');
        document.getElementById('vocab-topic-input').value = ''; // Reset
        loadVocabulary(); // Reload list
        openVocabDetail(data.id); // Open new item

    } catch (err) {
        console.error(err);
        showToast('Failed to generate vocabulary', 'error');
    } finally {
        setLoading(btn, false);
    }
}

let currentVocabData = null; // Store for tab switching

async function openVocabDetail(id) {
    const listView = document.getElementById('vocab-list-view');
    const detailView = document.getElementById('vocab-detail-view');

    // Switch Views
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');

    // Store ID for delete
    document.getElementById('btn-delete-vocab-detail').dataset.id = id;

    // Loading State
    document.getElementById('vocab-detail-list').innerHTML = '<div class="spinner"></div>';

    try {
        const { data, error } = await supabaseClient
            .from('french_vocabulary')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        currentVocabData = data;

        // Ensure content exists
        if (!data.content || typeof data.content !== 'object') {
            data.content = { vocabulary: [], paragraph: '', paragraph_english: '', conjugations: [] };
        }

        // Populate Header
        document.getElementById('vocab-detail-topic').textContent = data.topic;
        document.getElementById('vocab-detail-date').textContent = formatDate(data.created_at);

        // Populate Summary (French and English)
        const summaryDiv = document.getElementById('vocab-detail-summary');
        const summaryDivEn = document.getElementById('vocab-detail-summary-en');
        const summarySection = document.getElementById('vocab-summary-section');

        if (data.content.paragraph && data.content.paragraph.trim()) {
            summaryDiv.textContent = data.content.paragraph;

            // Show English translation if available
            if (data.content.paragraph_english && data.content.paragraph_english.trim()) {
                summaryDivEn.textContent = data.content.paragraph_english;
                summaryDivEn.classList.remove('hidden');
            } else {
                summaryDivEn.classList.add('hidden');
            }

            summarySection.classList.remove('hidden');
        } else {
            summarySection.classList.add('hidden');
        }

        // Populate Word List
        const listDiv = document.getElementById('vocab-detail-list');
        const words = data.content.vocabulary || data.content.words || [];

        if (Array.isArray(words) && words.length > 0) {
            listDiv.innerHTML = `
                <div class="vocab-table-header">
                    <div>Word</div>
                    <div>Meaning</div>
                    <div>Gender</div>
                    <div>Example</div>
                </div>
                ${words.map(w => `
                    <div class="vocab-row">
                        <div style="font-weight:600; color:var(--text-primary);">${getFrench(w)}</div>
                        <div class="vocab-en">${getEnglish(w)}</div>
                        <div class="vocab-gender">${w.gender || '-'}</div>
                        <div class="vocab-sentence">
                            <div>${w.sentence || w.example || ''}</div>
                            <div style="font-size:0.8rem; opacity:0.8;">${w.sentence_en || w.translation || ''}</div>
                        </div>
                    </div>
                `).join('')}
            `;
        } else {
            listDiv.innerHTML = '<p class="empty-state">No words found. The vocabulary generation may have failed or returned no data.</p>';
        }

        // Populate Verbs (Default to Present)
        const conjugationsSection = document.getElementById('vocab-conjugations-section');
        if (data.content.conjugations && Array.isArray(data.content.conjugations) && data.content.conjugations.length > 0) {
            conjugationsSection.classList.remove('hidden');
            // Reset tab
            document.querySelectorAll('#vocab-conjugations-section .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('#vocab-conjugations-section .tab-btn[data-tab="present"]')?.classList.add('active');

            renderConjugations(data.content.conjugations, 'present');
        } else {
            conjugationsSection.classList.add('hidden');
        }

    } catch (err) {
        console.error('Error loading vocab detail:', err);
        showToast('Failed to load details', 'error');
        // Go back
        listView.classList.remove('hidden');
        detailView.classList.add('hidden');
    }
}

function renderConjugations(conjugations, tense) {
    const container = document.getElementById('vocab-detail-verbs');
    if (!conjugations || !Array.isArray(conjugations)) {
        container.innerHTML = '<p class="empty-state">No conjugations available</p>';
        return;
    }

    // Map strict tense names from buttons to data keys if needed
    const mapTense = (t) => {
        if (t === 'past') return 'passe_compose';
        if (t === 'future') return 'futur_simple';
        return t; // 'present'
    };

    const targetTense = mapTense(tense);

    container.innerHTML = conjugations.map(verbItem => {
        // Access conjugation directly from verbItem (not under tenses property)
        const verbTenseData = verbItem[targetTense];

        // Skip this verb if the tense data is missing
        if (!verbTenseData) {
            return `
                <div class="verb-card">
                    <div class="verb-title">
                        <span>${verbItem.verb || 'Unknown verb'}</span>
                        <span style="font-size:0.8rem; font-weight:normal; color:var(--text-secondary);">(${verbItem.meaning || ''})</span>
                    </div>
                    <div class="conjugation-list">
                        <div style="opacity: 0.6;">Conjugation not available for this tense</div>
                    </div>
                </div>
            `;
        }

        let listHtml = '';
        if (Array.isArray(verbTenseData)) {
            // Handle array format: ["Je mange", "Tu manges", ...]
            listHtml = verbTenseData.map(line => `<div>${line}</div>`).join('');
        } else if (typeof verbTenseData === 'object') {
            // Handle object format: { je: "mange", tu: "manges", ... }
            listHtml = Object.entries(verbTenseData).map(([pronoun, form]) => {
                return `<div><strong>${pronoun}</strong> ${form}</div>`;
            }).join('');
        } else {
            listHtml = '<div style="opacity: 0.6;">Invalid conjugation format</div>';
        }

        return `
            <div class="verb-card">
                <div class="verb-title">
                    <span>${verbItem.verb || 'Unknown verb'}</span>
                    <span style="font-size:0.8rem; font-weight:normal; color:var(--text-secondary);">(${verbItem.meaning || ''})</span>
                </div>
                <div class="conjugation-list">
                    ${listHtml}
                </div>
            </div>
         `;
    }).join('');
}

function speakText(text) {
    if (!window.speechSynthesis) {
        showToast('Text-to-speech not supported', 'error');
        return;
    }

    // Stop any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // French
    utterance.rate = 0.9; // Slightly slower

    window.speechSynthesis.speak(utterance);
}

// Helpers for property access (reusing or moving to global scope if needed)
function getFrench(word) {
    return word.french || word.french_word || word.word_french ||
        word.word || word.terme || word.mot ||
        (word.verb && word.verb.french) || '';
}

function getEnglish(word) {
    return word.english || word.english_word || word.word_english ||
        word.meaning || word.traduction ||
        (word.verb && word.verb.english) || '';
}

// Legacy / Other Vocab Functions
async function generateGenderQuiz() {
    const btn = document.getElementById('generate-gender-quiz');
    const quizArea = document.getElementById('gender-quiz-area');

    try {
        setLoading(btn, true);

        const aiResult = await callEdgeFunction('generate-vocab', {
            topic: 'common nouns',
            vocabType: 'gender',
            instructions: "You are a French Language Teacher. Generate a list of French nouns for a gender quiz. Provide the list in JSON format."
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
            verbType: currentVerbType,
            instructions: "You are a French Language Teacher. Generate a list of French verbs and their conjugations. Provide the list in JSON format."
        });

        const { error } = await supabaseClient
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

        const { error } = await supabaseClient
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
        let query = supabaseClient
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
        loadMyVocabulary(),
        loadGrammar(),
        loadResources()
    ]);
}

async function loadHomework() {
    const grid = document.getElementById('homework-grid');
    if (!grid) return;

    try {
        const { data, error } = await supabaseClient
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
    // vocabulary-grid check removed as it doesn't exist. We check specific lists below.

    try {
        const { data, error } = await supabaseClient
            .from('french_vocabulary')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Topic vocabulary - store in global for search filtering
        allVocabTopics = data?.filter(v => v.vocab_type === 'topic') || [];

        // Clear search input when reloading
        const searchInput = document.getElementById('vocab-search');
        if (searchInput) searchInput.value = '';

        // Render the topic list
        renderVocabTopicList(allVocabTopics);

    } catch (error) {
        console.error('Error loading vocabulary:', error);
    }
}

async function loadGrammar() {
    const grid = document.getElementById('grammar-grid');
    if (!grid) return;

    try {
        const { data, error } = await supabaseClient
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
        const { data, error } = await supabaseClient
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

// Deprecated or Replaced by openVocabDetail
// But kept if referenced by older onclicks in HTML before full reload?
// Actually we replaced the onclick in loadVocabulary, so this is dead code mostly.
// Reuse logic in openVocabDetail
console.log('Use openVocabDetail instead');


async function showGrammarDetail(id) {
    try {
        const { data, error } = await supabaseClient
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
window.showClassworkDetail = openClassworkDetail; // Updated to detail
window.showHomeworkDetail = showHomeworkDetail;
window.showVocabDetail = openVocabDetail; // Mapped to new function
window.openVocabDetail = openVocabDetail; // Direct access
window.showGrammarDetail = showGrammarDetail;
window.checkGenderAnswer = checkGenderAnswer;
window.openClassworkEditor = openClassworkEditor;
window.openClassworkDetail = openClassworkDetail; // Add this
window.openHomeworkEditor = openHomeworkEditor;
window.openGrammarEditor = openGrammarEditor;
window.openGrammarDetail = openGrammarDetail;
window.deleteItem = deleteItem;
window.loadResources = loadResources;


// =============================================
// Quizzes Section
// =============================================

let currentQuizData = null;

function initQuizzes() {
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', handleQuizGenerate);
    }

    const btnShowAnswers = document.getElementById('btn-show-answers');
    if (btnShowAnswers) {
        btnShowAnswers.addEventListener('click', () => {
            const answers = document.querySelectorAll('.quiz-answer-key');
            answers.forEach(el => el.classList.toggle('hidden'));
            btnShowAnswers.textContent = btnShowAnswers.textContent.includes('Show') ? 'Hide Answers' : 'Show Answers';
        });
    }

    const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
    if (btnShareWhatsapp) {
        btnShareWhatsapp.addEventListener('click', shareQuizToWhatsapp);
    }
}

async function handleQuizGenerate(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const type = document.getElementById('quiz-type').value;

    try {
        setLoading(btn, true);

        // Hide previous result
        document.getElementById('quiz-display').classList.add('hidden');

        // Call AI
        const result = await callEdgeFunction('generate-quiz', {
            type,
            instructions: "You are a French Language Examiner. Create a quiz to test French language skills. Strict Rules: 1. The quiz MUST be about French language. 2. Provide the quiz in JSON format with keys: 'title', 'questions' (array of objects with 'question', 'options' (if MCQ), 'answer')."
        });
        currentQuizData = result;

        renderQuiz(result, type);

        // Show result
        document.getElementById('quiz-display').classList.remove('hidden');

        // Scroll to result
        document.getElementById('quiz-display').scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        console.error(err);
        showToast('Failed to generate quiz', 'error');
    } finally {
        setLoading(btn, false);
    }
}

function renderQuiz(data, type) {
    const titleEl = document.getElementById('quiz-title');
    const contentEl = document.getElementById('quiz-content');

    titleEl.textContent = data.title || 'Quiz';
    contentEl.innerHTML = '';

    // Handle different quiz formats
    if (type === 'listening') {
        renderListeningQuiz(data, contentEl);
    } else if (type === 'comprehension') {
        renderComprehensionQuiz(data, contentEl);
    } else if (type === 'writing' || type === 'speaking') {
        renderPromptQuiz(data, contentEl);
    } else {
        renderStandardQuiz(data, contentEl);
    }

    // Reset Answer Button
    const btnShowAnswers = document.getElementById('btn-show-answers');
    if (btnShowAnswers) btnShowAnswers.textContent = 'Show Answers';
}

function renderStandardQuiz(data, container) {
    const list = document.createElement('div');
    list.className = 'quiz-questions';

    if (data.questions && Array.isArray(data.questions)) {
        data.questions.forEach((q, index) => {
            const item = document.createElement('div');
            item.className = 'quiz-item';
            item.innerHTML = `
                <div class="question-text"><strong>Q${index + 1}:</strong> ${q.question}</div>
                ${q.options ? renderMCQOptions(q.options) : ''}
                <div class="quiz-answer-key hidden">
                    <strong>Answer:</strong> ${q.answer}
                </div>
            `;
            list.appendChild(item);
        });
    }
    container.appendChild(list);
}

function renderMCQOptions(options) {
    return `<div class="mcq-options">
        ${options.map(opt => `<span class="mcq-badge">${opt}</span>`).join('')}
    </div>`;
}

function renderListeningQuiz(data, container) {
    const wrapper = document.createElement('div');

    // Audio Player (TTS)
    const playerDiv = document.createElement('div');
    playerDiv.className = 'audio-player-box';
    playerDiv.innerHTML = `
        <p style="margin-bottom:0.5rem; color:var(--text-secondary)">Listen to the audio script:</p>
        <button class="btn btn-primary btn-sm" onclick="speakText('${data.script_french.replace(/'/g, "\\'")}')">
            ▶ Play Audio
        </button>
    `;
    wrapper.appendChild(playerDiv);

    // Questions (Meaning + Words)
    const questionsDiv = document.createElement('div');
    questionsDiv.className = 'quiz-questions';
    questionsDiv.innerHTML = `
        <div class="quiz-item">
            <div class="question-text"><strong>Task 1:</strong> Write the meaning/summary of what you heard in English.</div>
            <div class="quiz-answer-key hidden">
                <div style="margin-bottom:0.5rem; font-style:italic; color:var(--text-secondary)">Transcript: ${data.script_french}</div>
                <strong>Summary:</strong> ${data.answer_meaning}
            </div>
        </div>
        <div class="quiz-item">
            <div class="question-text"><strong>Task 2:</strong> List as many French words as you recognized.</div>
            <div class="quiz-answer-key hidden">
                <strong>Key Words:</strong> ${data.answer_words.join(', ')}
            </div>
        </div>
    `;
    wrapper.appendChild(questionsDiv);
    container.appendChild(wrapper);
}

function renderComprehensionQuiz(data, container) {
    // Reading Passage
    const passageDiv = document.createElement('div');
    passageDiv.className = 'reading-passage';
    passageDiv.innerHTML = `<p>${data.passage}</p>`;
    container.appendChild(passageDiv);

    // Questions
    renderStandardQuiz(data, container);
}

function renderPromptQuiz(data, container) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="prompt-box">
            <h3>Topic</h3>
            <p>${data.prompt}</p>
        </div>
        <div class="quiz-answer-key hidden" style="margin-top: 2rem;">
            <h3>Model Response</h3>
            <div class="model-answer">${data.model_answer || data.model_response}</div>
        </div>
    `;
    container.appendChild(wrapper);
}

function shareQuizToWhatsapp() {
    if (!currentQuizData) return;

    let text = `*${currentQuizData.title}*\n\n`;

    // Format text based on type
    if (currentQuizData.questions) {
        currentQuizData.questions.forEach((q, i) => {
            text += `Q${i + 1}: ${q.question}\n`;
            if (q.options) text += `Options: ${q.options.join(', ')}\n`;
            text += `Answer: ${q.answer}\n\n`;
        });
    } else if (currentQuizData.prompt) {
        text += `Prompt: ${currentQuizData.prompt}\n\n`;
        text += `Model Response: ${currentQuizData.model_answer || currentQuizData.model_response}\n`;
    } else if (currentQuizData.script_french) {
        text += `Script: ${currentQuizData.script_french}\n\n`;
        text += `Summary: ${currentQuizData.answer_meaning}\n`;
        text += `Words: ${currentQuizData.answer_words.join(', ')}\n`;
    }

    // Add attribution
    text += `\nGenerate by My French App`;

    // Open WhatsApp
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}
window.openMyVocabDetail = openMyVocabDetail; // Export to window

// =============================================
// Chat Section
// =============================================

let chatHistory = [];

function initChat() {
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmit);
    }
}

async function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    // Add User Message
    addChatMessage(message, 'user');
    input.value = '';

    // Scroll to bottom
    const container = document.getElementById('chat-messages');
    container.scrollTop = container.scrollHeight;

    try {
        const result = await callEdgeFunction('chat', {
            message,
            history: chatHistory.slice(-10), // Keep last 10 messages for context
            instructions: "You are a helpful French Language Tutor. Your goal is to help the user learn French. Strict Rules: 1. If the user asks a question about French, answer it. 2. If the user speaks in English, you can reply in English but encourage French. 3. If the user asks about something completely unrelated to learning French (e.g. 'How to build a car'), politely decline and remind them you are a French tutor. 4. Reply in JSON format with a 'reply' field."
        });

        // Add AI Message
        if (result.reply) {
            addChatMessage(result.reply, 'ai');

            // Update history
            chatHistory.push({ role: 'user', content: message });
            chatHistory.push({ role: 'assistant', content: result.reply });
        } else {
            // Fallback if structure is different
            addChatMessage("I'm having trouble connecting right now. Please try again.", 'ai');
        }

    } catch (err) {
        console.error(err);
        addChatMessage("Sorry, I encountered an error. Please try again.", 'ai');
    }
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}
