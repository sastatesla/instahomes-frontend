import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react'
import { cn } from '../../lib/utils'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const items = [
    {
      icon: Undo,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
      isActive: () => false,
      canExecute: () => editor.can().chain().focus().undo().run()
    },
    {
      icon: Redo,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
      isActive: () => false,
      canExecute: () => editor.can().chain().focus().redo().run()
    },
    {
      type: 'divider'
    },
    {
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    {
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    {
      type: 'divider'
    },
    {
      icon: Heading1,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 })
    },
    {
      icon: Heading3,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 })
    },
    {
      type: 'divider'
    },
    {
      icon: List,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList')
    },
    {
      icon: ListOrdered,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList')
    },
    {
      icon: Quote,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote')
    }
  ]

  return (
    <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/20">
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={index} className="w-px h-6 bg-border mx-1" />
        }

        const Icon = item.icon
        const isActive = item.isActive ? item.isActive() : false
        const canExecute = item.canExecute ? item.canExecute() : true

        return (
          <button
            key={index}
            onClick={item.action}
            disabled={!canExecute}
            title={item.title}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded hover:bg-muted transition-colors',
              isActive && 'bg-accent text-accent-foreground',
              !canExecute && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Icon size={16} />
          </button>
        )
      })}
    </div>
  )
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing..." }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4'
      }
    }
  })

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <div className="min-h-[200px]">
        <EditorContent 
          editor={editor} 
          className="prose max-w-none
            prose-headings:font-heading prose-headings:font-bold
            prose-h1:text-2xl prose-h1:mb-4
            prose-h2:text-xl prose-h2:mb-3
            prose-h3:text-lg prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-ul:text-muted-foreground prose-li:mb-1
            prose-ol:text-muted-foreground
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:rounded-r
            prose-strong:text-foreground
            prose-em:text-foreground
            focus-within:ring-2 focus-within:ring-accent/20"
        />
        {!editor?.getHTML() && (
          <p className="text-muted-foreground p-4 italic">{placeholder}</p>
        )}
      </div>
    </div>
  )
}