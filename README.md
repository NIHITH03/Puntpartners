Overview
This project implements a simple text editor with options for selecting font families, font weights, and applying italic styles. The editor allows users to change the appearance of text in real-time and save their preferences locally in the browser. Users can also reset the editor to its default state.

Features
Font Family Selector: Choose from a list of Google Fonts.
Font Weight Selector: Select from available weights for the chosen font family.
Italic Toggle: Apply or remove italic styling if supported by the font family.
Auto-Save: Save text and font settings locally in the browser.
Reset and Save: Reset the editor to default settings or save current settings.
Setup
Download Files:

index.html: HTML structure of the text editor.
script.js: JavaScript logic for dynamic font selection and local storage handling.
punt-frontend-assignment (1).json: JSON file with font data and URLs.
Place Files:

Ensure index.html, script.js, and punt-frontend-assignment (1).json are in the same directory.
Open the Editor:

Open index.html in a web browser to view and use the text editor.
Usage
Select Font Family:

Use the dropdown menu to choose a font family. The available options are fetched from the punt-frontend-assignment (1).json file.
Choose Font Weight:

After selecting a font family, choose the desired font weight from the dropdown menu.
Toggle Italic:

Use the toggle switch to apply or remove italic styling.
Save Settings:

Click the "Save" button to store the current text and font settings in local storage. These settings will be applied when the page is reloaded.
Reset Editor:

Click the "Reset" button to clear all text and reset the font settings to default.
Troubleshooting
Text Not Updating: Verify that the font URLs in the JSON file are correct and accessible. Check the browser console for errors.
JSON File Issues: Ensure the JSON file is correctly formatted and placed in the same directory as index.html and script.js.
Contributing
If you find issues or want to contribute improvements, please fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License.
