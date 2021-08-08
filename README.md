# tau-utils
Various utility functions for Tau Prolog

## Usage

The library is browser and nodejs compatible
To use it with node:

``` javascript
const pl = require('tau-prolog')
require('../tau-utils')(pl)
// Get a nodejs compatible bundle with promises.js from tau-prolog.org/downloads
require('../promises')(pl)

const run = async () => {
  const session = pl.create()

  try {
    await session.promiseConsult(`
      :- use_module(library(utils)).
    `)
    await session.promiseQuery("utils:read_string('[foo, bar]', X).")

    let result
    for await (let answer of session.promiseAnswers()) {
      result = session.format_answer(answer)
    }
  } catch (err) {
    console.error(pl.flatten_error(err))
  }
}
```

See tests for more examples


## Predicates

### read_string/2

Reads a string as a prolog term


``` prolog
?- utils:read_string('[foo, bar]', X).
X = [foo,bar].
```

To provide somewhat similar compatibility to other prolog implementations such as [SWI
Prolog](https://www.swi-prolog.org/pldoc/man?section=string), set the `double_quotes` directive to `atom`:

``` prolog
:- set_prolog_flag(double_quotes, atom).
?- utils:read_string("[foo, bar]", X).
X = [foo,bar].
```

## License

See LICENSE
