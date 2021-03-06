import Const from './PinConst';

/**
 * A collection of helpful utility functions
 */
export default {
    /**
     * Utility function for creating a logging request based on parameter data
     * @param {object} data - key/value pairs of query parameters to log
     */
    log: function(data) {
        const config = window[Const.GLOBAL];
        let query = `?guid=${config.guid}&via=${encodeURIComponent(location.href)}`;
        Object.keys(data).forEach(key => query += `&${key}=${encodeURIComponent(data[key])}`);
        this.loadScript(Const.URL.LOG + query, {});
    },

    /**
     * Utility function for loading a <script>
     * @param {string} src - the script src
     * @param {object} attributes - attributes to add to the <script>
     */
    loadScript: function(src, attributes={}) {
        var script = document.createElement('script');
        script.src = src;
        Object.keys(attributes).forEach(key => {
            script[key] = attributes[key];
        });
        script.onload = () => document.body.removeChild(script);
        document.body.appendChild(script);
    },

    /**
     * Utility function for loading a script with a jsonp callback
     * @param {string} url - the url for the <script> src
     * @param {function} callback - the callback to be called on complete
     */
    fetch: function(url, callback) {
        const config = window[Const.GLOBAL];
        const length = config.callbacks.length;
        const key = `window.${Const.GLOBAL}.callbacks[${length}]`;
        const src = `${url}&callback=${key}`;
        config.callbacks.push(callback);
        this.loadScript(src, {
            id: key,
            type: 'text/javascript',
            charset: 'utf-8'
        });
    },

    /**
     * Utility function for extending an object with other objects
     * @param {object} base - the object to extend
     * @param {array} ...args - the objects to do the extending
     * @returns {object} <base> extended
     */
    extend: function (base, ...args) {
        args.forEach(arg => {
            if (arg && typeof arg === 'object') {
                Object.keys(arg || {}).forEach(key => {
                    base[key] = arg[key];
                });
            }
        });
        return base;
    },

    /**
     * Utility function for autobinding <this> to the function
     * @param {array<string>} args - list of function names to bind
     */
    bind: function(context, ...args) {
        args.forEach(fn => context[fn] = context[fn].bind(context));
    }
}