import * as _ from "lodash";

/**
 * Get changes in objects
 *
 * @param {object} diff old and new values
 * @param {object} target with target values
 * @returns {object} values which have changed depending on the target
 *
 * @example
 * // returns { f: "test", in: "r" }
 * globalNS.getObjectChanges({ f: "test", in: "r" }, { f: "t", n: "ok" });
 */

export function getObjectChanges(diff, target) {
  function changes(obj, base) {
    return _.transform(obj, (result, value, key) => {
      if (base[key] && !_.isEqual(value, base[key]) || !base[key]) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }

  return changes(diff, target);
}