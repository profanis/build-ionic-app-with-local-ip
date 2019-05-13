const ip = require('ip')
const { spawn } = require('child_process')
const fs = require('fs')
const PLACEHOLDER = '{MYIP}'
let environment = ''
let device = 'android'


const args = process.argv.slice(2).reduce((acc, arg) => {
  let [key, value = true] = arg.split('=')
  acc[key] = value
  return acc
}, {})

init()

function init() {

  environment = args.env || environment
  device = args.device || device

  const PATH = 'src/environments'
  const files = fs.readdirSync(PATH, 'utf8')
  for (let i = 0; i < files.length; i++) {
    setMyIp(`${PATH}/${files[i]}`)
  }

  runIonic(() => {
    for (let i = 0; i < files.length; i++) {
      rollbackToPlaceholder(`${PATH}/${files[i]}`)
    }
  })
}

function runIonic(cb) {
  const ionicRun = spawn('ionic', ['cordova', 'run', device, '--device', `-c=${environment}`])

  ionicRun.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  ionicRun.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ionicRun.on('close', (code) => {
    console.log(`child process exited with code ${code}`)

    if (typeof cb === 'function') {
      cb()
    }
  })
}

function setMyIp(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')

    var regExp = new RegExp(PLACEHOLDER, 'g')
    var result = data.replace(regExp, ip.address())

    fs.writeFileSync(filePath, result, 'utf8')
  } catch (e) {
    console.log(`an error occurred while changing the file ${filePath}`)
  }
}

function rollbackToPlaceholder(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')

    var regExp = new RegExp(ip.address(), 'g')
    var result = data.replace(regExp, PLACEHOLDER)

    fs.writeFileSync(filePath, result, 'utf8')
  } catch (e) {
    console.log(`an error occurred while changing the file ${filePath}`)
  }
}