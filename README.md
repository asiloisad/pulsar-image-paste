# image-paste

Paste image data from clipboard into text-editor and save as file.

![demo-1](https://github.com/bacadra/image-paste/blob/master/assets/demo-1.gif?raw=true)

![demo-2](https://github.com/bacadra/image-paste/blob/master/assets/demo-2.png?raw=true)

## Installation

To install `image-paste` search for [image-paste](https://web.pulsar-edit.dev/packages/image-paste) in the Install pane of the Pulsar settings or run `ppm install image-paste`. Alternatively, you can run `ppm install bacadra/pulsar-image-paste` to install a package directly from the Github repository.

## Usage

1. Copy image data to the clipboard (e.g. screenshot).
2. Select destination. An file or directory in the tree view, text editor or text in text-editor can be used.
3. Paste the data. Use `core:paste` (default `Ctrl-V`) if `image-paste.pasteHack` is true, otherwise `image-paste:paste` is required.
4. Select a name. Change the name of the image or accept the suggested name. Note that `image-paste.assetsDir` is prepended to the name and the selection will take effect.
5. Confirm the name. After confirmation (default `Enter`) a new file is created. If the name already exists, a warning will appear and a second confirmation is required.

## Notes

- The package supports all grammars, so it can be used in various file types, such as LaTeX, Python and Markdown.
- Sometimes copied item may have multiple formats (e.g., tables from MS Excel). In such cases, you can use `Ctrl-Shift-V` to paste raw text.
- Only `.png` and `.jpg` (also `.jpeg`) formats are supported. If the file extension does not match, the `.png` format will be used by default.

# Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub — any feedback’s welcome!
