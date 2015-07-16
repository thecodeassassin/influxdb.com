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

### When to Double-Quote

### Reserved Words in InfluxQL
```
ALL          ALTER        AS           ASC          BEGIN        BY
CREATE       CONTINUOUS   DATABASE     DATABASES    DEFAULT      DELETE
DESC         DROP         DURATION     END          EXISTS       EXPLAIN
FIELD        FROM         GRANT        GROUP        IF           IN
INNER        INSERT       INTO         KEY          KEYS         LIMIT
SHOW         MEASUREMENT  MEASUREMENTS OFFSET       ON           ORDER
PASSWORD     POLICY       POLICIES     PRIVILEGES   QUERIES      QUERY
READ         REPLICATION  RETENTION    REVOKE       SELECT       SERIES
SLIMIT       SOFFSET      TAG          TO           USER         USERS
VALUES       WHERE        WITH         WRITE
```

### Characters That Must Be Quoted

### Characters That Must Be Escaped

### Characters That Complicate Regular Expressions

## Architectural Limits

### 100000 Buckets For GROUP BY

### 10000 Point Batches 

unless chunked response

### 64-bit Integers

### 64-bit Floats

### 64 KB Strings


