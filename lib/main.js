const { CompositeDisposable, Disposable } = require('atom')
const SaveDialog = require('./save-dialog')
const { clipboard } = require('electron')

module.exports = {

  activate () {
    this.disposables = new CompositeDisposable()
    this.saveDialog = new SaveDialog()
    this.disposables.add(
      atom.config.observe('image-paste.pasteHack', (value) => {
        this.pasteHack = value
      }),
      atom.commands.onWillDispatch(
        (event) => {
          if (!this.pasteHack) {
            return
          } else if (event.type==='core:paste') {
            let editor = atom.workspace.getActiveTextEditor()
            if (!editor) {return}
            let grammar = editor.getGrammar()
            if (!grammar) {return}
            this.saveDialog.prepare(event, false, editor)
          } else if (['tree-view:copy', 'tree-view:cut'].includes(event.type)) {
            clipboard.clear() // tree-view doesnt use clipboard
          } else if (event.type==='tree-view:paste') {
            if (!this.treeView) { return }
            let initialPath = this.treeView.selectedPaths()[0]
            this.saveDialog.prepare(event, initialPath, false)
          }
        }
      ),
      atom.commands.add('atom-text-editor:not([mini])', {
        'image-paste:paste': () => {
          let editor = atom.workspace.getActiveTextEditor()
          if (!editor) {return}
          this.saveDialog.prepare(false, false, editor)
        }
      }),
      atom.commands.add('.tree-view', {
        'image-paste:paste': () => {
          if (!this.treeView) { return }
          let initialPath = this.treeView.selectedPaths()[0]
          this.saveDialog.prepare(false, initialPath, false)
        }
      }),
    )
  },

  deactivate() {
    this.disposables.dispose()
    this.saveDialog.destroy()
  },

  consumeTreeView(treeView) {
    this.treeView = treeView
    return new Disposable(() => { this.treeView = null })
  },
}
