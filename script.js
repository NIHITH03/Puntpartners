const fontFamilySelect = document.getElementById('font-family');
const fontWeightSelect = document.getElementById('font-weight');
const italicToggle = document.getElementById('italic-toggle');
const editor = document.querySelector('.editor');
const fontLink = document.getElementById('font-link');
const resetBtn = document.getElementById('reset-btn');
const saveBtn = document.getElementById('save-btn');

// Load font data from JSON file
async function fetchFontData() {
    try {
        const response = await fetch('punt-frontend-assignment (1).json');
        if (!response.ok) {
            throw new Error('Failed to load font data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching font data:', error);
        return {};
    }
}

// Populate font family dropdown
async function populateFontFamilies() {
    try {
        const fonts = await fetchFontData();
        fontFamilySelect.innerHTML = '<option value="">Select Font</option>'; // Reset dropdown
        Object.keys(fonts).forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontFamilySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating font families:', error);
    }
}

// Populate font weight dropdown based on selected font
async function updateFontWeights() {
    try {
        const fonts = await fetchFontData();
        const selectedFont = fontFamilySelect.value;
        const fontVariants = fonts[selectedFont];
        fontWeightSelect.innerHTML = '<option value="">Select Weight</option>'; // Clear previous options
        if (fontVariants) {
            Object.keys(fontVariants).forEach(key => {
                if (key !== 'italic') { // Exclude italic variant
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key;
                    fontWeightSelect.appendChild(option);
                }
            });
            updateItalicToggle(fontVariants);
        }
    } catch (error) {
        console.error('Error updating font weights:', error);
    }
}

// Update italic toggle based on the selected font
function updateItalicToggle(fontVariants) {
    italicToggle.disabled = !fontVariants['italic']; // Enable only if italic variant exists
}

// Handle font family change
fontFamilySelect.addEventListener('change', async () => {
    await updateFontWeights();
    applyFontFamily();
});

// Handle font weight change
fontWeightSelect.addEventListener('change', () => {
    applyFontFamily();
});

// Handle italic toggle change
italicToggle.addEventListener('change', () => {
    applyFontFamily();
});

// Apply font family and variant
async function applyFontFamily() {
    try {
        const fonts = await fetchFontData();
        const selectedFont = fontFamilySelect.value;
        const weight = fontWeightSelect.value;
        const italic = italicToggle.checked;
        const fontVariants = fonts[selectedFont];

        if (fontVariants) {
            let fontUrl = fontVariants[weight] || fontVariants['400'];
            if (italic && fontVariants['italic']) {
                fontUrl = fontVariants['italic'];
            }

            fontLink.href = fontUrl || '';
            editor.style.fontFamily = selectedFont;
            editor.style.fontWeight = weight || '400';
            editor.style.fontStyle = italic && fontVariants['italic'] ? 'italic' : 'normal';

            saveSettings();
        }
    } catch (error) {
        console.error('Error applying font family:', error);
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        fontFamily: fontFamilySelect.value,
        fontWeight: fontWeightSelect.value,
        italic: italicToggle.checked,
        text: editor.innerHTML
    };
    localStorage.setItem('editor-settings', JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('editor-settings'));
    if (settings) {
        fontFamilySelect.value = settings.fontFamily || '';
        fontWeightSelect.value = settings.fontWeight || '';
        italicToggle.checked = settings.italic || false;
        editor.innerHTML = settings.text || '';
        applyFontFamily();
    }
}

// Reset editor
function resetEditor() {
    fontFamilySelect.value = '';
    fontWeightSelect.value = '';
    italicToggle.checked = false;
    editor.innerHTML = '';
    editor.style.fontFamily = 'Roboto'; // Default font family
    editor.style.fontWeight = '400'; // Default weight
    editor.style.fontStyle = 'normal'; // Default style
    fontLink.href = ''; // Remove font link
}

// Event listeners
saveBtn.addEventListener('click', saveSettings);
resetBtn.addEventListener('click', resetEditor);

// Initialize editor
populateFontFamilies();
loadSettings();
