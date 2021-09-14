# Appium Opentelemetry Plugin

With Appium 2.0, we can now use opentelemetry as observability tool without bundling it with appium main server

This plugin will help generate http traces automatically once used and also allow dynamic configurations for different exporters such as prometheus, jaeger, zipkin or just basic console logs.

## Installation - Server

Install the plugin using Appium's plugin CLI, either as a named plugin or via NPM (TODO):

```
appium plugin install opentelemetry
appium plugin install --source=npm @browserstack/opentelemetry-plugin
```

Install the plugin using Appium's plugin CLI, locally:

```
appium plugin install <path-to-repo>/packages/opentelemetry --source local
```

## Activation

The plugin will not be active unless turned on when invoking the Appium server:

```
appium --plugins=opentelemetry
```
