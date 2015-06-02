+++
title = "downloads"
+++
# Downloads

## Sandbox

The easiest way to get started using InfluxDB is to head over to [play.influxdb.org](http://play.influxdb.org) where you can create a database and start writing data and exploring it through the administrative interface in seconds. There's no signup required. It's an open sandbox for you to play in.

## OS X

Automatic installation on OS X 10.6 and higher is supported through [Homebrew](http://brew.sh/). The following will install version 0.8.8. See the Major Releases section below for Homebrew installation of 0.9.

```
brew update
brew install influxdb
```

## Ubuntu & Debian

Debian users can install v0.8.8 by downloading and installing the package as follows. For 0.9 installation see the links under Major Releases:

#### 64-bit system install instructions

```
wget https://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb
sudo dpkg -i influxdb_latest_amd64.deb
```

#### 32-bit system install instructions

```
wget https://s3.amazonaws.com/influxdb/influxdb_latest_i686.deb
sudo dpkg -i influxdb_latest_i686.deb
```

## RedHat & CentOS

RedHat and CentOS users can install v0.8.8 by downloading and installing the rpm as follows. For 0.9 installation see the links under Major Releases:

#### 64-bit system install instructions

```
wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.x86_64.rpm
sudo rpm -ivh influxdb-latest-1.x86_64.rpm
```

#### 32-bit system install instructions
```
wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.i686.rpm
sudo rpm -ivh influxdb-latest-1.i686.rpm
```

## Major Releases

Below are the most significant releases of InfluxDB.

### Latest v0.9.0-rc31

- [RedHat/CentOS (64-bit)](http://get.influxdb.org/influxdb-0.9.0_rc31-1.x86_64.rpm)
- [Debian/Ubuntu (64-bit)](http://get.influxdb.org/influxdb_0.9.0-rc31_amd64.deb)
- Install via Homebrew:

        brew update && brew install influxdb --devel

### v0.8.8 (Stable)

- [RedHat/CentOS (64-bit)](http://get.influxdb.org/influxdb-0.8.8-1.x86_64.rpm)
- [RedHat/CentOS (32-bit)](http://get.influxdb.org/influxdb-0.8.8-1.i686.rpm)
- [Debian/Ubuntu (64-bit)](http://get.influxdb.org/influxdb_0.8.8_amd64.deb)
- [Debian/Ubuntu (32-bit)](http://get.influxdb.org/influxdb_0.8.8_i686.deb)
- [Source (32-bit)](http://get.influxdb.org/influxdb-0.8.8.386.tar.gz)
- [Source (64-bit)](http://get.influxdb.org/influxdb-0.8.8.amd64.tar.gz)
- [Source (OS X)](http://get.influxdb.org/influxdb-0.8.8.src.tar.gz)

### v0.8.3

_It is important to note that v0.8.3 was the last release that included the built-in migration code from v0.7.x. If you are trying to upgrade from v0.7.x and migrate your data, you should upgrade to this version first. Details on how to perform the migration can be found [here](http://influxdb.com/docs/v0.8/advanced_topics/upgrading.html).

- [RedHat/CentOS (64-bit)](http://get.influxdb.org/influxdb-0.8.3-1.x86_64.rpm)
- [RedHat/CentOS (32-bit)](http://get.influxdb.org/influxdb-0.8.3-1.i686.rpm)
- [Debian/Ubuntu (64-bit)](http://get.influxdb.org/influxdb_0.8.3_amd64.deb)
- [Debian/Ubuntu (32-bit)](http://get.influxdb.org/influxdb_0.8.3_i686.deb)
- [Source (32-bit)](http://get.influxdb.org/influxdb-0.8.3.386.tar.gz)
- [Source (64-bit)](http://get.influxdb.org/influxdb-0.8.3.amd64.tar.gz)
- [Source (OS X)](http://get.influxdb.org/influxdb-0.8.3.src.tar.gz)