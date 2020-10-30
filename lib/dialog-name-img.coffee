{Directory, File} = require 'atom'
path              = require 'path'
fs                = require 'fs'
Dialog            = require './dialog'

module.exports =
class NameDialog extends Dialog
  constructor: (@img_filename, @editor, @imgbuffer) ->
    prompt = 'Enter a name for the Image'

    super
      prompt: prompt
      initialPath: @img_filename
      select: true
      iconClass: 'icon-arrow-right'

  onConfirm: (relPath) ->
    thepath = path.join(
      path.dirname(@editor.getPath()), relPath.replace(/\s+$/, ''))

    assets_path = path.dirname(thepath)
    filename   = path.basename(thepath)

    return unless filename

    @createDir assets_path, ()=>
      @writePng thepath, ()=>
        @insertUrl relPath

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

  writePng: (Path, callback)->
    fs = require('fs')
    fs.writeFile Path, @buffer, 'binary',() =>
      console.log('image-paste: Finish clip image')
      callback()

  insertUrl: (relPath) ->
    selection = @editor.getSelectedText()
    if selection.length > 0
      @editor.insertText(relPath)
    else
      @editor.insertText(relPath)
