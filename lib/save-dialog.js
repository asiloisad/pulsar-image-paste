'use babel'

import {TextEditor, CompositeDisposable, Disposable} from 'atom';
const path = require('path');
var fs = require('fs');

export default class SaveDialog {

  constructor(initialPath, imgbuffer, editor, basePath, range) {
    this.initialPath = initialPath;
    this.imgbuffer = imgbuffer;
    this.editor = editor;
    this.basePath = basePath
    this.range = range

    this.disposables = new CompositeDisposable();

    this.element = document.createElement('div');
    this.element.classList.add('dialog');
    this.element.classList.add('save-dialog');

    this.promptText = document.createElement('label');
    this.promptText.classList.add('icon');
    this.promptText.classList.add('icon-arrow-right');
    this.promptText.textContent = 'Enter a path for the image with extension';
    this.element.appendChild(this.promptText);

    this.miniEditor = new TextEditor({mini: true});
    this.element.appendChild(this.miniEditor.element);

    const blurHandler = () => { if (document.hasFocus()) { return this.close() } };
    this.miniEditor.element.addEventListener('blur', blurHandler);
    this.disposables.add(new Disposable(() => this.miniEditor.element.removeEventListener('blur', blurHandler)));

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
