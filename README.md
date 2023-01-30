# image-paste

![Demo](https://github.com/bacadra/image-paste/blob/master/assets/demo.gif?raw=true)

![Preview](https://github.com/bacadra/image-paste/blob/master/assets/preview.png?raw=true)

Copy image or take screenshot and paste it into Atom.

## Installation

The official [Atom packages store](https://atom.io/packages) has been disabled. To get latest version run the shell command

    apm install bacadra/atom-image-paste

and obtain the package directly from Github repository.

The package has compability with [Pulsar](https://pulsar-edit.dev/) and can be install

    pulsar -p install bacadra/atom-image-paste

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

# Contributing

If you have ideas on how to improve the package, see bugs or want to support new features - feel free to share it via GitHub.

See my other packages for Atom Editor:

* [autocomplete-sofistik](https://github.com/bacadra/atom-autocomplete-sofistik)
* [bib-finder](https://github.com/bacadra/atom-bib-finder)
* [hydrogen-run](https://github.com/bacadra/atom-hydrogen-run)
* [image-paste](https://github.com/bacadra/atom-image-paste)
* [language-sofistik](https://github.com/bacadra/atom-language-sofistik)
* [navigation-panel](https://github.com/bacadra/atom-navigation-panel)
* [open-external](https://github.com/bacadra/atom-open-external)
* [pdf-viewer](https://github.com/bacadra/atom-pdf-viewer)
* [project-files](https://github.com/bacadra/atom-project-files)
* [regex-aligner](https://github.com/bacadra/atom-regex-aligner)
* [sofistik-tools](https://github.com/bacadra/atom-sofistik-tools)
* [super-select](https://github.com/bacadra/atom-super-select)
* [word-map](https://github.com/bacadra/atom-word-map)
