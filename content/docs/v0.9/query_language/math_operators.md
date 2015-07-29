---
title: Mathematical Operators
aliases:
  - /docs/v0.9/query_language/math_operators.html
---

**Note:** Currently all mathematical operators work soley on `floats`. Any operation performed on an `int` will return a `null` value.

Mathematical operators follow the standard order of operations. That is, *parentheses* take precedence to **division** and **multiplication**, which takes precedence to **addition** and **substraction**.

## Supported Operators

**Note:** Any expression that involves adding, subtracting, or dividing by 0 yields a `null` value.

### Addition

You can add a constant.

```
SELECT A + 5 FROM add
```

You can add together other field keys.

```
SELECT A + B FROM add
```

### Subtraction

You can subtract a constant.

```
SELECT 1 - A FROM sub
```

You can subtract one field key from another field key.

```
SELECT A + B FROM add
```

### Multiplication

You can multiply by a constant.

```
SELECT 10 * A FROM mult
```

You can multiply by other field keys.

```
SELECT A * B * C FROM mult
```

Multiplication distributes across other operators
```
SELECT 10 * (A + B + C) FROM mult
```

```
SELECT 10 * (A - B - C) FROM mult
```

```
SELECT 10 * (A + B - C) FROM mult
```

### Division
You can divide by a constant.

```
SELECT 10 / A FROM div
```

You can divide by other field keys.

```
SELECT A / B FROM div
```

Division distributes across other operators
```
SELECT 10 / (A + B + C) FROM mult
```

## Operators with Functions

The use of mathematical operators inside of function calls is currently unsupported.

For example

```sql
SELECT 10 * mean(value) FROM cpu
```
will work, however
```sql
SELECT mean(10 * value) FROM cpu
```
will yield a parse error.

## Unsupported Operators

### Inequalities

Using any of `=`,`!=`,`<`,`>`,`<=`,`>=` will yield empty results for all types.

### Miscellaneous

Using any of `%`, `^` will yield a parse error.

## Logical Operators are Unsupported

Using any of `&`,`|`,`!|`,`NAND`,`XOR`,`NOR` will yield parse error.

Additionally using `AND`, `OR` in the `SELECT` clause of a query will not behave as mathematical operators and simply yield empty results.
