'use babel'

import { CompositeDisposable, Disposable } from 'atom'
const SaveDialog = require('./save-dialog')
const clipboard  = require("electron").clipboard

export default {

  config: {
    assetsDir: {
      order: 1,
      title: "Assets directory",
      description: "Local directory to copy images into. Dir will be created if not found. It has effect only if you paste image into text editor",
      type: 'string',
      default: "assets",
    },
    forwardSlash: {
      order: 2,
      title: "Force forward slash",
      description: "Replace all backslash occurens to forward slash in default path. The backslashes inserted by hand will be not replaced",
      type: 'boolean',
      default: true,
    },
    pasteHack: {
      order: 3,
      title: "Hack paste methods",
      description: "Paste methods `core:paste` & `tree-view:paste` will be hacked to capture the images",
      type: 'boolean',
      default: true,
    },
    imagePreview: {
      order: 4,
      title: "Image preview in save dialog",
      description: "Show image preview in show dialog",
      type: 'boolean',
      default: true,
    },
  },

  activate () {
    this.disposables = new CompositeDisposable()
    this.saveDialog  = new SaveDialog()

    this.disposables.add(
      atom.config.observe('image-paste.pasteHack', (value) => {
        this.pasteHack = value
      }),
      atom.commands.onWillDispatch(
        (event) => {
          if (!this.pasteHack) {
            return
          } else if (event.type==='core:paste') {
            editor = atom.workspace.getActiveTextEditor()
            if (!editor) {return}
            grammar = editor.getGrammar()
            if (!grammar) {return}
            this.saveDialog.prepare(event, false, editor)
          } else if (['tree-view:copy', 'tree-view:cut'].includes(event.type)) {
            clipboard.clear() // tree-view doesnt use clipboard
          } else if (event.type==='tree-view:paste' || event.type==='tree-view-clipboard:paste') {
            if (!this.treeView) { return }
            initialPath = this.treeView.selectedPaths()[0]
            this.saveDialog.prepare(event, initialPath, false)
          }
        }
      ),
      atom.commands.add('atom-text-editor', {
        'image-paste:paste': () => {
          editor = atom.workspace.getActiveTextEditor()
          if (!editor) {return}
          this.saveDialog.prepare(false, false, editor)
        }
      }),
      atom.commands.add('.tree-view', {
        'image-paste:paste': () => {
          if (!this.treeView) { return }
          initialPath = this.treeView.selectedPaths()[0]
          this.saveDialog.prepare(false, initialPath, false)
        }
      }),
    )
  },

  deactivate() {
    this.disposables.dispose()
    this.saveDialog .destroy()
  },

  consumeTreeView(treeView) {
    this.treeView = treeView
    return new Disposable(() => {this.treeView = null})
  },
}
