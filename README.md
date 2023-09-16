# Web Calculator Emulator

A community-driven web calculator emulator.

**FOR STUDYING AND LEARNING PURPOSES ONLY. COMMERICIAL USE IS NOT ALLOWED.**

## How to use

In order to run the emulator, you have to set up a local HTTP server for static files, just using the tools you familiar with. Then open the `index.html` file. 

If Python 3 is already installed, you can also choose to run with the following command:

```bash
python ./start.py
```

If everything sets right, a website should be open in your browser, and the emulator can be used in this website.

Please note that there's no available models in this repository. You have to find and import them by yourself.

## Import Single Model

Run the emulator, and then switch to **Add Custom Model** panel to import a single model.

- **Model ID**: Require to start with `CY` or `EY` in order to indicate the model type.

- **Model Name**: The name of the model, can be whatever you like.

- **Model File**: 3 files are needed, including `core.dat` (or `rom.bin`), `face.svg` and `keylog.json`. <br> `core.dat` file: the ROM file of the calculator, can be either raw or encrypted. <br> `face.svg` file: an SVG file of the calculator's faceplate.<br> `keylog.json` file: the keylog file of the calculator, which is used to map the key codes to the key names.

If everything imported correctly, the model will be run and displayed in the model list inside the emulator.

## Import Multiple Models

If you want to import multiple models, just follow the steps below to import them all at once.

1. Create a folder named `data` in the root directory of the repository.

2. Create folders for each model in the `data` folder, and name it with the model ID.

3. Put 3 files (`core.dat`, `face.svg` and `keylog.json`) in each folder you just created.

4. Open `index.html` in any text editor, find the line begin with `const emulatorList = {};` <br>Edit the content in the following format:

```javascript
const emulatorList = {
  "EY***": {
    "name": "fx-***",
    "background": "#3A3A3A"
  },
  // ...... other models
};
```
Named each key with the model ID, the value for each key is an object containing the name and the background color of the model.

5. Find the line begin with `const emulatorGroup = [];` <br>Edit the content in the following format:

```javascript
const emulatorGroup = [
  {
    "shortName": "**",
    "name": {
      "en": "**",
      // ...... other languages
    },
    "models": [
      "EY***",
      "CY***",
      // ...... other models
    ]
  },
  // ...... other groups
]
```
- `shortName` : the short name of the group.
- `name` : the full name of the group that supports multiple languages.
- `models` : an array containing the model IDs of the models in the group.

6. Run the emulator, then you can see the imported models if everything goes correctly.

## License

- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)

```
Copyright (C)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
