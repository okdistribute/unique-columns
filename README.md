unique-columns
----------------

Get the unique columns in a dataset. Useful if you need to quickly see what columns in a table are unique. `unique-columns` is **streaming**, too, which means that running this on a very large dataset won't kill your RAM because the table is only loaded into memory one row at a time. Cool!

```
npm install -g unique-columns
```

## Example

Imagine, your worst nightmare. You are given a dataset that contains two different columns that could possibly be the unique identifier. But you aren't sure.

In this case, two of these columns could be unique, 'username' and 'id', but how will you know for sure?

Run `unique-columns people.csv`, of course!

people.csv
```
name, age, id, username, description
angela, 29, 1, ange___1, "just a person here"
bob, 34, 2, iambob, "innovator in technology"
bob, 55, 3, bob2234, "Dad, Father, Do-gooder"
samantha, 34, 5, sam_does, "making a living, being a person"
laura, 34, 5, hanna_boss, "continuing to be a badass"
```

```
$ unique-columns people.csv
uniques:
   username
   description

duplicates:
   age: 3
   id: 2
```

We see that `id` and `age` contain duplicate values, while `username` and `description` are unique.

## Usage
unique-columns will try to guess the format, but you can supply it if you really want to.

```
$ unique-columns <tabular-file> [--format=csv/ndjson]

OR

$ cat <tabular-file> | unique-columns -
```

## Options

`--format/-f` : the format in which to expect data. tries to guess if not supplied.
`--json`: output machine-readable format in json

## JavaScript usage

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

```js
var parseInputStream = require('parse-input-stream')
var dupes = require('unique-columns')

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
