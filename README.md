# Web Calculator Emulator

A community-driven web calculator emulator.

**FOR STUDYING AND LEARNING PURPOSES ONLY. COMMERCIAL USE IS NOT ALLOWED.**

## How To Use

In order to run the emulator, you have to set up a local HTTP server for static files, just using the tools you familiar with, and then open `index.html` in your browser. 

If Python 3 is already installed, you can also choose to run with the following command to start local HTTP server:

```bash
python ./start.py
```

Please note that there's no available models in this repository. You have to find and import them by yourself.

## Import Single Model

Run the emulator, and then switch to **Add Custom Model** panel to import a single model.

- **Model ID**: Required to start with `CY` or `EY` in order to indicate the model type.

- **Model Name**: The name of the model, can be whatever you like.

- **Model File**: 3 files are needed, which are `core.dat` (or `rom.bin`), `face.svg` and `keylog.json`.

   `core.dat` file: the ROM file of the calculator, can be either raw or encrypted.

   `face.svg` file: an SVG file of the calculator's faceplate.

   `keylog.json` file: the keylog file of the calculator, which is used to map the key codes to the key names.

If everything imported correctly, the model will be run and displayed in the model list inside the emulator.

## Import Multiple Models

If you want to import multiple models, follow the steps below to import them all at once.

1. Create a folder named `data` in the root directory of the repository.

2. Create folders for each model in the `data` folder, and name it with the model ID.

3. Put the 3 files (`core.dat`, `face.svg` and `keylog.json`) in each folder you just created.

4. Open `index.html` in any text editor, find the line begin with `const emulatorList = {};` 

    Edit the content in the following format:

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

5. Find the line begin with `const emulatorGroup = [];` 

   Edit the content in the following format:

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
   `shortName` : the short name of the group.

   `name` : the full name of the group that supports multiple languages.

   `models` : an array containing the model IDs of the models in the group.

6. Run the emulator, then you can see the imported models in the model list if everything goes correctly.

## License

- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
