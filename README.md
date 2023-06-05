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

The official Atom packages store has been [disabled](https://github.blog/2022-06-08-sunsetting-atom/). To get latest version run the shell command

    apm install bacadra/atom-image-paste

and obtain the package directly from Github repository.

### Pulsar Text Editor

The package has compability with [Pulsar](https://pulsar-edit.dev/) and can be install

    ppm install bacadra/atom-image-paste

or directly [image-paste](https://web.pulsar-edit.dev/packages/image-paste) from Pulsar package store.

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

If you have ideas on how to improve the package, see bugs or want to support new features - feel free to share it via GitHub.

See my other packages for Atom & Pulsar Text Editors:
<p align="center">
<a href="https://github.com/bacadra/atom-autocomplete-sofistik"><img src="https://img.shields.io/github/v/tag/bacadra/atom-autocomplete-sofistik?style=for-the-badge&label=autocomplete-sofistik&color=blue" alt="autocomplete-sofistik">
<a href="https://github.com/bacadra/atom-bib-finder"><img src="https://img.shields.io/github/v/tag/bacadra/atom-bib-finder?style=for-the-badge&label=bib-finder&color=blue" alt="bib-finder">
<a href="https://github.com/bacadra/atom-hydrogen-run"><img src="https://img.shields.io/github/v/tag/bacadra/atom-hydrogen-run?style=for-the-badge&label=hydrogen-run&color=blue" alt="hydrogen-run">
<a href="https://github.com/bacadra/atom-image-paste"><img src="https://img.shields.io/github/v/tag/bacadra/atom-image-paste?style=for-the-badge&label=image-paste&color=blue" alt="image-paste">
<a href="https://github.com/bacadra/atom-language-latex"><img src="https://img.shields.io/github/v/tag/bacadra/atom-language-latex?style=for-the-badge&label=language-latex&color=blue" alt="language-latex">
<a href="https://github.com/bacadra/atom-language-sofistik"><img src="https://img.shields.io/github/v/tag/bacadra/atom-language-sofistik?style=for-the-badge&label=language-sofistik&color=blue" alt="language-sofistik">
<a href="https://github.com/bacadra/atom-linter-ruff"><img src="https://img.shields.io/github/v/tag/bacadra/atom-linter-ruff?style=for-the-badge&label=linter-ruff&color=blue" alt="linter-ruff">
<a href="https://github.com/bacadra/atom-linter-sofistik"><img src="https://img.shields.io/github/v/tag/bacadra/atom-linter-sofistik?style=for-the-badge&label=linter-sofistik&color=blue" alt="linter-sofistik">
<a href="https://github.com/bacadra/atom-navigation-panel"><img src="https://img.shields.io/github/v/tag/bacadra/atom-navigation-panel?style=for-the-badge&label=navigation-panel&color=blue" alt="navigation-panel">
<a href="https://github.com/bacadra/atom-open-external"><img src="https://img.shields.io/github/v/tag/bacadra/atom-open-external?style=for-the-badge&label=open-external&color=blue" alt="open-external">
<a href="https://github.com/bacadra/atom-pdf-viewer"><img src="https://img.shields.io/github/v/tag/bacadra/atom-pdf-viewer?style=for-the-badge&label=pdf-viewer&color=blue" alt="pdf-viewer">
<a href="https://github.com/bacadra/atom-project-files"><img src="https://img.shields.io/github/v/tag/bacadra/atom-project-files?style=for-the-badge&label=project-files&color=blue" alt="project-files">
<a href="https://github.com/bacadra/atom-regex-aligner"><img src="https://img.shields.io/github/v/tag/bacadra/atom-regex-aligner?style=for-the-badge&label=regex-aligner&color=blue" alt="regex-aligner">
<a href="https://github.com/bacadra/atom-sofistik-tools"><img src="https://img.shields.io/github/v/tag/bacadra/atom-sofistik-tools?style=for-the-badge&label=sofistik-tools&color=blue" alt="sofistik-tools">
<a href="https://github.com/bacadra/atom-super-select"><img src="https://img.shields.io/github/v/tag/bacadra/atom-super-select?style=for-the-badge&label=super-select&color=blue" alt="super-select">
<a href="https://github.com/bacadra/atom-word-map"><img src="https://img.shields.io/github/v/tag/bacadra/atom-word-map?style=for-the-badge&label=word-map&color=blue" alt="word-map">
</p>
