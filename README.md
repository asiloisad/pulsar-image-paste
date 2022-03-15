# image-paste

Copy image or take screenshot and paste it into Atom. Advance algorithm is used to create default path.

![Demo](https://github.com/bacadra/image-paste/blob/master/demo.gif?raw=true)


## Usage in text editor

1. Take a screenshot or copy any image to the clipboard.
2. (optional) Select text in TextEditor. It will be used as proposed name in next step.
3. Paste it into TextEditor instance. If hack is activated, then you can use `core:paste` function (default `ctrl-v`) else `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Please note the `Image directory` path is prepended.
5. Press ENTER
6. See that an directory including the file was created and a figure path has been inserted in the document.


## Usage in tree view

1. Take a screenshot or copy any image to the clipboard.
2. Select file or directory in tree view. If multiple selected, then only first one is used.
3. Paste image. If hack is activated, then you can use `tree-view:paste` function (default `ctrl-v`) else `image-paste:paste`.
4. Change the name of the image or accept the proposed name. Please note the `Image directory` path is not prepended.
5. Press ENTER
6. See that an directory including the file was created and a figure path has been inserted in the document.


## Notes

* **If any file exists under inserted path, then it will be overwritten without any prompt**.
* All grammars are accepted, so package can be used in e.g. LaTeX, Python, Markdown.
* Sometimes copied item has multiple formats (like tables from MS Excel). Then you can use `ctrl-shift-v` to paste raw text.
* Only `.png`, `.jpg` and `.bmp` formats are supported. If file extension does not match, then `.png` format is used.
* package work well with [tree-view-clipboard](https://atom.io/packages/tree-view-clipboard) package.
