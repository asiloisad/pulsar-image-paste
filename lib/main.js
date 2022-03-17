'use babel'

import { CompositeDisposable, Disposable } from 'atom'
var path       = require('path')
var crypto     = require('crypto')
var SaveDialog = require('./save-dialog');
var clipboard  = require("electron").clipboard;

export default {

  config: {
    assetsDir: {
      title: "Image directory",
      description: "Local directory to copy images into. Dir will be created if not found. It has mean only if you paste image into text editor",
      type: 'string',
      "default": "assets",
      order: 1
    },
    forwardSlash: {
      title: "Force forward slash separator",
      description: "Replace all backslash occurens to forward slash in default path. The backslashes inserted by hand will be not replaced",
      type: 'boolean',
      "default": true,
      order: 2
    },
    pasteHack: {
      title: "Hack core:paste & tree-view:paste methods",
      description: "Paste methods will be hacked and be able to capture the image",
      type: 'boolean',
      "default": true,
      order: 3
    }
  },

  activate () {
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(
      atom.config.observe('image-paste.assetsDir', {}, (value)=>{this.assetsDir=value}),
      atom.config.observe('image-paste.forwardSlash', {}, (value)=>{this.forwardSlash=value}),
      atom.config.observe('image-paste.pasteHack', {}, (value)=>{this.pasteHack=value}),
      atom.commands.onWillDispatch(
        (event) => {
          if (!this.pasteHack) {
            return
          } else if (event.type==='core:paste') {
            editor = atom.workspace.getActiveTextEditor()
            if (!editor) {return}
            grammar = editor.getGrammar()
            if (!grammar) {return}
            this.process(event, false, editor)
          } else if (event.type==='tree-view:copy') {
            clipboard.clear() // tree-view doesnt use clipboard
          } else if (event.type==='tree-view:paste' || event.type==='tree-view-clipboard:paste') {
            initialPath = this.treeView.selectedPaths()[0]
            this.process(event, initialPath, false)
          }
        }
      ),
      atom.commands.add('atom-text-editor', {
        'image-paste:paste': () => {
          editor = atom.workspace.getActiveTextEditor()
          if (!editor) {return}
          this.process(false, false, editor)
        }
      }),
      atom.commands.add('.tree-view', {
        'image-paste:paste': () => {
          initialPath = this.treeView.selectedPaths()[0]
          this.process(false, initialPath, false)
        }
      }),
    )
  },

  deactivate () {
    return this.subscriptions.dispose();
  },

  consumeTreeView(treeView) {
    this.treeView = treeView
    return new Disposable(() => {this.treeView = null});
  },

  process (event, initialPath, editor) {
    img = clipboard.readImage()
    if (img.isEmpty()) {
      return
    } else if (event) {
      event.stopImmediatePropagation()
    }
    extname = path.extname(initialPath).toLowerCase()
    if (extname==='.jpg' && extname==='.jpeg') {
      imgbuffer = img.toJPEG();
    } else if (extname==='.bmp') {
      imgbuffer = img.toBitmap();
    } else {
      extname = '.png'
      imgbuffer = img.toPNG();
    }
    if (!initialPath && editor) {
      target_file = editor.getPath();
      if (!target_file) {return}
      selection   = editor.getSelectedText();
      if (selection.length > 0 && (!selection.includes('\n'))) {
        initialPath = selection;
      } else {
        md5 = crypto.createHash('md5');
        md5.update(imgbuffer);
        nm5 = md5.digest('hex').slice(0, 8)
        initialPath = (path.parse(target_file).name) + "-" + nm5;
      }
      if (!initialPath.endsWith(extname)) {initialPath = initialPath + extname}
      if (!(initialPath.startsWith(this.assetsDir+'\\')||initialPath.startsWith(this.assetsDir+'/'))) {
        initialPath = path.join(this.assetsDir, initialPath);
      }
      initialPath = initialPath.replace(/[\<\>\:\"\|\?\*]/g, '')
      let selectionEnd, selectionStart;
      if (initialPath.startsWith(this.assetsDir)) {
        selectionStart = this.assetsDir.length+1;
      } else {
        selectionStart = 0;
      }
      extension = path.extname(initialPath);
      baseName  = path.basename(initialPath);
      if (baseName === extension) {
        selectionEnd = initialPath.length;
      } else {
        selectionEnd = initialPath.length - extension.length;
      }
      basePath = path.dirname(editor.getPath())
      range = [[0, selectionStart], [0, selectionEnd]]
    } else {
      if (fs.lstatSync(initialPath).isDirectory()) {
        md5 = crypto.createHash('md5');
        md5.update(imgbuffer);
        nm5 = md5.digest('hex').slice(0, 8)
        initialPath = initialPath + `/${nm5}`
      }
      [basePath, initialPath] = atom.project.relativizePath(initialPath)
      basename = path.basename(initialPath, path.extname(initialPath))
      initialPath = path.join(path.dirname(initialPath), basename + extname)
      selectionStart = initialPath.match(/[\/\\]/) ? path.dirname(initialPath).length+1 : 0
      range = [[0, selectionStart], [0, initialPath.length-4]]
    }
    if (this.forwardSlash) {
      initialPath = initialPath.split('\\').join('/');
    }
    new SaveDialog(initialPath, imgbuffer, editor, basePath, range).show();
  },

};
