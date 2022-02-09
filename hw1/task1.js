const reverseString = str => str.split('').reverse().join('');

process.stdout.write('enter something\n');
process.stdin.on('data', data => {
    const stdinStr = data.toString().trim();
    const formattedStr = `${reverseString(stdinStr)}\n`;
    process.stdout.write(formattedStr);
});