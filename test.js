var parseInputStream = require('parse-input-stream')
var fs = require('fs')
var dupes = require('./')
var test = require('tape')

test('parses people fairly', function (t) {
  var inputStream = fs.createReadStream('./people.csv')
  var args = {
    format: 'csv'
  }
  var stream = inputStream.pipe(parseInputStream(args))
  dupes(stream, args, function done (err, duplicates) {
    t.ifError(err)
    t.same(duplicates.name, 2)
    t.same(duplicates.age, 3)
    t.same(duplicates.username, 0)
    t.same(duplicates.description, 0)
    t.end()
  })
})
