require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"brainfuck":[function(require,module,exports){
var Brainfuck,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice;

Brainfuck = (function() {
  function Brainfuck(mem) {
    this.mem = mem != null ? mem : (function() {
      var i, results;
      results = [];
      for (i = 1; i <= 100; i++) {
        results.push(0);
      }
      return results;
    })();
    this["eval"] = bind(this["eval"], this);
    this._createBrancesMap = bind(this._createBrancesMap, this);
  }

  Brainfuck.prototype._createBrancesMap = function(code) {
    var cmd, i, len, pos, results, stack;
    stack = [];
    this.marks = [];
    results = [];
    for (pos = i = 0, len = code.length; i < len; pos = ++i) {
      cmd = code[pos];
      if (cmd === '[') {
        stack.push(pos);
      }
      if (cmd === ']') {
        results.push(this.marks[this.marks[pos] = stack.pop()] = pos);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Brainfuck.prototype["eval"] = function() {
    var args, code, cptr, dptr, input, output, results;
    code = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    dptr = cptr = 0;
    this._createBrancesMap(code);
    input = args[0] || (function() {
      throw new Error('Input required');
    });
    output = args[1] || (function() {});
    results = [];
    while (cptr < code.length) {
      switch (code[cptr]) {
        case '+':
          this.mem[dptr] = this.mem[dptr] + 1 || 1;
          break;
        case '-':
          this.mem[dptr] = this.mem[dptr] - 1 || 0;
          break;
        case '>':
          (dptr++ < this.mem.length) || (function() {
            throw new Error("Invalid pointer " + dptr);
          })();
          break;
        case '<':
          (dptr-- > 0) || (function() {
            throw new Error("Invalid pointer " + dptr);
          })();
          break;
        case '[':
          if (this.mem[dptr] === 0) {
            cptr = this.marks[cptr];
          }
          break;
        case ']':
          if (this.mem[dptr] !== 0) {
            cptr = this.marks[cptr];
          }
          break;
        case '.':
          output(this.mem[dptr]);
          break;
        case ',':
          this.mem[dptr] = input();
      }
      results.push(cptr++);
    }
    return results;
  };

  return Brainfuck;

})();

module.exports = Brainfuck;


},{}]},{},[]);
