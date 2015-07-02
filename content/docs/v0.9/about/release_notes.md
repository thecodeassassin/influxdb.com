---
title: Release Notes
---

## v0.9.1 [2015-07-02]

### Features

- Add `SHOW GRANTS` FOR USER statement. Thanks @n1tr0g
- Graphite Input Protocol Parsing
- New Admin UI/interface
- Write Ahead Log (WAL)
- Implement Raft snapshots

### Bugfixes

- [3013](https://github.com/influxdb/influxdb/issues/3013): Panic error with inserting values with commas
- [#2956](https://github.com/influxdb/influxdb/issues/2956): Type mismatch in derivative
- [#2908](https://github.com/influxdb/influxdb/issues/2908): Field mismatch error messages need to be updated
- [#2931](https://github.com/influxdb/influxdb/pull/2931): Services and reporting should wait until cluster has leader.
- [#2943](https://github.com/influxdb/influxdb/issues/2943): Ensure default retention policies are fully replicated
- [#2948](https://github.com/influxdb/influxdb/issues/2948): Field mismatch error message to include measurement name
- [#2919](https://github.com/influxdb/influxdb/issues/2919): Unable to insert negative floats
- [#2935](https://github.com/influxdb/influxdb/issues/2935): Hook CPU and memory profiling back up.
- [#2960](https://github.com/influxdb/influxdb/issues/2960): Cluster Write Errors.
- [#2928](https://github.com/influxdb/influxdb/pull/2928): Start work to set InfluxDB version in HTTP response headers. Thanks @neonstalwart.
- [#2969](https://github.com/influxdb/influxdb/pull/2969): Actually set HTTP version in responses.
- [#2993](https://github.com/influxdb/influxdb/pull/2993): Don't log each UDP batch.
- [#2994](https://github.com/influxdb/influxdb/pull/2994): Don't panic during wilcard expansion if no default database specified.
- [#3002](https://github.com/influxdb/influxdb/pull/3002): Remove measurement from shard's index on DROP MEASUREMENT.
- [#3021](https://github.com/influxdb/influxdb/pull/3021): Correct set HTTP write trace logging. Thanks @vladlopes.
- [#3027](https://github.com/influxdb/influxdb/pull/3027): Enforce minimum retention policy duration of 1 hour.
- [#3030](https://github.com/influxdb/influxdb/pull/3030): Fix excessive logging of shard creation.
- [#3038](https://github.com/influxdb/influxdb/pull/3038): Don't check deleted shards for precreation. Thanks @vladlopes.
- [#3033](https://github.com/influxdb/influxdb/pull/3033): Add support for marshaling `uint64` in client.
- [#3090](https://github.com/influxdb/influxdb/pull/3090): Remove database from TSDB index on DROP DATABASE.
- [#2944](https://github.com/influxdb/influxdb/issues/2944): Don't require "WHERE time" when creating continuous queries.
- [#3075](https://github.com/influxdb/influxdb/pull/3075): GROUP BY correctly when different tags have same value.
- [#3078](https://github.com/influxdb/influxdb/pull/3078): Fix CLI panic on malformed INSERT.
- [#2102](https://github.com/influxdb/influxdb/issues/2102): Re-work Graphite input and metric processing
- [#2996](https://github.com/influxdb/influxdb/issues/2996): Graphite Input Parsing
- [#3136](https://github.com/influxdb/influxdb/pull/3136): Fix various issues with init.d script. Thanks @ miguelcnf.
- [#2996](https://github.com/influxdb/influxdb/issues/2996): Graphite Input Parsing
- [#3127](https://github.com/influxdb/influxdb/issues/3127): Trying to insert a number larger than the largest signed 64-bit number kills influxd
- [#3131](https://github.com/influxdb/influxdb/pull/3131): Copy batch tags to each point before marshalling
- [#3155](https://github.com/influxdb/influxdb/pull/3155): Instantiate UDP batcher before listening for UDP traffic, otherwise a panic may result.
- [#2678](https://github.com/influxdb/influxdb/issues/2678): Server allows tags with an empty string for the key and/or value
- [#3061](https://github.com/influxdb/influxdb/issues/3061): syntactically incorrect line protocol insert panics the database
- [#2608](https://github.com/influxdb/influxdb/issues/2608): drop measurement while writing points to that measurement has race condition that can panic
- [#3183](https://github.com/influxdb/influxdb/issues/3183): using line protocol measurement names cannot contain commas
- [#3193](https://github.com/influxdb/influxdb/pull/3193): Fix panic for SHOW STATS and in collectd
- [#3102](https://github.com/influxdb/influxdb/issues/3102): Add authentication cache
- [#3209](https://github.com/influxdb/influxdb/pull/3209): Dump Run() errors to stderr
- [#3217](https://github.com/influxdb/influxdb/pull/3217): Allow WAL partition flush delay to be configurable.
