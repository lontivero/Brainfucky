class Brainfuck
	constructor:(@mem=(0 for [1..100]))->
		
	_createBrancesMap: (code)=>
		stack=[]; @marks=[]
		for cmd, pos in code
			if cmd is '[' then stack.push(pos)
			if cmd is ']'
				if stack.length 
					@marks[@marks[pos] = stack.pop()]=pos 
				else
					throw new Error("Invalid close loop at #{pos}")
		if stack.length then throw new Error("Invalid open loop at #{stack.pop()}")

	eval:(code, args...)=>
		dptr=cptr=0
		@_createBrancesMap code
		input = args[0] or (->throw new Error('Input required'))
		output= args[1] or (->)
		while cptr < code.length
			switch code[cptr]
				when '+' then @mem[dptr] = @mem[dptr] + 1 or 1
				when '-' then @mem[dptr] = @mem[dptr] - 1 or 0
				when '>' then (dptr++ < @mem.length) or throw new Error("Invalid pointer #{dptr}")
				when '<' then (dptr-- > 0 ) or throw new Error("Invalid pointer #{dptr}")
				when '[' then cptr = @marks[cptr] if @mem[dptr] is 0
				when ']' then cptr = @marks[cptr] if @mem[dptr] isnt  0
				when '.' then output(@mem[dptr])
				when ',' then @mem[dptr] = input()
			cptr++

module.exports=Brainfuck