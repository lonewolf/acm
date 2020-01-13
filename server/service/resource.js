(function () {
    const mongoose = require('mongoose');
    const resource = mongoose.model('Resource');
    /**
     * Execute the create query to create the resources.
     * @param {*} data resource data
     * @param {*} callback callback function.
     */
    exports.createResource = function (data, callback) {
        resource.create(data).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

    /**
     * Funtion to find the resource from collections.
     * @param {*} query condition or expression to find the resource from collection.
     * @param {*} callback callback function
     */
    exports.findResource = function (query, callback) {
        resource.findOne(query, callback);
    }

})();