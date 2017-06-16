define(function()
{
   "use strict";

   function EntityFilter(columnKey, values)
   {
      InputValidator.validateNotNull("columnKey", columnKey);
      InputValidator.validateNotNull("values", values);

      this.columnKey = function()
      {
         return columnKey;
      };

      this.values = function()
      {
         return values;
      };

      this.passes = function(data)
      {
         InputValidator.validateNotNull("data", data);

         var answer = false;

         var value = data[columnKey];

         if (Array.isArray(value))
         {
            if (values.length === 0)
            {
               answer = true;
            }
            else
            {
               answer = false;
               values.forEach(function(v)
               {
                  answer = answer || (Array.isArray(value) && value.includes(v));
               });
            }
         }
         else
         {
            answer = values.length === 0 || values.includes(value);
         }

         return answer;
      };

      this.toObject = function()
      {
         return (
         {
            type: "EntityFilter",
            columnKey: columnKey,
            values: values,
         });
      };

      this.toString = function()
      {
         return "EntityFilter (" + columnKey + " in [" + values + "])";
      };
   }

   EntityFilter.fromObject = function(object)
   {
      InputValidator.validateNotNull("object", object);

      var columnKey = object.columnKey;
      var values = object.values;

      return new EntityFilter(columnKey, values);
   };

   return EntityFilter;
});
