import type { ReactNode } from 'react'

import { type Editor, PluginKey } from '@acme/editor'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodo,
  Quote,
  Code2,
} from '@acme/ui/icon'
import Command from '@acme/ui/components/command'
import KeyboardShortcut from '@acme/ui/components/keyboard-shortcut'

import { SuggestionRoot, SuggestionItem } from './suggestions'

type CommandItemProps = {
  title: string
  searchTerms?: string[]
  icon?: ReactNode
  command?: (props: CommandProps) => void
  kbd?: string
  type?: 'command' | 'separator'
}

type CommandProps = {
  editor: Editor
  range: Range
}

const COMMANDS: CommandItemProps[] = [
  {
    title: 'Heading 1',
    searchTerms: ['title'],
    icon: <Heading1Icon className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run()
    },
  },
  {
    title: 'Heading 2',
    searchTerms: ['subtitle'],
    icon: <Heading2Icon className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run()
    },
  },
  {
    title: 'Heading 3',
    searchTerms: ['subtitle'],
    icon: <Heading3Icon className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run()
    },
  },
  {
    type: 'separator',
    title: 'Headings Separator',
  },
  {
    title: 'Bullet List',
    searchTerms: ['unordered'],
    icon: <ListIcon className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleList('bulletList', 'listItem')
        .run()
    },
  },
  {
    title: 'Numbered List',
    searchTerms: ['ordered'],
    icon: <ListOrderedIcon className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleList('orderedList', 'listItem')
        .run()
    },
  },
  {
    title: 'To-do List',
    searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
    icon: <ListTodo className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleList('taskList', 'taskItem')
        .run()
    },
  },
  {
    type: 'separator',
    title: 'Lists Separator',
  },
  {
    title: 'Quote',
    searchTerms: ['blockquote'],
    icon: <Quote className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).toggleWrap('blockquote').run(),
  },
  {
    title: 'Code',
    searchTerms: ['codeblock'],
    icon: <Code2 className='h-4 w-4' />,
    command: ({ editor, range }: CommandProps) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('codeBlock', 'paragraph')
        .run(),
  },
]

type SlashCommandProps = {
  editor: Editor
}

const pluginKey = new PluginKey('slashCommand')

export default function SlashCommand({ editor }: SlashCommandProps) {
  return (
    <SuggestionRoot char='/' editor={editor} pluginKey={pluginKey}>
      {COMMANDS.map((item) => {
        if (item.type === 'separator') {
          return (
            <Command.Separator
              className='my-1 h-px bg-border'
              key={item.title}
            />
          )
        }
        return (
          <SuggestionItem
            editor={editor}
            key={item.title}
            keywords={item.searchTerms}
            onSelect={({ editor: editorInstance, range }) => {
              if (item.command instanceof Function) {
                item.command({ editor: editorInstance, range })
              }
            }}
            value={item.title}
          >
            <div className='-ml-1 flex h-6 w-6 items-center justify-center text-muted-foreground'>
              {item.icon}
            </div>
            <span className='flex-1 pr-4 text-left text-sm'>{item.title}</span>
            {item.kbd && <KeyboardShortcut shortcut={item.kbd} />}
          </SuggestionItem>
        )
      })}
    </SuggestionRoot>
  )
}
