count-duplicates
----------------

count-duplicates in a tabular dataset. Useful if you need to quickly see what columns in a table are unique.

count-duplicates is **streaming**, too, which means that running this won't kill your RAM because the table is only loaded into memory one row at a time. Cool!

```
npm install -g count-duplicates
```

## Example

people.csv
```
name, age, id, username, description
angela, 29, 1, ange___1, "just a person here"
bob, 34, 2, iambob, "innovator in technology"
bob, 55, 3, bob2234, "Dad, Father, Do-gooder"
samantha, 34, 5, sam_does, "making a living, being a person"
laura, 34, 5, hanna_boss, "continuing to be a badass"
```

Here, all fields are unique except 'id' (that's bad!!) and 'age'. count-duplicates spits out which columns are unique and which have duplicates (along with **how many** are duplicates).

```
$ count-duplicates people.csv
uniques:
   username
   description

duplicates:
   age: 3
   id: 2
```

## Usage
count-duplicates will try to guess the format, but you can supply it if you really want to.

```
$ count-duplicates <tabular-file> [--format=csv/ndjson]

OR

$ cat <tabular-file> | count-duplicates -

OR

$ sql2csv <some-table> | count-duplicates -
```

## JS usage

An incoming jsonStream gets turned into a dictionary of the duplicates:

```
  {
    "name": 2,
    "age": 3,
    "id": 0,
    "description": 0,
    "username": 0,
  }
```

Use it with any parsed json input stream:

```
var parseInputStream = require('parse-input-stream')
var dupes = require('count-duplicates')

var args = {"format": "csv"}
var jsonStream = process.stdin.pipe(parseInputStream(args))

dupes(jsonStream, function done (err, duplicates) {
  console.log(duplicates)
})

```

## TODO

1. Give a limit for the number of rows to peek on before stopping
3. Tests
4. Give percentage of duplicates along with absolute values
