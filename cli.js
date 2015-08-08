#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var ndjson = require('ndjson')
var fs = require('fs')
var parseInputStream = require('parse-input-stream')
var dupes = require('./')

var path = args._[0]
if (!path) return usage()

if (!args.format) {
  args.format = 'csv'
}

if (path === '-') var inputStream = process.stdin
else var inputStream = fs.createReadStream(args._[0])

var stream = inputStream.pipe(parseInputStream(args))
dupes(stream, args, function done (err, duplicates) {
  if (err) throw err
  if (args.json) return console.log(JSON.stringify(duplicates))
  var output = ''
  var fields = Object.keys(duplicates)

  var dupes = []
  var uniques = []

  for (var i in fields) {
    var field = fields[i]
    var dupe = duplicates[field]
    if (dupe) dupes.push({'field': field, 'count': dupe})
    else uniques.push(field)
  }

  output += '\nuniques:\n'
  uniques.map(function (field) { output += '  ' + field + '\n'})

  output += '\nduplicates:\n'
  dupes.map(function (dupe) { output += '  ' + dupe['field'] + ': ' + dupe['count']  + '\n'})

  console.log(output)
})

function usage () {
  console.log('count-duplicates <tabular-file> [--format=csv,ndjson]')
  console.log('OR cat <tabular-file> | count-duplicates - [--format=csv,ndjson]')
}
