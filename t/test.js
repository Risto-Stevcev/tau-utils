const test = require('tape')
const pl = require('tau-prolog')

require('../tau-utils')(pl)
require('../lists')(pl)
require('../promises')(pl)

const run = async () => {
  const session = pl.create()

  try {
    await session.promiseConsult(`
      :- use_module(library(utils)).
      :- use_module(library(lists)).
    `)
    await session.promiseQuery("utils:read_string('[foo, bar]', X).")

    let result
    for await (let answer of session.promiseAnswers()) {
      result = session.format_answer(answer)
    }

    return result
  } catch (err) {
    console.error(pl.flatten_error(err))
  }

  return session
}

test('read_string/2', async function (t) {
  const answer = await run()
  t.equal(answer, 'X = [foo,bar].')
})
