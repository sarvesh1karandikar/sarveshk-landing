import { exampleNotes, runNoteCommand } from './note-example.js';
const form = document.querySelector('#note-demo-form');
const input = document.querySelector('#note-command');
const log = document.querySelector('#note-demo-log');
const reset = document.querySelector('#note-demo-reset');
let notes = [...exampleNotes];
const initial = log.cloneNode(true);
form.addEventListener('submit', event => {
  event.preventDefault();
  const command = input.value.trim();
  if (!command) return;
  document.querySelector('#demo-reset-status').textContent = '';
  const result = runNoteCommand(command, notes);
  notes = result.notes;
  const exchange = document.createElement('div');
  exchange.className = 'demo-exchange';
  for (const [speaker, text] of [['You', command], ['Assistant', result.response]]) {
    const label = document.createElement('p');
    label.className = 'demo-speaker';
    label.textContent = speaker;
    const message = document.createElement('p');
    message.className = 'demo-message';
    message.textContent = text;
    exchange.append(label, message);
  }
  log.append(exchange);
  // Keep a long local session from making the page unwieldy.
  while (log.children.length > 4) log.firstElementChild.remove();
  input.value = '';
  input.focus();
});
reset.addEventListener('click', () => {
  notes = [...exampleNotes];
  log.replaceChildren(...initial.cloneNode(true).childNodes);
  input.value = '/notes search session';
  document.querySelector('#demo-reset-status').textContent = 'Example reset to the fictional starting note.';
  input.focus();
});
form.querySelectorAll('input, button').forEach(control => { control.disabled = false; });
reset.disabled = false;
