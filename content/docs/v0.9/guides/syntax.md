---
title: Syntax
---

Syntax is always a challenge to remember, so here's a reference

# Write Syntax

## Line Protocol

The syntax for the line protocol is

`measurement[,tag_key1=tag_value1...] field_key=field_value[,field_key2=field_value2] [timestamp]`

#### Whitespace

A space must exist between the measurement and the field(s), or between the tag(s) and the field(s) if tags are 
provided. The measurement and tags should be separated by a comma `,` with no whitespace. 

#### Timestamps

Timestamps are not required. When no timestamp is provided the server will insert the point with the local server 
timestamp. If a timestamp is provided it must be separated from the field(s) by a space. Timestamps must be in Unix 
time and are assumed to be in nanoseconds. A different precision can be provided, see the HTTP syntax for details.

#### Key-value Separator

Tag keys and values, and field keys and values must be separated by the equals sign `=` without spaces. 

#### Escaping Characters

If a measurement, tag key, tag value, or field key contains a space ` ` or a comma `,` it must be escaped using the
backslash character `\`. 

#### Data Types

Measurements, tag keys, tag values, and field keys are always stored as strings in the database. 

Field values may be stored as `float64`, `int64`, `boolean`, or `string`. All subsequent field values must match 
the type of the first point written to given measurement.

`float64` values must contain a decimal. `int64` values may not contain a decimal. `1` is an integer. `1.0` is a float. 

`boolean` values are `t`, `T`, `true`, `True`, or `TRUE` for TRUE, and  `f`, `F`, `false`, `False`, or `FALSE` for FALSE

`string` values have a length limit of 64 KB. ALl Unicode characters should be valid, although commas and spaces 
require escaping. Backslash characters do not require escaping, but may not be used directly preceeding a comma or space.

#### Examples

###### Simplest Valid Point
`disk_free value=442221834240`

###### With Timestamp
`disk_free value=442221834240 1435362189575692182`

###### With Tags
`disk_free,hostname=server01,disk_type=SSD value=442221834240`

###### With Tags, With Timestamp
`disk_free,hostname=server01,disk_type=SSD value=442221834240 1435362189575692182`

###### Multilple Fields
`disk_free,hostname=server01 free_space=442221834240,disk_type="SSD" 1435362189575692182`


###### Escaping Commas and Spaces
`total\ disk\ free,volumes=/net\,/home\,/ value=442221834240 1435362189575692182`

In this example, the measurement is written as `total disk free` and the tag key `volumes` has a value of `/net,/home,/`

## Caveats

No timestamp batch




### CLI



### HTTP


all writes must have a target database in the query string. E.g. 
curl ... localhost:8086/write?db=mydb ...

never quote measurement names (they are always strings)
always escape commas and whitespace in measurement names
never quote tag keys or values (they are always strings)
always escape commas and whitespace in tag keys and values
never quote field keys (they are always strings)
always escape commas and whitespace in field keys
if your field value is a(n):
integer - don't use a decimal point (1, not 1.0)
float - you must use a decimal point (1.0, not 1)
string - always double-quote ("")
boolean - use any of the following, unquoted: [t, T, true, True, TRUE; f, F, false, False, FALSE]
if you provide timestamps in any unit other than nanoseconds, you must supply the appropriate precision in the URL query string. E.g. for milliseconds:
curl ... localhost:8086/write?precision=ms ...

use [n, u, ms, s, m, h] for nanoseconds, microseconds, milliseconds, seconds, minutes, and hours, respectively. If no `precision` is supplied, nanoseconds is assumed.

# Query Syntax

## Quoting measurements, tags, and fields

All measurement names, tag keys, and field keys must be double-quoted if they contain a character other than [A-Z,a-z,0-9,_] or if they begin with a digit
Any measurement name, tag key, or field key that matches a query language identifier (e.g. SELECT, INSERT, FROM, time, etc.) must be double-quoted whenever used in a query.
All tag values must be single-quoted
Field values must be single-quoted if they are strings

## CLI

## Query String

### Database

### Retention Policy

### Returned Values
