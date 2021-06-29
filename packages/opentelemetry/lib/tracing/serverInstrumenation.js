import { HttpInstrumentation, HttpInstrumentationConfig } from '@opentelemetry/instrumentation-http'; // eslint-disable-line no-unused-vars
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { InstrumentationBase } from '@opentelemetry/instrumentation'; // eslint-disable-line no-unused-vars
import _ from 'lodash';
import { ClientRequest, ServerResponse } from 'http'; // eslint-disable-line no-unused-vars

class ServerInstrumentation {
  constructor () {
    this._httpInstrumentation = new HttpInstrumentation();
    this._expressInstrumentation = new ExpressInstrumentation();
    this._httpCurrentConfig = {
      ignoreIncomingPaths: [],
      ignoreOutgoingUrls: [],
      applyCustomAttributesOnSpan: {}
    };
  }

  /**
   * refresh the current httpInstrumentation with _httpCurrentConfig
   */
  refreshHttpInstrumentation () {
    this._httpInstrumentation.setConfig(this._httpCurrentConfig);
  }

  /**
   * get the server instrumentation instances as an array
   * @return {[InstrumentationBase]}
   */
  get instrumentations () {
    return [this._httpInstrumentation, this._expressInstrumentation];
  }

  /**
   * get the current http config
   * @return {HttpInstrumentationConfig}
   */
  get httpCurrentConfig () {
    return _.cloneDeep(this._httpCurrentConfig);
  }

  /**
   * set the current http config
   * @param {HttpInstrumentationConfig} config
   */
  set httpCurrentConfig (config) {
    this._httpCurrentConfig = config;
  }

  /**
   * Optionally add a ignore string or a regex to avoid instrumenting that incoming path which matches the string or regex
   * @param {string | RegExp} path  the incoming path to be ignored
   */
  addIncomingIgnoreMatchers (path) {
    this._httpCurrentConfig.ignoreIncomingPaths.push(path);
    this.refreshHttpInstrumentation();
  }

  /**
   * Optionally add a ignore string or a regex to avoid instrumenting that outgoing url which matches the string or regex
   * @param {string | RegExp} url the outgoing url (string or regex) to be ignored
   */
  addOutgoingUrlIgnoreMatchers (url) {
    this._httpCurrentConfig.ignoreOutgoingUrls.push(url);
    this.refreshHttpInstrumentation();
  }

  /**
   * Optionally add a servername to add as an attribute to the span
   * @param {string} name
   */
  updateServerName (name) {
    this._httpCurrentConfig.serverName = name;
    this.refreshHttpInstrumentation();
  }

  /**
   * Http Request Hook
   *
   * @callback HttpRequestHook
   * @param {Span} span - HTTP request Span object.
   * @param {ClientRequest} request - HTTP request object
   */
  /**
   * Optionally add a request hook to intercept any requests and update the attributes
   * @param {HttpRequestHook} hook
   */
  addRequestHook (hook) {
    this._httpCurrentConfig.requestHook = hook;
    this.refreshHttpInstrumentation();
  }


  /**
   * Http Response Hook
   *
   * @callback HttpResponseHook
   * @param {Span} span - HTTP response Span object.
   * @param {ServerResponse} request - HTTP response object
   */
  /**
   * Optionally add a response hook to intercept any requests and update the attributes
   * @param {HttpResponseHook} hook
   */
  addResponseHook (hook) {
    this._httpCurrentConfig.responseHook = hook;
    this.refreshHttpInstrumentation();
  }
}

export { ServerInstrumentation };