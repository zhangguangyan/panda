# panda
Tiny javascript subset interpreter writtern in typescript using acorn as parser

# reference
## [JS-Interpreter Reading Notes](https://github.com/NeilFraser/JS-Interpreter)
### Basic flow
1. In `Interpreter` constructor
   1. parses the interpretted source code at line of 23 `code = acorn.parse(code, Interpreter.PARSE_OPTIONS);` and at line of 32 `this.ast = ast;`(this seems not needed as it is overriden by line 53 `this.ast = acorn.parse(this.polyfills_.join('\n'), Interpreter.PARSE_OPTIONS);`
   2. parse polyfill code at line 53
   3. run polyfill code from line 55
   ```
   Interpreter.stripLocations_(this.ast, undefined, undefined);
   var state = new Interpreter.State(this.ast, this.globalScope);
   state.done = false;
   this.stateStack = [state];
   this.run();
   this.value = undefined
   ```
   4. re-points to interpretted code and configures statck for intepretted code from line 62
   ```
   this.ast = ast;
   var state = new Interpreter.State(this.ast, this.globalScope);
   state.done = false;
   this.stateStack.length = 0;
   this.stateStack[0] = state;
   // Preserve publicly properties from being pruned/renamed by JS compilers.
   // Add others as needed.
   this['stateStack'] = this.stateStack
   ```
2. Run the method `run()` of `Interpreter` at line 351
   1. run method `step()`
3. method `step` is where interpretation kicks off

### Questions
- `Interpreter.prototype.createScope`
