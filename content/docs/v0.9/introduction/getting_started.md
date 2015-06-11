---
title: Getting Started with InfluxDB
---

# Getting Started

With [InfluxDB installed](installation.html), you're ready to start doing awesome things. In this section we'll use the `influx` command line interface (CLI) included in all InfluxDB packages to quickly interact with the database.

The CLI communicates with InfluxDB by making requests to the InfluxDB API. All clients currently interact with InfluxDB through the API except for [services](), which are directly integrate with the database.

_Note: The database can also be used by directly making requests to the API. See [Reading and Writing Data](../concepts/reading_and_writing_data.html) for examples._

## Logging in and creating your first database
If you've installed InfluxDB locally, the `influx` command should be available via the command line. Executing `influx` will start the CLI and automatically connect to the local InfluxDB instance. The out put should look like this:

```
$ influx
> Connected to http://localhost:8086 version 0.9.0-rc32
> InfluxDB shell 0.9.0-rc32
> 
```

_Note: The InfluxDB HTTP API runs on port `8086` by default. Therefore, `influx` will connect to port `8086` and `localhost` by default._

The command line is now ready to take input in the form of Influx Query Language (a.k.a InfluxQL) statements. To exit the InfluxQL shell, type `ctrl` + `D` on your keyboard.

A fresh install of InfluxDB starts with no databases set up so creating a new database is the first thing to do. A database can be created using the `CREATE DATABASE <db-name>` InfluxQL statement, where `<db-name>` is the name of the database you wish to create. Names of databases can contain any unicode character if it's double-quoted. Names can be left unquoted if they contain only ASCII letters, digits, or underscores begin with an ASCII letter or underscore.

For this guide, we'll create the database `mydb`.

```
> CREATE DATABASE mydb
> 
```

_Note: After hitting enter, a new prompt appears and nothing else is displayed. In the CLI, this means the statement was executed and there were no errors to display. There will always be an error displayed if something went wrong._

The `SHOW DATABASES` statement can be used to show all existing databases.

```
> SHOW DATABASES
name: databases
---------------
name
mydb

> 
```

Most InfluxQL statements require a database to be specified in the command. The CLI provides a convenient statement, `USE <db-name>`, which will automatically set the database for all future requests.

```
> USE mydb
Using database mydb
> 
```

## Writing and exploring data

With a newly minted database, InfluxDB is ready to accept queries and writes.

Let's write a little data in to see how things work. Data in InfluxDB is organized by `time series`, which describes a measurement, like "cpu_load" or "temperature". Time series have zero to many `points` which contain the data. Points consist of a timestamp (labelled `time`), a measurement name, at least one `field` (the measurement itself), and zero to many key-value `tags` containing metadata. Conceptually you can think of a measurement as an SQL table, with rows where the primary index is always time. The difference is that with InfluxDB you can have millions of measurements, you don't have to define schemas up front, and null values aren't stored.

Points are written to InfluxDB using line protocol, which follows the following format:

```
<measurement>[,<tag-key>=<tag-value>...] <field-key>=<field-value>[,<field2-key>=<field2-value>...] [unix-nano-timestamp]
```

The following lines are all examples of points that can be written to InfluxDB:

```
cpu,host=serverA,region=us-west value=0.64
payment,device=mobile,product=Notepad,method=credit billed=33,licenses=3
stock,symbol=AAPL bid=127.46,ask=127.48
temperature,machine=unit42,type=assembly external=25,internal=37
```

_Note: Measurements, tags, and field names containing any character other than (A-Z,a-z,0-9,_) or starting with a digit must be double-quoted. More information on the line protocol can be found on the [Reading and Writing Data](../concepts/reading_and_writing_data.html) page._

To insert a single time-series datapoint into InfluxDB using the CLI, enter `INSERT` followed by a point:

```
> INSERT cpu,host=serverA,region=us-west value=0.64
>
```

A point with the measurement name of `cpu` and tags `host` has now been written to the database.

And now let's take a look at how we query for this data.

```sql
> SELECT * FROM cpu
name: cpu
tags: host=serverA, region=us-west
time                value
----                -----
2015-06-11T16:02:54.830398489Z  0.64

> 
```

Let's try storing a different type of data -- sensor data. Enter the following data in the `Values` textbox:

```
> INSERT temperature,machine=unit42,type=assembly external=25,internal=37
```

Note that in this example we write two values in the `fields` object. Up to 255 different values can be stored as `fields`.

Resulting fields will get returned on query:

```
> select * from temperature
name: temperature
tags: machine=unit42, type=assembly
time                external    internal
----                --------    --------
2015-06-11T16:04:52.653752331Z  25      37

>
```

InfluxDB supports a sophisticated query language, allowing many different types of queries. For example:

```sql
> SELECT * FROM /.*/ LIMIT 1
--
> SELECT * FROM cpu_load_short
--
> SELECT * FROM cpu_load_short WHERE value > 0.9
```

This is all you need to know to write data into InfluxDB and query it back. Of course, to write significant amounts of data you will want to access the HTTP API directly, or use one of the many client libraries. 
