# Web Calculator Emulator

A community-driven web calculator emulator.

**FOR STUDYING PURPOSES ONLY.**

## Usage

To run the emulator, set up a local HTTP server for static files with your favorite tool and visit index.html. If you have Python 3 installed, you can run the following command:

```bash
python ./start.py
```

Then it should open a web browser, and you can use the emulator.

Please note that this repository contains no available models. You need to find and import them yourself.

## Import Single Model

Open the **Add Custom Model** panel to import a single model.

- **Model ID**: Must starts with `CY` or `EY` to indicate the model type.
- **Model Name**: The name of the model, can be whatever you like.
- **Model File**: Select 3 files, including `core.dat`(or `rom.bin`), `face.svg` and `keylog.json`. The `core.dat` file is the ROM file of the calculator, can be either raw or encrypted. The `face.svg` file is the SVG file of the calculator's faceplate. The `keylog.json` file is the keylog file of the calculator, which is used to map the key codes to the key names.

After importing, it will be run immediately and displayed in the model list.

## Import Multiple Models

When you have a lot of models to import, you can follow the steps below to import them all at once.

- Create a `data` folder in the root directory of the repository.
- Create a folder for each model in the `data` folder, and name it with the model ID.
- Put the 3 files (`core.dat`, `face.svg` and `keylog.json`) in the folder you just created.
- Open `index.html` in a text editor, and find the line `const emulatorList = {};`. As an example, change it to
  ```javascript
  const emulatorList = {
    "EY***": {
      "name": "fx-***",
      "background": "#3A3A3A"
    },
    // ...... other models
  };
  ```
  The key of each item is the model ID, and the value is an object containing the model name and the background color of the emulator.
- Find the line `const emulatorGroup = [];`. As an example, change it to

  ```javascript
  const emulatorGroup = [
    {
      "shortName": "??",
      "name": {
        "en": "??",
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
  The `shortName` is the short name of the group, and the `name` is the full name of the group that supports multiple languages. The `models` is an array containing the model IDs of the models in the group.
- Run the emulator, and you should see the models you just imported.

## License

AGPLv3
