'use babel'

import {TextEditor, CompositeDisposable, Disposable} from 'atom';
const path = require('path');
var fs = require('fs');

export default class SaveDialog {

  constructor(initialPath, imgbuffer, editor, basePath, range, dataURL) {
    this.initialPath = initialPath;
    this.imgbuffer = imgbuffer;
    this.editor = editor;
    this.basePath = basePath
    this.range = range
    this.readyQ = false

    this.disposables = new CompositeDisposable();

    this.element = document.createElement('div');
    this.element.classList.add('dialog');
    this.element.classList.add('save-dialog');

    promptText = document.createElement('label');
    promptText.classList.add('icon');
    promptText.classList.add('icon-arrow-right');
    promptText.textContent = 'Enter a path for the image with extension';
    this.element.appendChild(promptText);

    this.miniEditor = new TextEditor({mini: true});
    this.element.appendChild(this.miniEditor.element);

    const blurHandler = () => { if (document.hasFocus()) { return this.close() } };
    this.miniEditor.element.addEventListener('blur', blurHandler);
    this.disposables.add(new Disposable(() => this.miniEditor.element.removeEventListener('blur', blurHandler)));

    if (dataURL) {
      imagePreview = document.createElement('img');
      imagePreview.src = dataURL
      this.element.appendChild(imagePreview);
    }

    atom.commands.add(this.element, {
      'core:confirm': () => this.onConfirm(this.miniEditor.getText()),
      'core:cancel': () => this.cancel()
    }
    );

    this.miniEditor.setText(initialPath);
    if (this.range) {this.miniEditor.setSelectedBufferRange(this.range)};
  }

  show() {
    this.previouslyFocusedElement = document.activeElement
    this.panel = atom.workspace.addModalPanel({item: this});
    this.miniEditor.element.focus();
    return this.miniEditor.scrollToCursorPosition();
  }

  close() {
    const { panel } = this;
    this.panel = null;
    if (panel != null) { panel.destroy() }
    this.disposables.dispose();
    this.miniEditor.destroy();

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
      this.previouslyFocusedElement = null
    } else {
      const activePane = atom.workspace.getCenter().getActivePane();
      if (!activePane.isDestroyed()) { return activePane.activate(); }
    }
  }

  cancel() {
    return this.close();
  }

  showError(message) {
    if (message == null) { message = ''; }
    this.errorMessage.textContent = message;
    if (message) {
      this.element.classList.add('error');
      return window.setTimeout((() => this.element.classList.remove('error')), 300);
    }
  }

  onConfirm(relPath) {
    relPath = relPath.replace(/[\<\>\:\"\|\?\*]/g, '')
    filePath = path.join(this.basePath, relPath.replace(/\s+$/, ''));
    dirPath  = path.dirname(filePath)
    if (!path.basename(filePath)) { return }
    fs.mkdirSync(dirPath, {recursive:true})
    if (!this.readyQ && fs.existsSync(filePath)) {
      overText = document.createElement('div')
      overText.classList.add('warning');
      overText.innerHTML = 'WARNING: file already exists. Press Enter again to overwrite it.'
      this.element.appendChild(overText)
      this.readyQ = true
      return
    }
    fs.writeFileSync(filePath, this.imgbuffer, 'binary')
    if (this.editor) {
      selection = this.editor.getSelectedText();
      if (selection.length > 0) {
        this.editor.insertText(relPath);
      } else {
        this.editor.insertText(relPath);
      }
    }
    return this.close();
  }
};
