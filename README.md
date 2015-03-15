# Triptease stathat alert nodejs test

This repo contains some code that was thrown togehter quickly with by
someone quite new to JavaScript and node. It's your job to refactor it into
something a little better.

Consider

* The interface
* Testability
* Code reuse
* Project structure
* Adding an export function that would dump the stats along with their
  alerts to a static file (which could then be imported in the future).

Process:

Timebox yourself to 2 hours.

* Fork the repo
* Create a branch
* Submit the code as a pull request along with any notes (such as things
  you would have improved or done if you had more time).

## Installation

```
$ npm install
```

## Usage

### Listing all stats:

```
$ node stathat_old.js statlist
```

### Listing all alerts:

```
$ node stathat_old.js list
```

### Filtering the alerts list

```
$ node stathat_old.js list user
```

### Show details

```
$ node stathat_old.js detail XQBp
```

### Delete alert

```
$ node stathat_old.js delete 264e
```

### Create alert:

There are 3 types of alerts:

- data alerts;
- value alerts;
- delta alerts.

Every each type has different set of parameters.

- time_window must be something like: 5m, 1h, 1d, 1w, 1M, 1y;
- operators are: "greater than", "less than". For "delta" alert there is also "different than".

For example if you want to create data alert for stat with id K3dl, with time_window "1h" execute:

```
$ node stathat_old.js create K3dl data 1h
```

To create value alert for stat id K3dl, time_window "1y", threshold to compare to "greater than 500"

```
$ node stathat_old.js create K3dl value 1y greater than 500
```

To create delta alert for stat id K3dl, time_window "1w", percentage "10%", operator "greater than" and time_delta "1w" execute:

```
$ node stathat_old.js create K3dl delta 1w 10 greater than 1w
```
