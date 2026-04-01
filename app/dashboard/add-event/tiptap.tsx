"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Placeholder } from "@tiptap/extension-placeholder"

const toolbarBtn =
  "p-1.5 border-2 border-black text-black font-black transition-all hover:bg-purple-700 hover:text-white data-[state=on]:bg-purple-700 data-[state=on]:text-white shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"

const Tiptap = ({ val }: { val: string }) => {
  const { setValue } = useFormContext()

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Add a longer description for your event",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      StarterKit.configure({
        orderedList: { HTMLAttributes: { class: "list-decimal pl-4" } },
        bulletList: { HTMLAttributes: { class: "list-disc pl-4" } },
      }),
    ],
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML(), { shouldValidate: true, shouldDirty: true })
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] w-full border-2 border-t-0 border-black bg-white px-4 py-3 text-sm focus:outline-none",
      },
    },
    content: val,
  })

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(val)
  }, [val])

  return (
    <div className="flex flex-col">
      {editor && (
        <div className="flex gap-1 border-2 border-black bg-purple-50 p-1.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
            className={toolbarBtn}
            aria-label="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-state={editor.isActive("italic") ? "on" : "off"}
            className={toolbarBtn}
            aria-label="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-state={editor.isActive("strike") ? "on" : "off"}
            className={toolbarBtn}
            aria-label="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
            className={toolbarBtn}
            aria-label="Ordered list"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
            className={toolbarBtn}
            aria-label="Bullet list"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
