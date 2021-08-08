var pl
;(function (pl) {
  var name = 'utils'

  var predicates = {
    'read_string/2': function (thread, point, atom) {
      var tokenizer = new pl.parser.tokenizer(thread)
      tokenizer.new_text(atom.args[0].id)
      var tokens = tokenizer.get_tokens()
      var expr = pl.parser.expression(
        thread,
        tokens,
        0,
        thread.__get_max_priority(),
        false
      )
      thread.prepend([
        new pl.type.State(
          point.goal.replace(new pl.type.Term('=', [expr.value, atom.args[1]])),
          point.substitution,
          point
        )
      ])
    }
  }

  // Export everything
  var exports = Object.keys(predicates)

  // DON'T EDIT
  if (typeof module !== 'undefined') {
    module.exports = function (tau_prolog) {
      pl = tau_prolog
      new pl.type.Module(name, predicates, exports)
    }
  } else {
    new pl.type.Module(name, predicates, exports)
  }
})(pl)
