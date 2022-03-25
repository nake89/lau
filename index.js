const exec = require('child_process').execSync
const args = process.argv.slice(2)

if (!args[0]) {
  console.error('No arguments passed')
} else {
  exec(`mkdir ${args[0]};cd ${args[0]};npm init -y; git init`)
  if (args[1]) {
    exec(`cd ${args[0]}; npm install ${args[1]}`)
  }
}
