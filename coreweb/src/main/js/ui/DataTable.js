define(function()
{
    "use strict";
    var DataTable = React.createClass(
    {
        propTypes:
        {
            columns: PropTypes.array.isRequired,
            rowData: PropTypes.array.isRequired,

            cellFunctions: PropTypes.object,
            valueFunctions: PropTypes.object,
        },

        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),

        render: function()
        {
            var rowData = this.props.rowData;
            var table = this.createTable(rowData);

            var rows = [];

            var rowCount = "Row Count: " + rowData.length;
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "rowCount",
            }, rowCount)));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {}, table)));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "rowCount",
            }, rowCount)));

            return React.DOM.table(
            {}, React.DOM.tbody(
            {}, rows));
        },

        createRow: function(data, key)
        {
            InputValidator.validateNotNull("data", data);
            InputValidator.validateNotNull("key", key);

            var columns = this.props.columns;
            var cells = [];
            columns.forEach(function(column)
            {
                var value = this.determineValue(column, data);
                var cell = this.determineCell(column, data, value);
                cells.push(this.Td(
                {
                    key: cells.length,
                    className: column.className,
                    column: column.key,
                    value: value,
                }, (cell === undefined ? "" : cell)));
            }, this);

            return this.Tr(
            {
                key: key,
            }, cells);
        },

        createTable: function(rowData)
        {
            InputValidator.validateNotNull("rowData", rowData);

            var columns = this.props.columns;
            var rows = [];

            rowData.forEach(function(data, i)
            {
                rows.push(this.createRow(data, i));
            }.bind(this));

            return this.Table(
            {
                className: "dataTable",
                columns: columns,
                sortable: true,
            }, rows);
        },

        determineCell: function(column, data, value)
        {
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("data", data);

            var answer;
            var cellFunctions = this.props.cellFunctions;

            if (cellFunctions && cellFunctions[column.key])
            {
                answer = cellFunctions[column.key](data);
            }
            else
            {
                answer = value;
            }

            return answer;
        },

        determineValue: function(column, data)
        {
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("data", data);

            var answer;
            var valueFunctions = this.props.valueFunctions;

            if (valueFunctions && valueFunctions[column.key])
            {
                answer = valueFunctions[column.key](data);
            }
            else
            {
                answer = data[column.key];
            }

            return answer;
        },
    });

    return DataTable;
});
