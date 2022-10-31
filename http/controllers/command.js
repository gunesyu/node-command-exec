import CommandService from '../services/command.js'

const command = async (req, res, next) => {
  const { userID, command, params } = await req.body

  const cmd = new CommandService(command, params, userID)

  try {
    const { stdout, stderr } = await cmd.handle()

    if (stderr) {
      res.status(201)
          .send({
            message: `Error on child process`,
            error: stderr
          })
    }

    res.send({
      message: `Successfully executed`,
      ...(stdout ? { output: stdout } : {})
    })
  } catch (error) {

    res.status(503)
      .send({
        message: `Error on process`,
        error
      })
  }
}

export default command
