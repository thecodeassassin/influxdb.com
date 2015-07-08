---
title: Release Notes
---

## v0.9.1

### Upgrade notes

- No breaking changes from 0.9.0
- An 0.9.1 database (new or upgraded from 0.9.0) cannot be downgraded due to new WAL feature

### Features

- Write Ahead Log (WAL)
- Graphite Input Protocol Parsing
- New Admin UI/interface
- Raft snapshots
- Add `SHOW GRANTS FOR USER` statement

### Bugfixes

See the [changelog](https://github.com/influxdb/influxdb/blob/master/CHANGELOG.md#bugfixes-1)

## v0.9.0

_Note: Version 0.9.0 is a completely rewrite of the 0.8.8 codebase. Due to the many breaking changes to the API, versions 0.8 and 0.9 are __not__ interoperable._

### Upgrade notes

Work is [currently in progress](https://github.com/influxdb/influxdb/pull/3001) on an upgrade path to 0.9 from 0.8 databases.

More information on will be available on the [upgrade page](/docs/v0.9/administration/upgrading.html) soon.
