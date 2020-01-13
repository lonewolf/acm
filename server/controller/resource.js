const resourceService = require('../service/resource');
const Netmask = require('netmask').Netmask;

/**
 * Create the resource in resource collection.
 */
exports.create = function (req, res, next) {
    const body = new Resource(req.body);

    if (!body.name) {
        res.status(400).send('Resource name is missing');
        return;
    }

    const RegEx = /^[a-z0-9]+$/i;
    if (!RegEx.test(body.name)){
        res.status(400).send('Resource name is not alphanumeric');
        return;
    }

    if (!body.context) {
        res.status(400).send('Resource context is missing');
        return;
    }

    if (!body.location || !body.ipRange) {
        res.status(403).send('Resource location or Resource ipRange is missing');
        return;
    }

    resourceService.createResource(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            var status = 400;
            var errorMsg = error;
            if (error.code === 11000){
                var status = 409;
                var errorMsg = 'Duplicate Resource Name';
            }
            res.status(status).send(errorMsg);
        }
    });
}

/**
 * Find resource from resource collection.
 */
exports.find = function (req, res, next) {

    const params = req.params || {};
    const ip = req.query.ip || {};
    const query = {
        name: params.name,
    };

    if (!query) {
        res.status(400).send({"message":"Bad Request"});
        return;
    }

    resourceService.findResource(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }

        if (!response) {
            res.send({"message":"Data not found"});
            return;
        }

        const ipRange = response.ipRange;
        const inIpRange = [];

        ipRange.forEach(inIp => {
            let block = new Netmask(inIp);
            if (block.contains(ip)){
                inIpRange.push(inIp);
            }
        });

        if (inIpRange.length){
            console.log(inIpRange);
            res.status(200).send({"context": response.context});
        }else {
            res.status(403).send('Not allowed');
        }
    });
};

class Resource {
    constructor(resourceData) {
        this.name = resourceData.name || '';
        this.context = resourceData.context || '';
        this.ipRange = resourceData.ipRange || '';
        this.location = resourceData.location || '';
    }
}
