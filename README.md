Count duplicates
----------------

Count duplicates in a tabular dataset. Useful if you need to quickly see what would be a nice unique key or nice set of compound keys for a data table.

```
npm install -g count-duplicates
```

## Example

```
$ count-duplicates people.csv
uniques:
   id
   username
   description

duplicates:
   age: 2
```

## Usage

```
$ count-duplicates <tabular-file> [--format=csv/ndjson]

OR

$ cat <tabular-file> | count-duplicates -
```


