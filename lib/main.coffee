{CompositeDisposable, Disposable, Directory, File} = require 'atom'
fs         = require 'fs'
path       = require 'path'
crypto     = require "crypto"
NameDialog = require './dialog-name-img'

module.exports = MarkdownImageAssistant =
  subscriptions: null
  config:
    imageDir:
      title: "Image directory"
      description: "Local directory to copy images into; created if not found."
      type: 'string'
      default: "assets"
      order: 1
    prependTargetFileName:
      title: "Prepend the target file name"
      description: "Whether to prepend the target file name when copying over the image. Overrides the \"Preserve Original Name\" setting."
      type: 'boolean'
      default: true
      order: 2
    slashJoin:
      title: "Force forward slash separator"
      description: "Replace all backslash occurens to forward slash in default path. The backslashes inserted by hand will be not replaced."
      type: 'boolean'
      default: true
      order: 3
    coreHandle:
      title: "Hack core:paste method"
      description: "If active then the default paste method will be hacked and be able to capture the image."
      type: 'boolean'
      default: true
      order: 4

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up
    # with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register handler for copy and paste events
    @subscriptions.add atom.commands.onWillDispatch (e) =>
      if event? and event.type == 'core:paste'
        return unless atom.config.get('image-paste.coreHandle')
        editor = atom.workspace.getActiveTextEditor()
        return unless editor
        grammar = editor.getGrammar()
        return unless grammar
        @handle_cp(e)
      else if event? and event.type == 'tree-view:paste'
        console.log 'TODO'

    @subscriptions.add atom.commands.add 'atom-text-editor',
      'image-paste:save': () =>
        editor = atom.workspace.getActiveTextEditor()
        return unless editor
        @handle_cp()

  # triggered in response to a copy pasted image
  handle_cp: (e) ->
    clipboard = require 'clipboard'
    img = clipboard.readImage()
    return if img.isEmpty()
    editor = atom.workspace.getActiveTextEditor()
    if e
      e.stopImmediatePropagation()
    imgbuffer = img.toPNG()
    @process_file(editor, imgbuffer, ".png")

  # write a given buffer to the local "assets/" directory
  process_file: (editor, imgbuffer, extname) ->
    target_file = editor.getPath()

    md5 = crypto.createHash 'md5'
    md5.update(imgbuffer)

    selection = editor.getSelectedText()

    if selection.length > 0
      img_filename = selection
    else
      if !atom.config.get('image-paste.prependTargetFileName')
        img_filename = "#{md5.digest('hex').slice(0,8)}#{extname}"
      else
        img_filename = "#{path.parse(target_file).name}-#{md5.digest('hex').slice(0,8)}#{extname}"

    dialog = new NameDialog img_filename, editor, imgbuffer
    dialog.attach()

    return false

  deactivate: ->
    @subscriptions.dispose()
