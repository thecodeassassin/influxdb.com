+++
title = "downloads"
layout = "sidebar"
+++
# Downloads

## Version 0.9 (Stable)

### OS X

- Via [Homebrew](http://brew.sh/)

		brew update
		brew install influxdb

### Ubuntu & Debian

- 64-bit system install instructions

		wget https://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb
		sudo dpkg -i influxdb_latest_amd64.deb

### RedHat & CentOS

- 64-bit system install instructions

		wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.x86_64.rpm
		sudo rpm -ivh influxdb-latest-1.x86_64.rpm

## Version 0.9 (Nightly)
Nightly builds are created once-a-day using the top-of-tree of [master](https://github.com/influxdb/influxdb/tree/master) source code. These builds will include all the latest fixes, but also undergo only basic testing.

### Ubuntu & Debian

- 64-bit system install instructions

        wget https://s3.amazonaws.com/influxdb/influxdb_nightly_amd64.deb
        sudo dpkg -i influxdb_nightly_amd64.deb

### RedHat & CentOS

- 64-bit system install instructions

        wget https://s3.amazonaws.com/influxdb/influxdb-nightly-1.x86_64.rpm
        sudo rpm -ivh influxdb-nightly-1.x86_64.rpm


## Deprecated Releases

Deprecated versions are no longer actively developed.

- [version 0.8](/docs/v0.8/introduction/installation.html)
