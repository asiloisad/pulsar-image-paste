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

Copy image or take screenshot and paste it into Atom.

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
2. (optional) Select text in TextEditor. It will be used as proposed name in next step.
3. Paste it into TextEditor instance. If hack is activated, then you can use `core:paste` function (default `Ctrl-V`) else `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Please note the `Image directory` path is prepended.
5. Press `Enter`
6. See that an directory including the file was created and a figure path has been inserted in the document.

## Usage in tree-view

1. Take a screenshot or copy any image to the clipboard.
2. Select file or directory in tree view. If multiple selected, then only first one is used.
3. Paste image. If hack is activated, then you can use `tree-view:paste` function (default `Ctrl-V`) else `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Please note the `Image directory` path is not prepended.
5. Press `Enter`
6. See that an directory including the file was created and a figure path has been inserted in the document.

## Notes

* If file already exists, then press `Enter` once more.
* All grammars are accepted, so package can be used in e.g. LaTeX, Python, Markdown.
* Sometimes copied item has multiple formats (like tables from MS Excel). Then you can use `Ctrl-Shift-V` to paste raw text.
* Only `.png` and `.jpg` (also `.jpeg`) formats are supported. If file extension does not match, then `.png` format is used.
* package work well with [tree-view-clipboard](https://github.com/Souleste/tree-view-clipboard) package.

# Contributing [🍺](https://www.buymeacoffee.com/asiloisad)

If you have any ideas on how to improve the package, spot any bugs, or would like to support the development of new features, please feel free to share them via GitHub.
