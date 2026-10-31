// Mirrors the public note/notes command responses, using fictional in-page data.
export const exampleDate = '2026-10-31';
export const exampleNotes = [{date: exampleDate, content: 'Compare session recovery approaches.'}];
export function runNoteCommand(command, notes, date = exampleDate) {
  const input = command.trim();
  if (/^\/note(?:\s|$)/.test(input)) {
    const text = input.slice(5).trim();
    if (!text) return { notes, response: 'Usage: /note <text>' };
    return { notes: [{date, content: text}, ...notes], response: `Noted on ${date}.` };
  }
  if (/^\/notes(?:\s|$)/.test(input)) {
    const args = input.slice(6).trim();
    if (args.startsWith('search ')) {
      const query = args.slice(7).trim();
      const rows = notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
      return { notes, response: rows.length ? `*Notes matching "${query}"*\n` + rows.map(note => `[${note.date}] ${note.content}`).join('\n') : `No notes matching "${query}".` };
    }
    return { notes, response: notes.length ? '*Your last 10 notes*\n' + notes.slice(0,10).map(note => `[${note.date}] ${note.content}`).join('\n') : 'No notes yet. Use /note <text>.' };
  }
  return { notes, response: 'Try /note <text>, /notes, or /notes search <query>.' };
}
