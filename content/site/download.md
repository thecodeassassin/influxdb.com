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
- 32-bit system install instructions
		
		wget https://s3.amazonaws.com/influxdb/influxdb_latest_i686.deb
		sudo dpkg -i influxdb_latest_i686.deb

### RedHat & CentOS

- 64-bit system install instructions

		wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.x86_64.rpm
		sudo rpm -ivh influxdb-latest-1.x86_64.rpm

- 32-bit system install instructions

		wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.i686.rpm
		sudo rpm -ivh influxdb-latest-1.i686.rpm

## Deprecated Releases

Deprecated versions are no longer actively developed.

- [version 0.8](/docs/v0.8/introduction/installation)