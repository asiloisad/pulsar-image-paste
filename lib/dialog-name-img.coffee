# that file was based in the tree-view file: movedialog.coffee
{Directory, File} = require 'atom'
path = require 'path'
fs = require 'fs'
Dialog = require './dialog'

# dir_tree_wiew = atom.packages.resolvePackagePath('tree-view')
# Dialog = require  dir_tree_wiew + '/lib/dialog'
# {repoForPath} = require  dir_tree_wiew +  "/lib/helpers"

module.exports =
class NameDialog extends Dialog
  constructor: (@img_filename, @assets_dir, @editor, @imgbuffer) ->
    prompt = 'Enter a name for the Image'

    super
      prompt: prompt
      initialPath: @img_filename
      assets_dir: @assets_dir
      select: true
      iconClass: 'icon-arrow-right'

  onConfirm: (relPath) ->
    editor = atom.workspace.getActiveTextEditor()

    thepath = path.join(
      path.dirname(editor.getPath()), relPath.replace(/\s+$/, ''))

    assets_path = path.dirname(thepath)
    filename   = path.basename(thepath)

    return unless filename

    @createDir assets_path, ()=>
      @writePng thepath, @imgbuffer, ()=>
        @insertUrl relPath, @editor

    @close()

  createDir: (dirPath, callback)->
    assetsDir = new Directory(dirPath)

    assetsDir.exists().then (existed) =>
      if not existed
        assetsDir.create().then (created) =>
          if created
            console.log 'image-paste: Success Create dir'
            callback()
      else
        callback()

  writePng: (Path, buffer, callback)->
    fs = require('fs')
    fs.writeFile Path, buffer, 'binary',() =>
      console.log('image-paste: Finish clip image')
      callback()

  insertUrl: (relPath, editor) ->
    selection = editor.getSelectedText()
    if selection.length > 0
      editor.insertText(filename)
    else
      editor.insertText(relPath)
