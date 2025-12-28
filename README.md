# image-paste

Paste images from clipboard into your project as new files. Supports PNG and JPG formats with customizable file naming.

![demo](https://github.com/asiloisad/pulsar-image-paste/blob/master/assets/demo.png?raw=true)

## Features

- **Clipboard paste**: Paste image data directly from screenshots or copied images.
- **Multiple targets**: Paste via tree-view, text editor, or selected text.
- **Custom naming**: Choose file name with auto-suggested defaults.
- **Any grammar**: Works with LaTeX, Python, Markdown, and other file types.

## Installation

To install `image-paste` search for [image-paste](https://web.pulsar-edit.dev/packages/image-paste) in the Install pane of the Pulsar settings or run `ppm install image-paste`. Alternatively, you can run `ppm install asiloisad/pulsar-image-paste` to install a package directly from the GitHub repository.

## Commands

Commands available in `atom-text-editor:not([mini])`:

- `image-paste:paste`: paste image from clipboard into project.

Commands available in `.tree-view`:

- `image-paste:paste`: paste image from clipboard into selected directory.

## Usage

1. Copy image data to the clipboard (e.g. screenshot).
2. Select destination. A file or directory in the tree view, text editor or text in text-editor can be used.
3. Paste the data. Use `core:paste` (`Ctrl+V`) if `Hack paste methods` is enabled, otherwise `image-paste:paste` command is required.
4. Select a name. Change the name of the image or accept the suggested name. Note that `assets` directory is prepended to the name and the selection will take effect.
5. Confirm the name. After confirmation (`Enter`) a new file is created. If the name already exists, a warning will appear and a second confirmation is required.

## Notes

- The package supports all grammars, so it can be used in various file types, such as LaTeX, Python and Markdown.
- Sometimes copied item may have multiple formats (e.g., tables from MS Excel). In such cases, you can use `Ctrl+Shift+V` to paste raw text.
- Only `.png` and `.jpg` (also `.jpeg`) formats are supported. If the file extension does not match, the `.png` format will be used by default.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub — any feedback's welcome!
