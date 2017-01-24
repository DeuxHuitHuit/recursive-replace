# Recursive Replace

> Replaces all occurrence of the given pattern in a file, recursively, until the pattern is not found.

It's a simpler alternative to `sed`.

## Install

```
npm i -g recursive-replace
```

## Usage

The executable is available as `rrp` and `recursive-replace`.

```
Usage: rrp -p [pattern] -r [replace] [file]

Options:
  -0  The input file. stdin by default.
  -p  RegExp to search for.                                          [required]
  -r  The replace string. Null by default.

```

## Example

Replace all occurrences of `test` by `Test`

```
rrp -p "test" -r "Test" file
```
