// Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.
// • The program should be started from npm script via nodemon (i.e. npm run task1).
// • The program should be running in a stand-by mode and should not be terminated after the first-string processing.

process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
  if (chunk !== null) {
    const reverseStr = chunk.toString().split('').reverse().join('')
    process.stdout.write(reverseStr)
  }
})