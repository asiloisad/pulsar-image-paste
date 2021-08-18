# image-paste

Copy image or take screenshot and paste it in text document. The image will be saved in given path and relative path will be inserted into document.

![Demo1](https://github.com/bacadra/image-paste/blob/master/demo1.gif?raw=true)


## Usage

1. Take a screenshot or copy any image to the clipboard.
2. Paste it into TextEditor instance. If `Hack core:paste method` is checked, then you can use `core:paste` function (default `ctrl-v`) else use `image-paste:save` function.
3. (optional) Select text in TextEditor. It will be used as proposed name in next step.
4. Change the name of the image or accept the proposed name. Please note the `Image directory` path is prepended.
5. Press ENTER.
6. See that an directory including the `<name>.png` file was created and a figure path has been inserted in the document.


## Notes

* All grammars are accepted.
* If any file exists under inserted path, then it will be overwritten without any prompt.
* Sometimes copied item has multiple format (like from MS Excel). Then you can use `ctrl-shift-v` to paste raw text.
* Only `.png` format is supported.


## Fork

This for of LaTeX Image Helper package.

https://github.com/simon123h/latex-image-paste

The changes in compare to the original package:
* The scope of package has been extended to any grammar.
* The RAW path is inserted instead of latex-image block. This way it can be used in any schema, e.g. Python pyLatex package.
* The main path occur in path dialog now, so it can be changed in any moment without going to setting pane.
* `core:paste` can be hacked, but does not have to be.
