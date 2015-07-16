---
title: Troubleshooting
---


# Frequent Sources of Confusion

## Time Ranges

### Lower Bound

epoch 0 unless otherwise specified, leads to issues with GROUP BY (#2702)

### Upper Bound

now() unless otherwise specified

### Special Times

epoch 0, now, mix and max for 64-bit nanosecond Unix time

### Time Precision

always stored in nanos, return silently drops trailing zeros

## Return Codes

### 2xx Means Understood

### 4xx Means Not Understood

### 5xx Means Cluster Not Healthy

## Syntax Pitfalls

### When to Single-Quote

single-quote strings in queries, never identifiers

never single quote in writes (line protocol)

the CREATE USER with PASSWORD 'password' query always requires quoting the password string

### When to Double-Quote

double-quote identifiers in queries, never strings

never double-quote keys (measurements, tags) in writes (line protocol)
double-quote field values in line protocol to write digits or booleans as strings
TODO (verify booleans write properly without quotes)

### Reserved Words in InfluxQL


### Characters That Must Be Quoted

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

See https://github.com/influxdb/influxdb/issues/2702

### 10000 Point Batches 

unless chunked response

### 64-bit Integers

### 64-bit Floats

### 64 KB Strings


