export const checkSelectQuery = (sqlCommand: unknown) => {
  if (!sqlCommand || typeof sqlCommand !== 'string') {
    return false
  }

  // Remove comments and normalize whitespace
  const cleanedSql = sqlCommand
    // Remove single-line comments (-- comment)
    .replace(/--.*$/gm, '')
    // Remove multi-line comments (/* comment */)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Normalize whitespace and newlines
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

  if (!cleanedSql) return false

  // Check if it's a direct SELECT
  if (cleanedSql.startsWith('select')) {
    return true
  }

  // Check for Common Table Expressions (WITH ... SELECT)
  if (cleanedSql.startsWith('with') && /\bselect\b/.test(cleanedSql)) {
    return true
  }

  // Check for variable declarations followed by SELECT
  // Patterns: DECLARE @var ...; SELECT or SET @var = ...; SELECT
  const variablePattern =
    /^(?:declare\s+@\w+|set\s+@\w+\s*=)[^;]{0,1000};\s*select\b/

  if (variablePattern.test(cleanedSql)) {
    return true
  }

  // Check for multiple statements where the main query is SELECT
  // Split by semicolon and check if any significant statement is SELECT
  const statements = cleanedSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s)
  const mainStatement = statements.find(
    stmt =>
      !stmt.startsWith('declare') && !stmt.startsWith('set') && stmt.length > 0
  )

  if (
    mainStatement &&
    (mainStatement.startsWith('select') || mainStatement.startsWith('with'))
  ) {
    return true
  }

  return false
}
