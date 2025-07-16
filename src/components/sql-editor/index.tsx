'use client'

import type { Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

import dynamic from 'next/dynamic'
import { useCallback, useRef } from 'react'

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
  const monacoRef = useRef<Monaco>(null)
  const themeMode = useThemeMode()

  const handleEditorWillMount = useCallback((monaco: Monaco) => {
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
  }, [])

  const handleEditorDidMount = useCallback(
    (_editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monacoRef.current = monaco
    },
    []
  )

  return (
    <MonacoEditor
      beforeMount={handleEditorWillMount}
      height={height}
      language="sql"
      onChange={onCodeChange}
      onMount={handleEditorDidMount}
      theme={themeMode === 'dark' ? 'vs-dark' : 'vs-light'}
      value={value}
    />
  )
}
