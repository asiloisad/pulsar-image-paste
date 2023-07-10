# image-paste

<p align="center">
  <a href="https://github.com/bacadra/atom-image-paste/tags">
  <img src="https://img.shields.io/github/v/tag/bacadra/atom-image-paste?style=for-the-badge&label=Latest&color=blue" alt="Latest">
  </a>
  <a href="https://github.com/bacadra/atom-image-paste/issues">
  <img src="https://img.shields.io/github/issues-raw/bacadra/atom-image-paste?style=for-the-badge&color=blue" alt="OpenIssues">
  </a>
  <a href="https://github.com/bacadra/atom-image-paste/blob/master/package.json">
  <img src="https://img.shields.io/github/languages/top/bacadra/atom-image-paste?style=for-the-badge&color=blue" alt="Language">
  </a>
  <a href="https://github.com/bacadra/atom-image-paste/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/bacadra/atom-image-paste?style=for-the-badge&color=blue" alt="Licence">
  </a>
</p>

![Demo](https://github.com/bacadra/image-paste/blob/master/assets/demo.gif?raw=true)

![Preview](https://github.com/bacadra/image-paste/blob/master/assets/preview.png?raw=true)

The image-paste package allows you to copy images or take screenshots and paste them directly into Atom. Here's how to use it:

## Installation

### Atom Text Editor

The official Atom packages store has been [disabled](https://github.blog/2022-06-08-sunsetting-atom/). To obtain the latest version, please run the following shell command:

```shell
apm install bacadra/atom-image-paste
```

This will allow you to directly download the package from the GitHub repository.

### Pulsar Text Editor

The package is compatible with [Pulsar](https://pulsar-edit.dev/) and can be installed using the following command:

```shell
ppm install bacadra/atom-image-paste
```

Alternatively, you can directly install [image-paste](https://web.pulsar-edit.dev/packages/image-paste) from the Pulsar package store.

## Usage in text-editor

1. Take a screenshot or copy any image to the clipboard.
2. (Optional) Select text in the TextEditor. The selected text will be used as the proposed name in the next step.
3. Paste the image into the TextEditor instance. If the hack is activated, you can use the `core:paste` function (default `Ctrl-V`), or else use `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Note that the `Image directory` path is prepended to the name.
5. Press `Enter`.
6. You will see that a directory including the file has been created, and a figure path has been inserted in the document.

## Usage in tree-view

1. Take a screenshot or copy any image to the clipboard.
2. Select a file or directory in the tree view. If multiple items are selected, only the first one will be used.
3. Paste the image. If the hack is activated, you can use the `tree-view:paste` function (default `Ctrl-V`), or else use `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Note that the `Image directory` path is not prepended to the name.
5. Press `Enter`.
6. You will see that a directory including the file has been created, and a figure path has been inserted in the document.

## Notes

* If a file with the same name already exists, press `Enter` once more to proceed.
* The package supports all grammars, so it can be used in various file types, such as LaTeX, Python, and Markdown.
* Sometimes the copied item may have multiple formats (e.g., tables from MS Excel). In such cases, you can use `Ctrl-Shift-V` to paste raw text.
* Only `.png` and `.jpg` (also `.jpeg`) formats are supported. If the file extension does not match, the `.png` format will be used by default.
* The package works well with the [tree-view-clipboard](https://github.com/Souleste/tree-view-clipboard) package.

# Contributing [🍺](https://www.buymeacoffee.com/asiloisad)

If you have any ideas on how to improve the package, spot any bugs, or would like to support the development of new features, please feel free to share them via GitHub.
