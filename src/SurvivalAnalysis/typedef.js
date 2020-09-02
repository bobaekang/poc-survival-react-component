/**
 * @typedef {Object} RisktableDataPoint
 * @property {number} nrisk
 * @property {number} time
 */

/**
 * @typedef {Object} RisktableData
 * @property {string} name
 * @property {RisktableDataPoint[]} data
 */

/**
 * @typedef {Object} SurvivalDataPoint
 * @property {number} prob
 * @property {number} time
 */

/**
 * @typedef {Object} SurvivalData
 * @property {string} name
 * @property {SurvivalDataPoint[]} data
 */

/**
 * @typedef {Object} UserInput
 * @property {string} factorVariable
 * @property {string} stratificationVariable
 * @property {number} timeInterval
 * @property {number} startTime
 * @property {number} endTime
 * @property {boolean} efsFlag
 */

/**
 * @callback UserInputSubmitHandler
 * @param {UserInput} userInput
 * @returns {void}
 */
