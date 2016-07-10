(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Brainfuck,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
    var cmd, i, len, marks, pos, results, stack;
    stack = [];
    marks = [];
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
    var c, code, cptr, dptr, results;
    code = arguments[0];
    dptr = cptr = 0;
    this._createBrancesMap(code);
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
          dptr++;
          break;
        case '<':
          dptr--;
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
          output.push(String.fromCharCode(this.mem[dptr]));
          break;
        case ',':
          c = input.shift();
          if (c instanceof string) {
            this.mem[dptr] = c.charCodeAt(0);
          }
      }
      results.push(cptr++);
    }
    return results;
  };

  return Brainfuck;

})();

module.exports = Brainfuck;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJyYWluZnVjay5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFNBQUE7RUFBQTs7QUFBTTtFQUNPLG1CQUFDLEdBQUQ7SUFBQyxJQUFDLENBQUEsb0JBQUQ7O0FBQU07V0FBTSxvQkFBTjtxQkFBQTtBQUFBOzs7OztFQUFQOztzQkFFWixpQkFBQSxHQUFtQixTQUFDLElBQUQ7QUFDbEIsUUFBQTtJQUFBLEtBQUEsR0FBTTtJQUFJLEtBQUEsR0FBTTtBQUNoQjtTQUFBLGtEQUFBOztNQUNDLElBQUcsR0FBQSxLQUFPLEdBQVY7UUFBbUIsS0FBSyxDQUFDLElBQU4sQ0FBVyxHQUFYLEVBQW5COztNQUNBLElBQUcsR0FBQSxLQUFPLEdBQVY7cUJBQW1CLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxHQUFBLENBQVAsR0FBYyxLQUFLLENBQUMsR0FBTixDQUFBLENBQWQsQ0FBUCxHQUFrQyxLQUFyRDtPQUFBLE1BQUE7NkJBQUE7O0FBRkQ7O0VBRmtCOztzQkFNbkIsT0FBQSxHQUFLLFNBQUE7QUFDSixRQUFBO0lBREs7SUFDTCxJQUFBLEdBQUssSUFBQSxHQUFLO0lBQ1YsSUFBQyxDQUFBLGlCQUFELENBQW1CLElBQW5CO0FBQ0E7V0FBTSxJQUFBLEdBQU8sSUFBSSxDQUFDLE1BQWxCO0FBQ0MsY0FBTyxJQUFLLENBQUEsSUFBQSxDQUFaO0FBQUEsYUFDTSxHQUROO1VBQ2UsSUFBQyxDQUFBLEdBQUksQ0FBQSxJQUFBLENBQUwsR0FBYSxJQUFDLENBQUEsR0FBSSxDQUFBLElBQUEsQ0FBTCxHQUFhLENBQWIsSUFBa0I7QUFBeEM7QUFETixhQUVNLEdBRk47VUFFZSxJQUFDLENBQUEsR0FBSSxDQUFBLElBQUEsQ0FBTCxHQUFhLElBQUMsQ0FBQSxHQUFJLENBQUEsSUFBQSxDQUFMLEdBQWEsQ0FBYixJQUFrQjtBQUF4QztBQUZOLGFBR00sR0FITjtVQUdlLElBQUE7QUFBVDtBQUhOLGFBSU0sR0FKTjtVQUllLElBQUE7QUFBVDtBQUpOLGFBS00sR0FMTjtVQUtlLElBQXVCLElBQUMsQ0FBQSxHQUFJLENBQUEsSUFBQSxDQUFMLEtBQWMsQ0FBckM7WUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFBLEVBQWQ7O0FBQVQ7QUFMTixhQU1NLEdBTk47VUFNZSxJQUF1QixJQUFDLENBQUEsR0FBSSxDQUFBLElBQUEsQ0FBTCxLQUFpQixDQUF4QztZQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBTSxDQUFBLElBQUEsRUFBZDs7QUFBVDtBQU5OLGFBT00sR0FQTjtVQU9lLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBTSxDQUFDLFlBQVAsQ0FBb0IsSUFBQyxDQUFBLEdBQUksQ0FBQSxJQUFBLENBQXpCLENBQVo7QUFBVDtBQVBOLGFBUU0sR0FSTjtVQVFlLENBQUEsR0FBRSxLQUFLLENBQUMsS0FBTixDQUFBO1VBQWUsSUFBZ0MsQ0FBQSxZQUFhLE1BQTdDO1lBQUEsSUFBQyxDQUFBLEdBQUksQ0FBQSxJQUFBLENBQUwsR0FBYSxDQUFDLENBQUMsVUFBRixDQUFhLENBQWIsRUFBYjs7QUFSaEM7bUJBU0EsSUFBQTtJQVZELENBQUE7O0VBSEk7Ozs7OztBQWVOLE1BQU0sQ0FBQyxPQUFQLEdBQWUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQnJhaW5mdWNrXHJcblx0Y29uc3RydWN0b3I6KEBtZW09KDAgZm9yIFsxLi4xMDBdKSktPlxyXG5cdFx0XHJcblx0X2NyZWF0ZUJyYW5jZXNNYXA6IChjb2RlKT0+XHJcblx0XHRzdGFjaz1bXTsgbWFya3M9W11cclxuXHRcdGZvciBjbWQsIHBvcyBpbiBjb2RlXHJcblx0XHRcdGlmIGNtZCBpcyAnWycgdGhlbiBzdGFjay5wdXNoKHBvcylcclxuXHRcdFx0aWYgY21kIGlzICddJyB0aGVuIEBtYXJrc1tAbWFya3NbcG9zXSA9IHN0YWNrLnBvcCgpXT1wb3MgIFxyXG5cclxuXHRldmFsOihjb2RlLCAuLi4pPT5cclxuXHRcdGRwdHI9Y3B0cj0wXHJcblx0XHRAX2NyZWF0ZUJyYW5jZXNNYXAgY29kZVxyXG5cdFx0d2hpbGUgY3B0ciA8IGNvZGUubGVuZ3RoXHJcblx0XHRcdHN3aXRjaCBjb2RlW2NwdHJdXHJcblx0XHRcdFx0d2hlbiAnKycgdGhlbiBAbWVtW2RwdHJdID0gQG1lbVtkcHRyXSArIDEgb3IgMVxyXG5cdFx0XHRcdHdoZW4gJy0nIHRoZW4gQG1lbVtkcHRyXSA9IEBtZW1bZHB0cl0gLSAxIG9yIDBcclxuXHRcdFx0XHR3aGVuICc+JyB0aGVuIGRwdHIrK1xyXG5cdFx0XHRcdHdoZW4gJzwnIHRoZW4gZHB0ci0tXHJcblx0XHRcdFx0d2hlbiAnWycgdGhlbiBjcHRyID0gQG1hcmtzW2NwdHJdIGlmIEBtZW1bZHB0cl0gaXMgMFxyXG5cdFx0XHRcdHdoZW4gJ10nIHRoZW4gY3B0ciA9IEBtYXJrc1tjcHRyXSBpZiBAbWVtW2RwdHJdIGlzbnQgIDBcclxuXHRcdFx0XHR3aGVuICcuJyB0aGVuIG91dHB1dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoQG1lbVtkcHRyXSkpXHJcblx0XHRcdFx0d2hlbiAnLCcgdGhlbiBjPWlucHV0LnNoaWZ0KCk7IEBtZW1bZHB0cl0gPSBjLmNoYXJDb2RlQXQoMCkgaWYgYyBpbnN0YW5jZW9mIHN0cmluZ1xyXG5cdFx0XHRjcHRyKytcclxuXHJcbm1vZHVsZS5leHBvcnRzPUJyYWluZnVjayJdfQ==
