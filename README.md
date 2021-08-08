# tau-utils
Various utility functions for Tau Prolog

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
