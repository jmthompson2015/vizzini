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

            var answer = true;

            if (values.length > 0)
            {
                var value = data[columnKey];

                if (!value || value.length === 0)
                {
                    answer = false;
                }
                else
                {
                    answer = false;

                    var ids = value.map(function(v)
                    {
                        return v.id;
                    });

                    values.forEach(function(v)
                    {
                        answer = answer || (Array.isArray(value) && ids.vizziniContainsUsingEquals(v, this.equals));
                    }, this);
                }
            }

            return answer;
        };

        this.equals = function(a, b)
        {
            return a == b;
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
