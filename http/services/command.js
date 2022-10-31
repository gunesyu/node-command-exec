import fs from 'node:fs'

// TODO: use for validation/sanitization
const USER = 'admin'
const PREVENT_COMMANDS = ['cd']

class CommandService {
  constructor(cmd, params, userID) {
    this.cmd = cmd
    this.params = params
    this.userID = userID
  }

  async handle() {
    const { exec } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execPromise = promisify(exec)

    const userDir = `./usr/${this.userID}`

    if (!fs.existsSync(userDir)) {
      await execPromise(`mkdir ${userDir}`)
    }

    return await execPromise(`${this.cmd} ${this.params}`, {
      shell: true,
      timeout: 10,
      cwd: userDir,
    })
  }
}

export default CommandService
