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
backslash character `\`. Measurements currently cannot contain commas at all ([issue 3183](https://github.com/influxdb/influxdb/issues/3183)).

#### Data Types

Measurements, tag keys, tag values, and field keys are always stored as strings in the database. 

`string` values have a length limit of 64 KB. ALl Unicode characters should be valid, although commas and spaces 
require escaping. Backslash characters do not require escaping, but may not be used directly preceeding a comma or space. (Note that `string` field values have different quoting and escaping rules than the measurement, tag, and field name `string` syntax.)

Field values may be stored as `float64`, `int64`, `boolean`, or `string`. All subsequent field values must match 
the type of the first point written to given measurement. 

`float64` values must contain a decimal. `int64` values may not contain a decimal. `1` is an integer. `1.0` is a float. 

`boolean` values are `t`, `T`, `true`, `True`, or `TRUE` for TRUE, and  `f`, `F`, `false`, `False`, or `FALSE` for FALSE

`string` values for field values must be double-quoted. Double-quotes in the string must be escaped. All other characters are supported without escaping.

#### Examples

###### Simplest Valid Point (measurement + field)
`disk_free value=442221834240`

###### With Timestamp
`disk_free value=442221834240 1435362189575692182`

###### With Tags
`disk_free,hostname=server01,disk_type=SSD value=442221834240`

###### With Tags, With Timestamp
`disk_free,hostname=server01,disk_type=SSD value=442221834240 1435362189575692182`

###### Multilple Fields
`disk_free free_space=442221834240,disk_type="SSD" 1435362189575692182`

###### Escaping Commas and Spaces
`total\ disk\ free,volumes=/net\,/home\,/ value=442221834240 1435362189575692182`.

In the above example, the measurement is written as `total disk free` and the tag key `volumes` has a tag value of `/net,/home,/`

###### With Backslash in Tag Value
`disk_free,path=C:\Windows value=442221834240`

Backslashes do not need to be escaped when used in strings. Unless followed by a comma or a space, backslashes are treated as a normal character.

###### Escaping Field Key
`disk_free value=442221834240,working\ directories="C:\My Documents\Stuff for examples,C:\My Documents"`

In the above example, the second field key is `working directories` and the corresponding field value is `C:\My Documents\Stuff for examples,C:\My Documents`.

###### Showing all escaping and quoting behavior

`"measurement\ with\ quotes",tag\ key\ with\ spaces=tag\,value\,with"commas" field_key\\\\="string field value, only \" need be quoted"`

In the above example, the measurement is `"measurement with quotes"`, the tag key is `tag key with spaces`, the 
tag value is `tag,value,with"commas"`, the field key is `field_key\\\\` and the field value is `string field value, only " need be quoted`. 

## Caveats

If you write points in a batch all points without explicit timestamps will receive the same timestamp when inserted. Since a point is defined only by its measurement, tag set, and timestamp, that can lead to duplicate points. When InfluxDB encounters a duplicate point it silently overwrites the previous point. It is a best practice to provide explicit timestamps with all points. 

Measurements, tag keys, tag values, and field keys are never quoted. Spaces and commas must be escaped. Field keys 
that are stored as strings must always be double-quoted. Only double-quotes should be escaped.

Measurement names currently cannot include commas.

Querying measurements or tags that contain double-quotes `"` can be difficult, since double-quotes are also the syntax for an identifier. It's possible to work around the limitations with regular expressions.

### CLI

To write points using the command line interface, use the `insert` command. 

###### Write a Point with the CLI

`> insert disk_free,hostname=server01 value=442221834240 1435362189575692182`

The CLI will return nothing on success and should give an informative parser error if the point cannot be written. There is currently no way to write a batch of points using the CLI, each point must be inserted individually.


### HTTP

To write points using `curl`, call the `/write` endpoint at port `8086`. You must specify the target database in the query string using `db=<target_database>`. Use the `--data-binary` encoding method for all writes in the line protocol format. Other encoding methods will strip newlines or introduce URL encoding.  

You may optionally provide a target retention policy, specify the precision of any supplied timestamps, and pass any required authentication in the query string. 

###### Write a Point with `curl`

`curl -X POST 'http://localhost:8086/write?db=mydb' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

You can also supply the query string parameters elsewhere in the command. They must be URL encoded:

`curl -X POST 'http://localhost:8086/write' --data-urlencode 'db=mydb' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

###### Write a Point to a non-default Retention Policy

Use the `rp=<retention_policy` query string parameter to supply a target retention policy. If not specified, the default retention policy will be used.

`curl -X POST 'http://localhost:8086/write?db=mydb&rp=six_month_rollup' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

`curl -X POST 'http://localhost:8086/write' --data-urlencode 'db=mydb' --data-urlencode 'rp=six_month_rollup' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

###### Write a Point Using Authentication

Use the `u=<user>` and `p=<password>` to pass the authentication details, if required. 

`curl -X POST 'http://localhost:8086/write?db=mydb&u=root&p=123456' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

`curl -X POST 'http://localhost:8086/write' --data-urlencode 'db=mydb' --data-urlencode 'u=root&p=correct horse battery staple' --data-binary 'disk_free,hostname=server01 value=442221834240 1435362189575692182'`

###### Write a Batch of Points with `curl`

You can also pass a file using the `@` flag. The file can contain a batch of points, one per line. Points must be separated by newline characters `\n`. Batches should be 5000 points or fewer for best performance.

`curl -X POST 'http://localhost:8086/write?db=mydb' --data-binary @<filename>`

`curl -X POST 'http://localhost:8086/write' --data-urlencode 'db=mydb&rp=myrp&u=root&p=root' --data-binary @points.txt`

###### Specify Non-nanosecond Timestamps

Use the `precision=[n,u,ms,s,m,h]` query string parameter to supply a precision for the timestamps.

All timestamps are assumed to be Unix nanoseconds unless otherwise specified. If you provide timestamps in any unit other than nanoseconds, you must supply the appropriate precision in the URL query string. Use `n`, `u`, `ms`, `s`, `m`, and `h` for nanoseconds, microseconds, milliseconds, seconds, minutes, and hours, respectively. 

`curl -X POST 'http://localhost:8086/write?db=mydb&precision=ms' --data-binary 'disk_free value=442221834240 1435362189575'`

`curl -X POST 'http://localhost:8086/write' --data-urlencode 'db=mydb&precision=s' --data-binary @points.txt`

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
