---
title: Troubleshooting
---


# Frequent Sources of Confusion

## Time Ranges

### Lower Bound

If you do not specify an explicit lower boundary for the time range of your query InfluxDB will use epoch 0 (1970-01-01T00:00:00Z) as the implicit lower boundary. This frequently causes unexpected results when using a `GROUP BY time` clause. See GitHub Issue [#2702](https://github.com/influxdb/influxdb/issues/2702) for more details. The fix is to specify an explicitly bounded time range containing fewer than 100,000 intervals of the supplied `GROUP BY` length. For example, if the query has `GROUP BY time(10m)` you must ensure the time range contains fewer than 1,000,000 minutes (10 minutes per interval * 100,000 intervals). 

### Upper Bound

If you do not specify an explicit upper boundary for the time range of your query InfluxDB will use `now()` as the implicit upper boundary. To query points in the future, you must explicitly set an upper boundary in the future. For example, `SELECT * FROM foo WHERE time < now() + 1000d`

### Special Times

`now()` when used in queries returns the current nanosecond timestamp of the node processing the query. 

The smallest valid timestamp is -9023372036854775808, (approximately 1684-01-22T14:50:02Z)

The largest valid timestamp is 9023372036854775808, (approximately 2255-12-09T23:13:56Z)

Timestamp 0 is epoch (1970-01-01T00:00:00Z). Within InfluxDB epoch 0 is often used as a `null` timstamp equivalent. If you request a query that has no timestamp to return, such as an aggregation function with an unbounded time range, you will get epoch 0 as the returned timestamp. See GitHub Issue [#3337](https://github.com/influxdb/influxdb/issues/3337) for more information.

InfluxDB does store negative UNIX timestamps but there is currently a bug in the line protocol parser that treats negative timestamps as invalid syntax (GitHub Issue [#3367](https://github.com/influxdb/influxdb/issues/3367).

Points prior to epoch 0 (1970-01-01T00:00:00Z) are valid and should be written with negative timestamps. However, queries can only return points from before epoch 0 or after epoch 0, not both. A query with a time range that spans epoch 0 will only return partial results. See GitHub Issue [#2703](https://github.com/influxdb/influxdb/issues/2703) for more details.

Queries with a time range that exceeds the minimum or maximum timestamps valid for InfluxDB will currently return no results, rather than an error message. See GitHub Issue [#3369](https://github.com/influxdb/influxdb/issues/3369) for more information.

### Time Precision

All timestamps are stored in the database as nanosecond values, regardless of the write precision supplied. When returning query results, trailing zeros are silently dropped from timestamps. See GitHub Issue [#2977](https://github.com/influxdb/influxdb/issues/2977) for more information.

### Math on Timestamps

It is not currently possible to execute mathematical operators or functions against timestamp values. All time calculations must be carried out by the client receiving the InfluxDB query results.

## Return Codes

### 2xx Means Understood
An HTTP status code of 204 is returned if Influx could understand the request that has been sent. In the case that your request was understood but could not be completed, a 204 is still returned. However, the body of the response will contain an error message specifying what went wrong. A valid parseable query with no matching results will return a 204 with no error message.

### 4xx Means Not Understood
An HTTP status code of 4XX implies that the request that was sent in could not be understood and Influx does not know what was being asked of it. These generally indicate a syntax error with the write or query request. 

### 5xx Means Cluster Not Healthy
An HTTP status code of 5XX implies that the process is either down or significantly impaired. Further writes and reads are likely to fail permanently until the node or cluster is repaired.

## Syntax Pitfalls

### When to Single-Quote

When querying, you must single-quote all string values. For example, `SELECT ... WHERE tag_key='tag_value'` Unquoted strings will be parsed as identifiers.

When querying, never single-quote identifiers. The will be parsed as strings, not identifiers. Double-quotes are used for identifiers.

When writing via the line protocol, never use single-quotes. All special characters should be escaped, not quoted. See the [line protocol syntax](https://influxdb.com/docs/v0.9/write_protocols/write_syntax.html) page for more information.

The `CREATE USER with PASSWORD 'password'` query always requires single-quoting the password string. There is a GitHub Issue [#123](https://github.com/influxdb/influxdb.com/issues/123) open against the documentation repo to determine and document proper escaping within the password string.

### When to Double-Quote

When querying, it is always safe to double-quote identifiers. Identifiers starting with a digit or containing characters other than `[A-z]`, `[0-9]`, or `_` must always be double-quoted. See the [query syntax](https://influxdb.com/docs/v0.9/query_language/query_syntax.html) page for more information.

never double-quote keys (measurements, tags) in writes (line protocol)
double-quote field values in line protocol to write digits or booleans as strings


TODO (verify booleans write properly without quotes)

### Reserved Words in InfluxQL

Use of any of the [InfluxQL Reserved Words](https://github.com/influxdb/influxdb/blob/master/influxql/INFLUXQL.md#identifiers) as Identifiers or Strings will require quoting of the identifier or string in every use. It can lead to non-intuitive errors and is not recommended.

### Characters That Must Be Quoted

### Querying Booleans

Although the following are all valid syntax for writing boolean values: `t`, `T`, `true`, `True`, `TRUE`, `f`, `F`, `false`, `False`, and `FALSE`, only the full words are valid syntax when using booleans in the `WHERE` clause. When querying, you must use `true`, `True`, `TRUE`, `false`, `False`, or `FALSE`. 

For example, `SELECT ... WHERE tag1=True` will return all points with `tag1` set to TRUE, but `SELECT ... WHERE tag1=T` will return an empty set of points and no error.

#### Writing

##### Line Protocol

there is no quoting, escape with backslash `\`

comma `,`
space ` `

all others (should be) passed through unchanged

##### JSON 

deprecated

#### Querying

quote identifiers with double-quotes `"`
quote strings with single quotes `'`

leading digits
anything other than `[A-z]`, `[0-9]`, `_`

### Characters That Complicate Regular Expressions

If you want to use regex avoid using the following in identifiers and strtings, if possible:

`\`, `^`, `$`

## Architectural Limits

### 100000 Buckets For GROUP BY

See [2702](https://github.com/influxdb/influxdb/issues/2702)

### 10000 Point Batches 

unless chunked response

### Signed 64-bit Integers

### 64-bit Floats

### 64 KB Strings


