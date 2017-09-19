// require("Logger");

/*
 * Provides methods for input validation.
 */
var InputValidator = {
   EMPTY: " is null or empty.",
   NULL: " is null.",
   UNDEFINED: " is undefined.",

   isArray: function(object)
   {
      return Array.isArray(object);
   },

   isNumber: function(n)
   {
      return !isNaN(parseFloat(n)) && isFinite(n);
   },

   validateInRange: function(objectName, object, low, high)
   {
      this.validateIsNumber(objectName, object);

      if (object < low || high < object)
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is out of range [" + low + ", " + high + "]: " +
            object;
      }
   },

   validateIsArray: function(objectName, object)
   {
      if (!Array.isArray(object))
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is not an array: " + object;
      }
   },

   validateIsBoolean: function(objectName, object)
   {
      if (typeof object !== "boolean")
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is not a boolean: " + object;
      }
   },

   validateIsFunction: function(objectName, object)
   {
      if (typeof object !== "function")
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is not a function: " + object;
      }
   },

   validateIsNumber: function(objectName, object)
   {
      if (typeof object !== "number")
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is not a number: " + object;
      }
   },

   validateIsString: function(objectName, object)
   {
      if (typeof object !== "string")
      {
         LOGGER.error(new Error().stack);
         throw objectName + " is not a string: " + object;
      }
   },

   validateNotEmpty: function(objectName, object)
   {
      if (InputValidator.isArray(object))
      {
         if (object.length == 0)
         {
            // Empty array.
            LOGGER.error(new Error().stack);
            throw objectName + InputValidator.EMPTY;
         }
      }
      else if (InputValidator.isNumber(object))
      {
         // Valid.
      }
      else if (object === true || object === false)
      {
         // Valid.
      }
      else
      {
         if (!object)
         {
            LOGGER.error(new Error().stack);
            throw objectName + InputValidator.EMPTY;
         }
      }
   },

   validateNotNull: function(objectName, object)
   {
      if (object === undefined)
      {
         LOGGER.error(new Error().stack);
         throw objectName + InputValidator.UNDEFINED;
      }

      if (object === null)
      {
         LOGGER.error(new Error().stack);
         throw objectName + InputValidator.NULL;
      }
   }
};
