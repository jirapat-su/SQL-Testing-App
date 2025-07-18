import type { Monaco } from '@monaco-editor/react'

type Range = {
  endColumn: number
  endLineNumber: number
  startColumn: number
  startLineNumber: number
}

export const createMySQLKeywords = (monaco: Monaco, range: Range) => {
  return [
    {
      detail: 'SQL SELECT statement',
      insertText: 'SELECT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'SELECT',
      range,
    },
    {
      detail: 'SQL FROM clause',
      insertText: 'FROM',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'FROM',
      range,
    },
    {
      detail: 'SQL WHERE clause',
      insertText: 'WHERE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'WHERE',
      range,
    },
    {
      detail: 'SQL JOIN clause',
      insertText: 'JOIN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'JOIN',
      range,
    },
    {
      detail: 'SQL INNER JOIN',
      insertText: 'INNER JOIN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'INNER JOIN',
      range,
    },
    {
      detail: 'SQL LEFT JOIN',
      insertText: 'LEFT JOIN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'LEFT JOIN',
      range,
    },
    {
      detail: 'SQL RIGHT JOIN',
      insertText: 'RIGHT JOIN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'RIGHT JOIN',
      range,
    },
    {
      detail: 'SQL FULL JOIN',
      insertText: 'FULL JOIN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'FULL JOIN',
      range,
    },
    {
      detail: 'SQL GROUP BY clause',
      insertText: 'GROUP BY',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'GROUP BY',
      range,
    },
    {
      detail: 'SQL ORDER BY clause',
      insertText: 'ORDER BY',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'ORDER BY',
      range,
    },
    {
      detail: 'SQL HAVING clause',
      insertText: 'HAVING',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'HAVING',
      range,
    },
    {
      detail: 'SQL INSERT statement',
      insertText: 'INSERT INTO',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'INSERT INTO',
      range,
    },
    {
      detail: 'SQL UPDATE statement',
      insertText: 'UPDATE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'UPDATE',
      range,
    },
    {
      detail: 'SQL DELETE statement',
      insertText: 'DELETE FROM',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'DELETE FROM',
      range,
    },
    {
      detail: 'SQL CREATE TABLE',
      insertText: 'CREATE TABLE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'CREATE TABLE',
      range,
    },
    {
      detail: 'SQL ALTER TABLE',
      insertText: 'ALTER TABLE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'ALTER TABLE',
      range,
    },
    {
      detail: 'SQL DROP TABLE',
      insertText: 'DROP TABLE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'DROP TABLE',
      range,
    },
    {
      detail: 'SQL CREATE INDEX',
      insertText: 'CREATE INDEX',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'CREATE INDEX',
      range,
    },
    {
      detail: 'SQL LIMIT clause',
      insertText: 'LIMIT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'LIMIT',
      range,
    },
    {
      detail: 'SQL OFFSET clause',
      insertText: 'OFFSET',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'OFFSET',
      range,
    },
    {
      detail: 'SQL UNION operator',
      insertText: 'UNION',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'UNION',
      range,
    },
    {
      detail: 'SQL CASE statement',
      insertText: 'CASE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'CASE',
      range,
    },
    {
      detail: 'SQL WHEN clause',
      insertText: 'WHEN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'WHEN',
      range,
    },
    {
      detail: 'SQL THEN clause',
      insertText: 'THEN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'THEN',
      range,
    },
    {
      detail: 'SQL ELSE clause',
      insertText: 'ELSE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'ELSE',
      range,
    },
    {
      detail: 'SQL END clause',
      insertText: 'END',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'END',
      range,
    },
    {
      detail: 'SQL ON clause',
      insertText: 'ON',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'ON',
      range,
    },
    {
      detail: 'SQL AS keyword',
      insertText: 'AS',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'AS',
      range,
    },
    {
      detail: 'SQL DISTINCT keyword',
      insertText: 'DISTINCT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'DISTINCT',
      range,
    },
    {
      detail: 'SQL EXISTS keyword',
      insertText: 'EXISTS',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'EXISTS',
      range,
    },
    {
      detail: 'SQL IN operator',
      insertText: 'IN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'IN',
      range,
    },
    {
      detail: 'SQL NOT IN operator',
      insertText: 'NOT IN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'NOT IN',
      range,
    },
    {
      detail: 'SQL LIKE operator',
      insertText: 'LIKE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'LIKE',
      range,
    },
    {
      detail: 'SQL BETWEEN operator',
      insertText: 'BETWEEN',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'BETWEEN',
      range,
    },
    {
      detail: 'SQL AND operator',
      insertText: 'AND',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'AND',
      range,
    },
    {
      detail: 'SQL OR operator',
      insertText: 'OR',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'OR',
      range,
    },
    {
      detail: 'SQL NOT operator',
      insertText: 'NOT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'NOT',
      range,
    },
    {
      detail: 'SQL IS NULL',
      insertText: 'IS NULL',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'IS NULL',
      range,
    },
    {
      detail: 'SQL IS NOT NULL',
      insertText: 'IS NOT NULL',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'IS NOT NULL',
      range,
    },
    {
      detail: 'SQL ASC sorting',
      insertText: 'ASC',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'ASC',
      range,
    },
    {
      detail: 'SQL DESC sorting',
      insertText: 'DESC',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'DESC',
      range,
    },
    // MySQL Data Types
    {
      detail: 'MySQL VARCHAR data type',
      insertText: 'VARCHAR',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'VARCHAR',
      range,
    },
    {
      detail: 'MySQL INT data type',
      insertText: 'INT',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'INT',
      range,
    },
    {
      detail: 'MySQL BIGINT data type',
      insertText: 'BIGINT',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'BIGINT',
      range,
    },
    {
      detail: 'MySQL TEXT data type',
      insertText: 'TEXT',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'TEXT',
      range,
    },
    {
      detail: 'MySQL LONGTEXT data type',
      insertText: 'LONGTEXT',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'LONGTEXT',
      range,
    },
    {
      detail: 'MySQL DATETIME data type',
      insertText: 'DATETIME',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'DATETIME',
      range,
    },
    {
      detail: 'MySQL TIMESTAMP data type',
      insertText: 'TIMESTAMP',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'TIMESTAMP',
      range,
    },
    {
      detail: 'MySQL DATE data type',
      insertText: 'DATE',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'DATE',
      range,
    },
    {
      detail: 'MySQL TIME data type',
      insertText: 'TIME',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'TIME',
      range,
    },
    {
      detail: 'MySQL DECIMAL data type',
      insertText: 'DECIMAL',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'DECIMAL',
      range,
    },
    {
      detail: 'MySQL FLOAT data type',
      insertText: 'FLOAT',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'FLOAT',
      range,
    },
    {
      detail: 'MySQL DOUBLE data type',
      insertText: 'DOUBLE',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'DOUBLE',
      range,
    },
    {
      detail: 'MySQL BOOLEAN data type',
      insertText: 'BOOLEAN',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'BOOLEAN',
      range,
    },
    {
      detail: 'MySQL JSON data type',
      insertText: 'JSON',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'JSON',
      range,
    },
    {
      detail: 'MySQL ENUM data type',
      insertText: 'ENUM',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'ENUM',
      range,
    },
    {
      detail: 'MySQL SET data type',
      insertText: 'SET',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'SET',
      range,
    },
    {
      detail: 'MySQL BLOB data type',
      insertText: 'BLOB',
      kind: monaco.languages.CompletionItemKind.TypeParameter,
      label: 'BLOB',
      range,
    },
    // MySQL Constraints
    {
      detail: 'Primary key constraint',
      insertText: 'PRIMARY KEY',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'PRIMARY KEY',
      range,
    },
    {
      detail: 'Foreign key constraint',
      insertText: 'FOREIGN KEY',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'FOREIGN KEY',
      range,
    },
    {
      detail: 'Unique constraint',
      insertText: 'UNIQUE',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'UNIQUE',
      range,
    },
    {
      detail: 'Not null constraint',
      insertText: 'NOT NULL',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'NOT NULL',
      range,
    },
    {
      detail: 'Auto increment',
      insertText: 'AUTO_INCREMENT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'AUTO_INCREMENT',
      range,
    },
    {
      detail: 'Default value',
      insertText: 'DEFAULT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'DEFAULT',
      range,
    },
    {
      detail: 'Check constraint',
      insertText: 'CHECK',
      kind: monaco.languages.CompletionItemKind.Keyword,
      label: 'CHECK',
      range,
    },
    // MySQL Functions
    {
      detail: 'Current timestamp',
      insertText: 'NOW()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'NOW()',
      range,
    },
    {
      detail: 'Current timestamp',
      insertText: 'CURRENT_TIMESTAMP',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'CURRENT_TIMESTAMP',
      range,
    },
    {
      detail: 'Current date',
      insertText: 'CURDATE()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'CURDATE()',
      range,
    },
    {
      detail: 'Current time',
      insertText: 'CURTIME()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'CURTIME()',
      range,
    },
    {
      detail: 'Count function',
      insertText: 'COUNT()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'COUNT()',
      range,
    },
    {
      detail: 'Sum function',
      insertText: 'SUM()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'SUM()',
      range,
    },
    {
      detail: 'Average function',
      insertText: 'AVG()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'AVG()',
      range,
    },
    {
      detail: 'Maximum function',
      insertText: 'MAX()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'MAX()',
      range,
    },
    {
      detail: 'Minimum function',
      insertText: 'MIN()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'MIN()',
      range,
    },
    {
      detail: 'Concatenate function',
      insertText: 'CONCAT()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'CONCAT()',
      range,
    },
    {
      detail: 'Length function',
      insertText: 'LENGTH()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'LENGTH()',
      range,
    },
    {
      detail: 'Upper case function',
      insertText: 'UPPER()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'UPPER()',
      range,
    },
    {
      detail: 'Lower case function',
      insertText: 'LOWER()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'LOWER()',
      range,
    },
    {
      detail: 'Substring function',
      insertText: 'SUBSTRING()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'SUBSTRING()',
      range,
    },
    {
      detail: 'Replace function',
      insertText: 'REPLACE()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'REPLACE()',
      range,
    },
    {
      detail: 'Trim function',
      insertText: 'TRIM()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'TRIM()',
      range,
    },
    {
      detail: 'Round function',
      insertText: 'ROUND()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'ROUND()',
      range,
    },
    {
      detail: 'Ceiling function',
      insertText: 'CEIL()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'CEIL()',
      range,
    },
    {
      detail: 'Floor function',
      insertText: 'FLOOR()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'FLOOR()',
      range,
    },
    {
      detail: 'Absolute value function',
      insertText: 'ABS()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'ABS()',
      range,
    },
    {
      detail: 'If null function',
      insertText: 'IFNULL()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'IFNULL()',
      range,
    },
    {
      detail: 'Coalesce function',
      insertText: 'COALESCE()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'COALESCE()',
      range,
    },
    {
      detail: 'Date format function',
      insertText: 'DATE_FORMAT()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'DATE_FORMAT()',
      range,
    },
    {
      detail: 'Date add function',
      insertText: 'DATE_ADD()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'DATE_ADD()',
      range,
    },
    {
      detail: 'Date sub function',
      insertText: 'DATE_SUB()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'DATE_SUB()',
      range,
    },
    {
      detail: 'Date difference function',
      insertText: 'DATEDIFF()',
      kind: monaco.languages.CompletionItemKind.Function,
      label: 'DATEDIFF()',
      range,
    },
    // Table names (you can customize these)
    {
      detail: 'Users table',
      insertText: 'users',
      kind: monaco.languages.CompletionItemKind.Class,
      label: 'users',
      range,
    },
    {
      detail: 'Orders table',
      insertText: 'orders',
      kind: monaco.languages.CompletionItemKind.Class,
      label: 'orders',
      range,
    },
    {
      detail: 'Products table',
      insertText: 'products',
      kind: monaco.languages.CompletionItemKind.Class,
      label: 'products',
      range,
    },
    // Common column names
    {
      detail: 'ID column',
      insertText: 'id',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'id',
      range,
    },
    {
      detail: 'Created timestamp',
      insertText: 'created_at',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'created_at',
      range,
    },
    {
      detail: 'Updated timestamp',
      insertText: 'updated_at',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'updated_at',
      range,
    },
    {
      detail: 'Deleted timestamp',
      insertText: 'deleted_at',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'deleted_at',
      range,
    },
    {
      detail: 'Name column',
      insertText: 'name',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'name',
      range,
    },
    {
      detail: 'Email column',
      insertText: 'email',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'email',
      range,
    },
    {
      detail: 'Status column',
      insertText: 'status',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'status',
      range,
    },
    {
      detail: 'Price column',
      insertText: 'price',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'price',
      range,
    },
    {
      detail: 'Description column',
      insertText: 'description',
      kind: monaco.languages.CompletionItemKind.Field,
      label: 'description',
      range,
    },
  ]
}
