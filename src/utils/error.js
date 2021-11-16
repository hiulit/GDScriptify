module.exports = (message, exit = true) => {
  console.error(message)
  exit && process.exit(1)
}
