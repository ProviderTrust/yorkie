const fs = require('fs')
const path = require('path')
const execa = require('execa')

const cwd = process.cwd()
const pkg = fs.readFileSync(path.join(cwd, 'package.json'))
//const pkg = fs.readFileSync(path.join('/Users/smiller/repos/vendorproof-ui', 'package.json'))

console.log('---------')
console.log(JSON.parse(pkg))
console.log('---------')

const hooks = JSON.parse(pkg).gitHooks
if (!hooks) {
  process.exit(0)
}

console.log('---------')
console.log(hooks)
console.log('---------')

const hook = process.argv[2]

console.log('---------')
console.log(hook)
console.log('---------')

const command = hooks[hook]
if (!command) {
  process.exit(0)
}

console.log(` > running ${hook} hook: ${command}`)
try {
  var pid = execa(command, [],  { stdio: 'inherit', shell : true })
  pid.catch(e => { 
    console.log('a problem')
    console.log(e)
    process.exit(1) 
  })
} catch (e) {
  console.log('new problem')
  process.exit(1)
}
