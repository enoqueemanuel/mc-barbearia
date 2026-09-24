import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

// Carrega os módulos TypeScript puros sem iniciar Next ou chamar serviços externos.
const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const source = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, {
    exports,
    process: { env: {} },
    require: (name) => {
      assert.ok(name.startsWith('@/'), `Unexpected dependency: ${name}`);
      return load(name.slice(2) + '.ts');
    },
  }, { filename: absolute });
  return exports;
}
const { conversationReply: reply } = load('lib/chat/conversation.ts');
const history = [];
function say(text) {
  const result = reply(text, history);
  history.push({ role: 'user', content: text }, { role: 'assistant', content: result.content });
  return result;
}
assert.match(say('Oi, tudo bem?').content, /Oi!/);
assert.match(say('Quanto custa cortar cabelo?').content, /Corte: R\$ 30/);
assert.match(say('E demora quanto?').content, /40 min/);
assert.match(say('e a barba?').content, /Barba: R\$ 30/);
assert.match(say('e o valor?').content, /Barba: R\$ 30/);
assert.match(say('corte e barba').content, /Corte \+ Barba: R\$ 55/);
assert.match(say('demora quanto?').content, /60 min/);
say('com Matheus');
const booking = say('quero agendar');
assert.match(booking.content, /Corte \+ Barba com Matheus/);
assert.match(booking.content, /Ainda não tenho acesso aos horários livres/);
assert.equal(booking.cta.label, 'Ver Horários Disponíveis');
assert.match(booking.content, /Nenhuma reserva/);
assert.match(say('amanha as 14').content, /Nenhuma reserva/);
assert.match(say('não quero agendar').content, /tirar suas d/);
assert.match(say('qual o endereco e que horas fecha?').content, /Santa Maria/);
assert.match(history.at(-1).content, /horário informado/);
assert.match(say('aceita pix?').content, /não está confirmada/);
assert.match(say('quero remarcar').content, /Não consigo modificar reservas/);
assert.match(say('premium').content, /199/);
assert.match(say('qual valor?').content, /199/);
assert.match(say('obrigado').content, /Por nada/);
assert.match(reply('qual valor?', []).content, /qual serviço/);
assert.match(reply('marca de shampoo', []).content, /Não consegui entender/);
assert.match(reply('qual corte voce recomenda?', []).content, /manter o estilo/);
assert.match(reply('quais horarios disponiveis com Marco?', []).content, /Ainda não tenho acesso/);
assert.match(reply('quais dias disponiveis?', []).content, /Ainda não tenho acesso/);
console.log('PASS: contextual follow-ups, accents, combos, booking context, no fake reservation, negation, multiple questions, unknown facts, plans, reset context, keyword boundaries.');
