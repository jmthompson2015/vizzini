/*
 * Provides a user interface to display and interact with a list of foods.
 */
var FoodTable = React.createClass(
{
    columns: FoodProperty.createColumnsArray(),

    displayValue: function(value)
    {
        return (value === undefined ? "" : value);
    },

    createAddAction: function(food)
    {
        var addFunction = this.props.addFunction;
        var myOnClick = function(event)
        {
            LOGGER.debug("food = " + food.brand + " " + food.name);
            addFunction(food);
        };
        var image = React.DOM.img(
        {
            src: "../resources/add.png"
        });

        return React.DOM.a(
        {
            href: "#",
            className: "addButton",
            onClick: myOnClick
        }, image);
    },

    createCell: function(food, column, i, actionFunction)
    {
        var col = column.key;

        if (col === "action")
        {
            return React.createElement(Reactable.Td,
            {
                key: i,
                className: column.className,
                column: col
            }, actionFunction);
        }
        else
        {
            return React.createElement(Reactable.Td,
            {
                key: i,
                className: column.className,
                column: col
            }, this.displayValue(food[col]));
        }
    },

    createRemoveAction: function(food)
    {
        var removeFunction = this.props.removeFunction;
        var myOnClick = function(event)
        {
            LOGGER.debug("food = " + food.brand + " " + food.name);
            removeFunction(food);
        };
        var image = React.DOM.img(
        {
            src: "../resources/delete.png"
        });

        return React.DOM.a(
        {
            href: "#",
            className: "removeButton",
            onClick: myOnClick
        }, image);
    },

    createRow: function(food, i)
    {
        var isAdding = this.props.isAdding;
        var actionFunction = (isAdding ? food["addAction"]
                : food["removeAction"]);
        var self = this;
        var cells = this.columns.map(function(column, j)
        {
            return self.createCell(food, column, j, actionFunction);
        });

        return React.createElement(Reactable.Tr,
        {
            key: i
        }, cells);
    },

    createTotalsRow: function()
    {
        var sums = {};
        var values = FoodProperty.numberValues();

        values.forEach(function(property)
        {
            sums[property] = 0;
        });

        var foods = this.props.foods;

        foods.forEach(function(food)
        {
            values.forEach(function(property)
            {
                sums[property] += FoodUtilities.safeNumber(food[property]);
            });
        });

        var columns = [];
        columns.push(React.DOM.td(
        {
            key: "00",
            colSpan: "6"
        }, "Totals"));
        values.forEach(function(property, i)
        {
            columns.push(React.DOM.td(
            {
                key: i
            }, sums[property]));
        });
        columns.push(React.DOM.td(
        {
            key: "000"
        }, ""));

        return React.DOM.tr(null, columns);
    },

    render: function()
    {
        var isAdding = this.props.isAdding;
        var foods = this.props.foods;
        var self = this;

        // Assign actions.
        foods.forEach(function(food)
        {
            if (isAdding && !food.addAction)
            {
                food.addAction = self.createAddAction(food);
            }

            if (!isAdding && !food.removeAction)
            {
                food.removeAction = self.createRemoveAction(food);
            }
        });

        LOGGER.debug("foods.length = " + foods.length);
        var rows = foods.map(function(food, i)
        {
            return self.createRow(food, i);
        });

        LOGGER.debug("rows.length = " + rows.length);
        var showTotals = this.props.showTotals;
        LOGGER.debug("showTotals ? " + showTotals);
        var answer;

        if (showTotals)
        {
            var footer = React.createElement(Reactable.Tfoot,
            {
                key: "footer"
            }, this.createTotalsRow());

            answer = React.createElement(Reactable.Table,
            {
                className: "foodTable",
                columns: this.columns,
                sortable: true
            }, [ rows, footer ]);
        }
        else
        {
            answer = React.createElement(Reactable.Table,
            {
                className: "foodTable",
                columns: this.columns,
                sortable: true,
                filterable: [ "type" ]
            }, rows);
        }

        return answer;
    },
});
