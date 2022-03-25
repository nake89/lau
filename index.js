#!/usr/bin/env node
const exec = require('child_process').execSync
const args = process.argv.slice(2)
const fs = require('fs')

if (!args[0]) {
  console.error('No arguments passed')
} else {
  exec(`mkdir ${args[0]};cd ${args[0]};npm init -y; git init`)
  if (args[1]) {
    const modulesArray = args.splice(1)
    const modules = modulesArray.join(' ')
    exec(`cd ${args[0]}; npm install ${modules}`)
    let arr = []
    for (let module of modulesArray) {
      let moduleVarName = getModuleVarName(module)
      let start = `const ${moduleVarName} = require('${module}')`
      arr.push(start)
    }
    fs.writeFileSync(`${args[0]}/index.js`, arr.join('\n'))
    //exec(`cd ${args[0]}; touch index.js`)
  }
}
function camelize(str) {
  str = str.replace('-', ' ')
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

function getModuleVarName(moduleName) {
  if (/-/.test(moduleName)) {
    return camelize(moduleName)
  } else {
    return moduleName
  }
}
