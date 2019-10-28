'use strict';

module.exports = function ProcessOutputDataObject(dataObjectDef, _ref) {
  var {
    environment
  } = _ref;
  var {
    id,
    type,
    name,
    behaviour,
    parent
  } = dataObjectDef;
  var source = {
    id,
    name,
    type,
    behaviour,
    parent,

    read(broker, exchange, routingKeyPrefix, messageProperties) {
      var value = environment.variables.data && environment.variables.data[id];
      return broker.publish(exchange, "".concat(routingKeyPrefix, "response"), {
        id,
        name,
        type,
        value
      }, messageProperties);
    },

    write(broker, exchange, routingKeyPrefix, value, messageProperties) {
      environment.variables.data = environment.variables.data || {};
      environment.variables.data[id] = value;
      environment.output.data = environment.output.data || {};
      environment.output.data[id] = value;
      return broker.publish(exchange, "".concat(routingKeyPrefix, "response"), {
        id,
        name,
        type,
        value
      }, messageProperties);
    }

  };
  return source;
};