Probably the smallest Brainfuck interpreter (if you know a smaller one, please let me know it).

##Examples

+ **Adds two numbers** - in the code fragment it is 5 + 8 and return 13 
```javascript
new Brainfuck().eval(',>,[<+>-]<.', (->[5, 8][i++]), (result)->console.log(result))
```

+ **Comments** - nothing happens, everything is ignored
```javascript
new Brainfuck() bf.eval('This is my cat') 
```

+ **The 'Hello World!'** - just prints 'Hello World!'
```javascript
new Brainfuck().eval('''>+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[
   <++++>-]<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.''', 
   null), 
   (result)->console.log(String.fromCharCode(result)))
```
