const { CompositeDisposable, Disposable, TextEditor } = require("atom");
const { clipboard } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

module.exports = class SaveDialog {
  constructor() {
    this.panel = null;
    this.disposables = new CompositeDisposable();
    this.disposables.add(
      atom.config.observe("image-paste.assetsDir", (value) => {
        this.assetsDir = value;
      }),
      atom.config.observe("image-paste.forwardSlash", (value) => {
        this.forwardSlash = value;
      }),
      atom.config.observe("image-paste.imagePreview", (value) => {
        this.imagePreview = value;
      })
    );
    this.element = document.createElement("div");
    this.element.classList.add("dialog");
    this.element.classList.add("image-paste");
    this.element.classList.add("save-dialog");
    this.miniEditor = new TextEditor({ mini: true });
    let blurHandler = () => {
      if (document.hasFocus()) {
        return this.hide();
      }
    };
    this.miniEditor.element.addEventListener("blur", blurHandler);
    this.disposables.add();
    this.disposables.add(
      new Disposable(() =>
        this.miniEditor.element.removeEventListener("blur", blurHandler)
      ),
      this.miniEditor.onDidChange(() => {
        this.overwrite = false;
        this.warningElement.innerHTML = "";
      })
    );
    this.element.appendChild(this.miniEditor.element);
    this.warningElement = document.createElement("div");
    this.warningElement.classList.add("warning");
    this.element.appendChild(this.warningElement);
    this.imageElement = document.createElement("img");
    this.element.appendChild(this.imageElement);
    this.disposables.add(
      atom.commands.add(this.element, {
        "core:confirm": () => this.confirm(),
        "core:cancel": () => this.hide(),
      })
    );
  }

  destroy() {
    this.panel = null;
    this.miniEditor.destroy();
    this.disposables.dispose();
  }

  show() {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({ item: this });
    }
    // Store focused element using same pattern as pulsar-select-list
    const active = document.activeElement;
    if (active && !active.closest(".modal")) {
      document.priorFocus = active;
    }
    this.panel.show();
    this.miniEditor.element.focus();
  }

  hide() {
    if (!this.isVisible()) {
      return;
    }
    this.panel.hide();
    // Restore focus using same pattern as pulsar-select-list
    if (document.priorFocus) {
      document.priorFocus.focus();
      delete document.priorFocus;
    }
  }

  isVisible() {
    return this.panel && this.panel.isVisible();
  }

  prepare(event, initialPath, editor) {
    this.editor = editor;
    this.image = clipboard.readImage();
    if (this.image.isEmpty()) {
      return;
    } else if (event) {
      event.stopImmediatePropagation();
    }
    let dataURL = this.image.toDataURL();
    let extName,
      md5,
      nm5,
      range,
      selection,
      selectionEnd,
      selectionStart,
      baseName;
    if (!initialPath && editor) {
      let target_file = editor.getPath();
      if (!target_file) {
        return;
      }
      selection = editor.getSelectedText();
      if (selection.length > 0 && !selection.includes("\n")) {
        initialPath = selection;
        extName = path.extname(initialPath).toLowerCase();
        if (!extName) {
          extName = ".png";
        }
      } else {
        md5 = crypto.createHash("md5");
        md5.update(dataURL);
        nm5 = md5.digest("hex").slice(0, 8);
        extName = ".png";
        initialPath = path.parse(target_file).name + "-" + nm5;
      }
      if (!initialPath.endsWith(extName)) {
        initialPath = initialPath + extName;
      }
      if (
        !(
          initialPath.startsWith(this.assetsDir + "\\") ||
          initialPath.startsWith(this.assetsDir + "/")
        )
      ) {
        initialPath = path.join(this.assetsDir, initialPath);
      }
      initialPath = initialPath.replace(/[\<\>\:\"\|\?\*]/g, "");
      if (initialPath.startsWith(this.assetsDir)) {
        selectionStart = this.assetsDir.length + 1;
      } else {
        selectionStart = 0;
      }
      baseName = path.basename(initialPath);
      if (baseName === extName) {
        selectionEnd = initialPath.length;
      } else {
        selectionEnd = initialPath.length - extName.length;
      }
      this.basePath = path.dirname(editor.getPath());
      range = [
        [0, selectionStart],
        [0, selectionEnd],
      ];
    } else {
      [this.basePath, initialPath] = atom.project.relativizePath(initialPath);
      md5 = crypto.createHash("md5");
      md5.update(dataURL);
      nm5 = md5.digest("hex").slice(0, 8);
      if (fs.lstatSync(path.join(this.basePath, initialPath)).isDirectory()) {
        initialPath = path.join(initialPath, nm5 + ".png");
      } else {
        extName = path.extname(initialPath).toLowerCase();
        baseName = path.basename(initialPath, extName) + "-" + nm5;
        initialPath = path.join(path.dirname(initialPath), baseName + ".png");
      }
      selectionStart = initialPath.match(/[\/\\]/)
        ? path.dirname(initialPath).length + 1
        : 0;
      range = [
        [0, selectionStart],
        [0, initialPath.length - 4],
      ];
    }
    if (this.forwardSlash) {
      initialPath = initialPath.split("\\").join("/");
    }
    this.miniEditor.setText(initialPath);
    if (range) {
      this.miniEditor.setSelectedBufferRange(range);
    }
    this.overwrite = false;
    this.warningElement.innerHTML = "";
    this.imageElement.src = this.imagePreview ? dataURL : "";
    this.show();
  }

  confirm() {
    let relPath, filePath, dirPath, extName, imgbuffer;
    relPath = this.miniEditor.getText().replace(/[\<\>\:\"\|\?\*]/g, "");
    filePath = path.join(this.basePath, relPath.replace(/\s+$/, ""));
    dirPath = path.dirname(filePath);
    if (!path.basename(filePath)) {
      return;
    }
    fs.mkdirSync(dirPath, { recursive: true });
    if (!this.overwrite && fs.existsSync(filePath)) {
      this.overwrite = true;
      this.warningElement.innerHTML =
        'WARNING: File already exists. Press <span class="keystroke">Enter</span> again to overwrite it.';
      return;
    }
    extName = path.extname(filePath).toLowerCase();
    if (extName === ".jpg" || extName === ".jpeg") {
      imgbuffer = this.image.toJPEG(95);
    } else {
      imgbuffer = this.image.toPNG();
    }
    fs.writeFileSync(filePath, imgbuffer, "binary");
    if (this.editor) {
      this.editor.insertText(relPath);
    }
    this.hide();
  }
};
