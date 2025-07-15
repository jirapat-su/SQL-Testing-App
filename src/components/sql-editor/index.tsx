'use client'

import { useMonaco } from '@monaco-editor/react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { useThemeMode } from '@/src/hooks/useThemeMode'

import { createMySQLKeywords } from './mysql-keywords'
import { mysqlSnippets } from './mysql-snippets'

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(module => module.default),
  {
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading editor...
      </div>
    ),
    ssr: false,
  }
)

type SqlEditorProps = {
  height?: string
  onCodeChange?: (value: string | undefined) => void
  value?: string
}

export default function SqlEditor({
  height = '100%',
  onCodeChange,
  value,
}: SqlEditorProps) {
  const themeMode = useThemeMode()
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) return

    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          endColumn: word.endColumn,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          startLineNumber: position.lineNumber,
        }

        const keywords = createMySQLKeywords(monaco, range)

        const snippetSuggestions = mysqlSnippets.map(snippet => ({
          detail: snippet.description,
          insertText: Array.isArray(snippet.body)
            ? snippet.body.join('\n')
            : snippet.body,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          kind: monaco.languages.CompletionItemKind.Snippet,
          label: snippet.label,
          range,
        }))

        const suggestions = [...keywords, ...snippetSuggestions]

        return { suggestions }
      },
    })
  }, [monaco])

  if (!monaco) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading editor...
      </div>
    )
  }

  return (
    <MonacoEditor
      height={height}
      language="sql"
      onChange={onCodeChange}
      theme={themeMode === 'dark' ? 'vs-dark' : 'vs-light'}
      value={value}
    />
  )
}
