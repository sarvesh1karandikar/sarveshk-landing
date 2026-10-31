import test from 'node:test';
import assert from 'node:assert/strict';
import { exampleDate, exampleNotes, runNoteCommand } from '../projects/note-example.js';
test('saving a note preserves the previous list and returns the source response', () => {
  const result = runNoteCommand('/note  A new observation  ', exampleNotes);
  assert.equal(result.response, `Noted on ${exampleDate}.`);
  assert.equal(result.notes[0].content, 'A new observation');
  assert.equal(exampleNotes.length, 1);
  assert.equal(runNoteCommand('/note', exampleNotes).response, 'Usage: /note <text>');
});
test('search uses fictional notes, with match and empty states', () => {
  assert.match(runNoteCommand('/notes search SESSION', exampleNotes).response, /Compare session recovery/);
  assert.equal(runNoteCommand('/notes search nonexistent', exampleNotes).response, 'No notes matching "nonexistent".');
  assert.equal(runNoteCommand('/notes', []).response, 'No notes yet. Use /note <text>.');
});
test('recent notes are bounded and unsupported commands do not mutate data', () => {
  const notes = Array.from({length: 12}, (_, n) => ({date: exampleDate, content: `note ${n}`}));
  assert.equal(runNoteCommand('/notes', notes).response.split('\n').length, 11);
  assert.strictEqual(runNoteCommand('/unknown', notes).notes, notes);
});
