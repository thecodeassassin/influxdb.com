---
title: Glossary of Terms
---

## Series
A Series is a collection of data points along a timeline. A Series must be unique to a given Retention Policy, and is uniquely identified by its measurement and the specific key-value pairs that appear as tags. In InfluxDB terminology, a series is made up of all Points in the same Retention Policy that share a common Measurement and a Tag Set. (The Field Set is not part of the series identification.)

## Measurement
A Measurement contains all Series storing the same metrics. The Measurement is what appears in the SELECT clause of query statements, and is thus similar to a table name in traditional SQL databases. All Series under a given Measurement have the same Field Keys (the stored metric values) and differ only in their Tag Set (metadata about the measurement). For example, `cpu_load` is a Measurement, `hostname=server002` is a Tag in the Measurement, `value=0.64` is a Field in the Measurement

If a Measurement contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Measurements are unique per Retention Policy. 

The measurement should describe the metric(s) recorded in the associated series. It should not explicitly include information about the source of or the metadata associated with the measurements. Metadata should be recorded in Tags. For example, `cpu_load`, `peak_generation`, and `bikes_present` would be reasonable measurements for a server, a photovoltaic array, and a bike-sharing station, respectively. The `cpu_load` measurement would likely have tags for hostname, server region, server function, and OS. The `energy_generated` measurement might have tags for pv_installation_id, outside_temperature, and weather. The `bikes_present` measurement might only have a tag for station_id.

## Point
A Point is a single collection of Field Values in a Series. Each point is uniquely identified by its Series and Timestamp. It is not possible to store two points in the same series with the same timestamp. The most recently written version of the point will silently overwrite the previous Field Set with its Field Set.

## Tag
A Tag is a key-value pair that provides metadata about the Point. A tag is made up of the Tag Key and the Tag Value. For example, `hostname=’server01’`, `station_id=84`, and `weather=’partial sun’` are all valid Tags. 

Tags are indexed, meaning queries on Tag Keys or Tag Values are highly performant. Tags are not required.

## Tag Key
The Tag Key is the key part of the key-value pair that makes up a Tag and is always stored as a string. If a Tag Key contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Tag Keys are unique per Measurement.

## Tag Value
A Tag Value is the value part of the key-value pair that makes up a Tag and is always stored as a string. If a Tag Value contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. 

Tag Values must be unique per Tag Key. InfluxDB will not allow assignment of `weather: ‘partly sunny’` and `weather: ’partly cloudy’` to the same Point. There is no error returned if you write multiple Tag Values for the same Tag Key on a given Point. One of the Tag Values will be assigned to the Tag Key and all other Tag Values will be silently dropped.

## Tag Set
The Tag Set is the combination of all Tags on the Point, including all Tag Keys and their corresponding Tag Values. The Tag Set and Measurement fully describe a Series. The Tag Set, Measurement, and Timestamp fully describe a Point. The total number of Series under a given Measurement is thus identical to the number of distinct Tag Sets applied to Points within that Measurement. 

## Field
A Field is a key-value pair that records an actual metric for a given Point. A field is made up of the Field Key and the Field Value. For example, `load=0.64`, `event=”panels cleaned”`, and `bikes_present=15` are valid all Fields. 

Fields are not indexed, meaning queries on Field Keys or Field Values must scan all points matching the time range of the query. Queries on Fields are thus not performant, but are assumed to be infrequent for typical use cases. If you find yourself querying Fields consider whether the key-value pair is better stored as a Tag. Regular expressions are not supported when querying against Fields or Field Values.

Every point must have at least one Field or it will be rejected as invalid.

## Field Key
The Field Key is the key part of the key-value pair that makes up a Field and is always stored as a string. If a Field Key contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Field Keys are unique per Point.
Field Value
A Field Value is the value part of the key-value pair that makes up a Field. Field Value data may be stored as a string, boolean, int64, or float64. If a Field Value contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit but is not a number it must be double-quoted. If it is a number it may contain one decimal point. Scientific notation is not a valid numerical representation and will be stored as a string, preventing most Aggregations from working.

Field Values must be unique per Field Key, meaning you cannot assign `load=0.64` and `load=1.5` to the same Point. There is no error if you write multiple Field Values for the same Field Key on a given Point. One of the Field Values will be assigned to the Field Key and all other Field Values will be silently dropped.

## Field Set
The Tag Set is the combination of all Tags on the Point, including all Tag Keys and their corresponding Tag Values. The Tag Set, Measurement, and Timestamp fully describe a Point, and the Tag Set and Measurement fully describe a Series. The total number of Series under a given Measurement is the same as the number of distinct Tag Sets applied to Points with that Measurement. 

## Database
A Database is a logical container for Users, Retention Policies, and Continuous Queries which must be unique per database. If a Database name contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Databases are unique per Cluster.

Typical use cases for multiple databases are to separate development and production metrics or for multi-tenant systems where distinct authentication to the database is desirable.

## Retention Policy
A Retention Policy is a collection of Measurements, which must be unique within the Retention Policy. Retention Policies are unique per Database. If a Retention Policy contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Retention Policies are frequently abbreviated as RPs.

A Retention Policy has a Duration and a Replication Factor. All Databases must have a default Retention Policy, although any retention policy may be declared the default. When a database is created a Retention Policy named “default” is automatically created with an infinite duration and a replication factor of 1.

## Duration
The Duration determines how long data within the Retention Policy must be kept. Data older than the duration may be automatically dropped by the Database at any time. Durations may be given in terms of minutes, hours, days, or weeks, with INF meaning retain all data forever. Durations may not be shorter than one hour.

## Replication Factor
The Replication Factor determines how many independent copies of each Point are stored within the Cluster. Points will be duplicated across N Data Nodes, where N is the Replication Factor. Data availability is maintained when the number of unavailable Data Nodes in the Cluster is less than the Replication Factor. Once the number of unavailable Data Nodes equals or exceeds the Replication Factor some data may be unavailable for queries.

Replication is used to ensure data availability in the event a Data Node or Nodes are unavailable. There are no query performance benefits from replication. The Replication Factor should be less than or equal to the number of Data Nodes in the Cluster.

## Continuous Query
A Continuous Query is a special type of query that is run internally by the database. Continuous Queries automatically aggregate or downsample data from one Series into another Series. Continuous Queries are unique per Database. If a Continuous Query name contains any character other than [A-Z,a-z,0-9,_] or if it starts with a digit it must be double-quoted. Continuous Queries are frequently abbreviated as CQs. 

Continuous Queries must contain at least one Aggregation in the SELECT clause. It is not currently possible to copy unaggregated Points from one series to another. CQs must not contain a time restriction in the WHERE clause. The database will interpolate an absolute time restriction for the query at runtime. For example, suppose a database has a CQ like `SELECT MEAN(value) INTO new_measurement FROM old_measurement GROUP BY time(5m)` and the time is currently 10:04:59 (we will omit the date for clarity.) Shortly after 10:05 the database will execute the continuous query. The exact timing is not guaranteed, but CQs run once for each interval in the GROUP BY statement, meaning this CQ will run once every five minutes. When it runs it will calculate the mean for the Field “value” on the Measurement “old_measurement” over the interval from 10:00:00 to 10:04:59.999999999 and insert that into the Measurement “new_measurement”. Again shortly after 10:10 the database will calculate the mean of the value for the interval from 10:05:00 to 10:09:59.999999999 and insert that into “new_measurement”.

## Aggregation
An Aggregation is a function that takes a collection of points and produces a summary value over a particular time period. Aggregations supported include COUNT, MEAN, SUM, MEDIAN, PERCENTILE, MIN, MAX, SPREAD, STDDEV, DERIVATIVE, NON_NEGATIVE_DERIVATIVE, DISTINCT, FIRST, and LAST. Aggregations may be run on intervals as short as 1 second and the intervals may be specified in seconds, minutes, hours, days, or weeks.

## Selector
Functions with Single-value return

## Transformation
Functions that transform the data but are neither a selector nor an aggregation. DERIVATIVE is a good example, as would be HISTOGRAM if implemented. 

## Function
Aggregations, Selectors, and Transformations, and eventually custom functions.

## Timestamp
A Timestamp is the date and time associated with a particular Point. All Points must have one and only one Timestamp. The Timestamp may be specified in UNIX epoch or a datetime string valid under RFC 3339. For either method precision may be given in seconds, milliseconds, microseconds, or nanoseconds. If precision is not provided it is assumed to be seconds.

If a timestamp is not specified at write time the Node receiving the write will insert its current system time as the timestamp, using nanosecond precision. 

## Cluster
A Cluster is a collection of Servers running InfluxDB Nodes. Clusters may have 1 or 3 nodes in InfluxDB 0.9.

## User
A User is required when authentication is enabled for the database.

## Node
A Node is a logical concept in the clustering setup. Nodes belong to Servers (one node per server.)

## Server
A Server is a machine, virtual or physical, running InfluxDB. There should only be one InfluxDB process per Server. 

## Column

## Identifier

## Batch

## Shard

## Shard File




