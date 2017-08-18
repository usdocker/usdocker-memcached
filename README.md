# Useful script for 'memcached' service

This Useful Script creates a memcached server based on a Docker Image.
You don't have know docker to use this solution.

## Start the memcached service

```
usdocker memcached up
```

## Stop the memcached service

```
usdocker memcached down
```

## Check the memcached status

```
usdocker memcached status
```


## Customize your service

You can setup the variables by using:

```bash
usdocker memcached --set variable=value
```

Default values

 - image: "memcached:alpine",
 - folder: "$HOME/.usdocker/data/memcached",
 - port: 11211,
 - memory: 1

