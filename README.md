# Appium Plugins

Home for Appium Plugins maintained by the BrowserStack Open Source Program Office

To install checkout individual README for each plugins in the repo


To activate an installed plugin so that it has an effect for the running server, make sure to include it in the list of activated plugins when starting the server:

```
appium --plugins=opentelmetry
```

For information and documentation about each plugin hosted in this repo, head to the individual READMEs:

* [Opentelemetry plugin](packages/opentelemetry) - A plugin designed to automatically generate traces for http events in appium server

# Developer

To run:

```
npm run clean
```

or

```
npm run bootstrap
npm install
npm run build
```

To Test:

```
npm test:unit
```
