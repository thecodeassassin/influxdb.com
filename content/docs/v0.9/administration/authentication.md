---
title: Authentication
aliases:
  - /docs/v0.9/concepts/authentication_and_authorization.html
---

The InfluxDB HTTP API includes simple, built-in authentication based on user credentials. When authentication is enabled and configured, only HTTP requests sent with valid credentials will be executed.

Authentication is __disabled__ by default and all HTTP requests will be executed.

_Note: Authentication only occurs at the HTTP request scope. See the [Authorization](authorization.html) page for information on setting access privileges._

## Setting up authentication

When authentication is enabled, every request must be accompanied by a valid username and the correct password for that username.

<!-- ISSUE: There is no warning that authentication does not occur when authentication is enabled and no user exists. https://github.com/influxdb/influxdb/issues/3107 -->

If no users exists, InfluxDB will __not__ enforce authentication. Once at least one user exists, authentication is enforced. This is meant to make bootstrapping an authenticated instance easier. Creating the first user as an [admin user]({{< relref "docs/v0.9/administration/authorization.md#privilege-control" >}}) is recommended.

## Enable authentication

To enable authentication, set the `auth-enabled` option to `true` in the `[http]` section of the configuration file (shown below) and restart `influxd`.

```
[http]
  ...
  auth-enabled = true
  ...
```

### Authenticating requests

When authentication is enabled, user credentials must be supplied with every request via one of following two methods:

- _query parameters in the URL_, with `u` set as the username and `p` set as the password.
- _Basic Authentication_, as described in [RFC 2617, Section 2](http://tools.ietf.org/html/rfc2617)

If both are present in the same request, user credentials specified in the URL query parameters take precedence over those specified in Basic Auth.

User credentials are checked on every request.  If the request supplies valid credentials for an existing user, the request is processed. Otherwise, the request is rejected and returns a `401 Unauthorized` HTTP error code. An authenticated request may still fail if the user is not [authorized](authentication.html) to execute the requested operation.

_Example_

Send a request with user credentials via query parameters.

```
curl -G http://localhost:8086/query --data-urlencode "u=mydb_username" --data-urlencode "p=mydb_password" --data-urlencode "q=CREATE DATABASE mydb"
```

Send a request with user credentials via _Basic Authentication_.

```
curl -G http://localhost:8086/query -u mydb_username:mydb_password --data-urlencode "q=CREATE DATABASE mydb"
```

_Note: The example above will fail if the user is not an admin user. Only admin users are allowed to create databases. See the [authorization page](authorization.html) for information on privileges._ 

## Error messages

When auth is enabled, all HTTP requests with invalid credentials will receive a `HTTP 401 Unauthorized` response.

## Security in production environments

Authentication and authorization should not be relied upon to prevent access and protect data from malicious actors.  If additional security or compliance features are desired, InfluxDB should be run behind a third-party service.

## Authentication for services

Service endpoints (Graphite, collectd, etc.) are not authenticated.
