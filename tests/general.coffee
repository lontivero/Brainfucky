chai = require('chai')
expect = chai.expect
Brainfuck = require('./../src/brainfuck')

describe 'General test', ->
	it '+++ should add 3 to current cell', ->
		bf = new Brainfuck()
		bf.eval('+++')
		expect(bf.mem[0]).to.equal(3)
		
	it '--- should substract 3 to current cell', ->
		bf = new Brainfuck()
		bf.eval('---')
		expect(bf.mem[0]).to.equal(-3)

	it '>+++ should add 3 to the next cell', ->
		bf = new Brainfuck()
		bf.eval('>+++')
		expect(bf.mem[1]).to.equal(3)
		
	it '>--- should substract 3 to the next cell', ->
		bf = new Brainfuck()
		bf.eval('>---')
		expect(bf.mem[1]).to.equal(-3)

	it '< should fail if currently in cell 0', ->
		bf = new Brainfuck()
		expect(->bf.eval('<')).to.throw('Invalid pointer -1')

	it '>< should not fail', ->
		bf = new Brainfuck()
		expect(->bf.eval('><')).not.to.throw('Invalid pointer operation < 0')

	it '[ should fail if not closed', ->
		bf = new Brainfuck()
		expect(->bf.eval('this has to fail [')).to.throw('Invalid open loop at 17')

	it '] should fail if not closed', ->
		bf = new Brainfuck()
		expect(->bf.eval('this ] has to fail')).to.throw('Invalid close loop at 5')
		
	it '>>> should not fail with memory [0, 0, 0]', ->
		bf = new Brainfuck([0,0,0])
		expect(->bf.eval('>>>')).not.to.throw('Invalid pointer operation < 0')

	it '>>> should not fail with memory [0, 0]', ->
		bf = new Brainfuck([0,0])
		expect(->bf.eval('>>>')).to.throw('Invalid pointer 3')
		
	it '++++[>+<-] should move the four in cell 0 to cell 1', ->
		bf = new Brainfuck()
		bf.eval('++++[>+<-]')
		expect(bf.mem[0]).to.equal(0)
		expect(bf.mem[1]).to.equal(4)

	it ',>,<[>+<-]>. should sum two inputs', ->
		i=0
		bf = new Brainfuck()
		bf.eval(',>,<[>+<-]>.',
			(->[5, 8][i++]), 
			(result)->expect(result).to.equal(13))

	it ',>,[-<+>]<. should sum two inputs', ->
		i=0
		bf = new Brainfuck()
		bf.eval(',>,[-<+>]<.',
			(->[5, 8][i++]), 
			(result)->expect(result).to.equal(13))

	it ',>,[<+>-]<. should sum two inputs', ->
		i=0
		bf = new Brainfuck()
		bf.eval(',>,[<+>-]<.', 
			(->[5, 8][i++]), 
			(result)->expect(result).to.equal(13))

			
	it '"This is my cat" is a comment ', ->
		bf = new Brainfuck()
		bf.eval('This is my cat') 
		
		
	it 'should compute "Hello world"', ->
		i=0
		bf = new Brainfuck()
		bf.eval('''>+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[
				   <++++>-]<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.''', 
			(->), 
			(result)->expect(String.fromCharCode(result)).to.equal("Hello World!"[i++]))
		
