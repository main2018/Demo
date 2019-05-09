// generateComponent.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

let count = 1
module.exports = function(group) {
  group.hint && log(group.hint)

  let templateParam = ''
  let needBackInput = false
  let hasParentCreated = false
  let filename = ''

  process.stdin.on('data', async chunk => {
    const inputName = String(chunk).trim().toString()
    templateParam = getParamForTemplate(inputName)
    filename = getFileName(group, inputName)

    if (!hasParentCreated) {
      const rootDirectory = resolve(group.path, group.onlyfile ? '' : inputName) // 目录路径
      const rootPath = resolve(rootDirectory, filename) // 文件路径

      needBackInput = await needDiffDir(rootDirectory, group.overwrite)
      if (needBackInput) { return }

      await writeFile(rootPath, templateParam, group.template)
    }

   if (group.next) {
     hasParentCreated = true
     const length = group.next.length
     let i = 0
     for(; i < length; i++) {
       const file = group.next[i]
       filename = getFileName(file, inputName)
       const nextDirectory = resolve(file.path, file.onlyfile ? '' : inputName) // 目录路径
       const nextPath = resolve(nextDirectory, filename) // 文件路径

       !file.overwrite && file.hint && log(file.hint)
       needBackInput = await needDiffDir(nextDirectory, file.overwrite)

       if (needBackInput) { return }
       await writeFile(nextPath, templateParam, file.template)
       needBackInput = false
     }
   }

    process.stdin.emit('end')
  })

  process.stdin.on('end', () => {
    log('exit')
    process.exit()
  })
}

function getFileName(obj, name) {
  let filename = obj.filename
  if (!filename) {
    filename = obj.suffix ? name + obj.suffix : name
  }
  return filename
}

async function needDiffDir(dir, canOverwrite = false) {
  const hasDirectory = fs.existsSync(dir)
  let needBackInput = !canOverwrite && hasDirectory

  if (needBackInput) {
    errorLog(`已存在${dir}`)
    log(`请重新输入:`)
    return needBackInput
  }
  log(`正在创建目录 ${dir}`)
  await dotExistDirectoryCreate(dir)
  return needBackInput
}

async function writeFile(path, filename, template) {
  try {
    log(`正在创建文件 ${path}`)
    await generateFile(path, template(filename))
    successLog('创建成功')
  } catch (e) {
    errorLog('WRITE ERR:')
    errorLog(e.message)
  }
}

function getParamForTemplate(inputName) {
  let filename = ''
  if (inputName.includes('/')) {
    const inputArr = inputName.split('/')
    filename = inputArr[inputArr.length - 1]
  } else {
    filename = inputName
  }
  return filename
}


function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
