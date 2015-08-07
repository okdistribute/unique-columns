count-duplicates
----------------

count-duplicates in a tabular dataset. Useful if you need to quickly see what columns in a table are unique.

count-duplicates is **Streaming**, too, which means that running this won't kill your RAM because the table is only loaded into memory one row at a time. Cool!

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
count-duplicates will try to guess the format, but you can supply it if you really want to.

```
$ count-duplicates <tabular-file> [--format=csv/ndjson]

OR

$ cat <tabular-file> | count-duplicates -

OR

$ sql2csv <some-table> | count-duplicates -
```


## TODO

1. Give a limit for the number of rows to peek on before stopping
2. Better js interface documentation
3. Tests
4. Give percentage of duplicates along with absolute values
