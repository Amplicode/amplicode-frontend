const fs = require('fs');

replaceCrlf()

function replaceCrlf() {
  fs.readFile('src/gql/index.ts', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/\\r/g, '');

    fs.writeFile('src/gql/index.ts', result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}