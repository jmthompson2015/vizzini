define(function()
{
    "use strict";
    var DataTable = React.createClass(
    {
        columns: [
        {
            key: "symbol",
            label: "Symbol"
        },
        {
            key: "fiftyTwoWeekPricePercent",
            label: "Price % of 52 Week Range"
        },
        {
            key: "freeCashFlow",
            label: "Free Cash Flow ($B)"
        },
        {
            key: "forwardPE",
            label: "Forward P/E"
        },
        {
            key: "forwardAnnualDividendYield",
            label: "Forward Annual Dividend Yield (%)"
        },
        {
            key: "oneYearTotalReturn",
            label: "1-Year Total Return (%)"
        },
        {
            key: "threeYearTotalReturn",
            label: "3-Year Total Return (%)"
        },
        {
            key: "fiveYearTotalReturn",
            label: "5-Year Total Return (%)"
        },
        {
            key: "tenYearTotalReturn",
            label: "10-Year Total Return (%)"
        } ],

        createEmptyCell: function(key, column)
        {
            return React.createElement(Reactable.Td,
            {
                key: key,
                column: column
            }, "");
        },

        createNumberCell: function(key, column, value)
        {
            var myValue = (value ? value : "");
            return React.createElement(Reactable.Td,
            {
                key: key,
                column: column,
                className: "numberCell"
            }, myValue);
        },

        createRow: function(symbol, key)
        {
            var cells = [];

            cells.push(React.createElement(Reactable.Td,
            {
                key: cells.length,
                column: "symbol",
                value: symbol,
            }, React.DOM.a(
            {
                href: "http://finance.yahoo.com/q?s=" + symbol,
                target: "_blank",
            }, symbol)));

            var myData0 = this.props.keyStatistics[symbol];
            var myData1 = this.props.performance[symbol];

            for (var j = 1; j < this.columns.length; j++)
            {
                var column = this.columns[j];

                if (j < 5 && myData0)
                {
                    cells.push(this.createNumberCell(cells.length, column.key, myData0[column.key]));
                }
                else if (j >= 5 && myData1)
                {
                    cells.push(this.createNumberCell(cells.length, column.key, myData1[column.key]));
                }
                else
                {
                    cells.push(this.createEmptyCell(cells.length, column.key));
                }
            }

            return React.createElement(Reactable.Tr,
            {
                key: key,
            }, cells);
        },

        render: function()
        {
            InputValidator.validateNotNull("symbols", this.props.symbols);
            InputValidator.validateNotNull("keyStatistics", this.props.keyStatistics);
            InputValidator.validateNotNull("performance", this.props.performance);

            var symbols = this.props.symbols;
            var rows = [];

            symbols.forEach(function(symbol, i)
            {
                rows.push(this.createRow(symbol, i));
            }.bind(this));

            return React.createElement(Reactable.Table,
            {
                className: "dataTable",
                columns: this.columns,
                sortable: true
            }, rows);
        },
    });

    return DataTable;
});
