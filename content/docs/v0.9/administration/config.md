---
title: Database Configuration
---

## Authentication

To add authentication to InfluxDB set `auth-enabled = true` in the `[http]` section of your config file.

```
[http]
...
auth-enabled = true
...
```

## Anonymous Statistics

By default, InfluxDB sends anonymous statistics about your InfluxDB instance. If you would like to disable this functionality, set `enabled = false` in the `[monitoring]` section of your config file.

```
[monitoring]
enabled = false
```

## Cluster

Configuring a cluster with host machines A, B, and C:

1. Install InfluxDB on all three machines.
2. Generate a config file on each machine by running `influxd config > influxdb.conf`.
3. Update the `[meta]` section of the configuration file on all three hosts, replacing `localhost` with the hosts actual network IP.
4. Update the bind-address to another port if 8088 is not acceptable.
5. On all three machines add `peers = ["A_IP:A_bindaddress", "B_IP:B_bindaddress", "C_IP:C_bindaddress"]` to the `[meta]` section of the config file.
6. On all three machines, add `replication = 3` in the `[retention]` section of the config file.
7. Launch `influxd` on hosts A, B, and C in and order.
