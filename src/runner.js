const fs = require('fs')
const path = require('path')
const execa = require('execa')

const cwd = process.cwd()
const pkg = fs.readFileSync(path.join(cwd, 'package.json'))

const hooks = JSON.parse(pkg).gitHooks
if (!hooks) {
  process.exit(0)
}

const hook = process.argv[2]

const command = hooks[hook]
if (!command) {
  process.exit(0)
}

console.log(` > running ${hook} hook: ${command}`)
try {
  var pid = execa(command, [],  { stdio: 'inherit', shell : true })
  pid.catch(e => { 
    console.error(e)
    process.exit(1) 
  })
} catch (e) {
  process.exit(1)
}
