var DataTable = React.createClass(
{
    columns: [
    {
        key: "symbol",
        label: "Symbol"
    },
    {
        key: "percentValue",
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
        key: "dividendYield",
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

    createRow: function(symbol, i)
    {
        var cells = [];

        cells.push(React.createElement(Reactable.Td,
        {
            key: "0",
            column: "symbol"
        }, symbol));

        var myData = this.state.data[symbol];

        if (myData)
        {
            for (var j = 1; j < this.columns.length; j++)
            {
                var column = this.columns[j];
                cells.push(this.createNumberCell(j, column.key,
                        myData[column.key]));
            }
        }
        else
        {
            for (var j = 1; j < this.columns.length; j++)
            {
                var column = this.columns[j];
                cells.push(this.createEmptyCell(j, column.key));
            }
        }

        return React.createElement(Reactable.Tr,
        {
            key: i
        }, cells);
    },

    getInitialState: function()
    {
        return (
        {
            data: {}
        });
    },

    getDataFor: function(symbol)
    {
        var data = this.state.data;
        var answer = data[symbol];

        if (!answer)
        {
            answer = {};
            data[symbol] = answer;
        }

        return answer;
    },

    receiveKeyStatisticsData: function(keyStats)
    {
        InputValidator.validateNotNull("keyStats", keyStats);

        var symbol = keyStats.getSymbol();
        var myData = this.getDataFor(symbol);

        myData.symbol = symbol;
        myData.percentValue = keyStats.get52WeekPricePercent();
        myData.freeCashFlow = keyStats.getFreeCashFlow().number;
        myData.forwardPE = keyStats.getForwardPE().number;
        myData.dividendYield = keyStats.getDividendYield().number;

        this.setState(
        {
            data: this.state.data
        });
    },

    receivePerformanceData: function(performance)
    {
        InputValidator.validateNotNull("performance", performance);

        var symbol = performance.getSymbol();
        var myData = this.getDataFor(symbol);

        myData.symbol = symbol;
        myData.oneYearTotalReturn = performance.getOneYearTotalReturn();
        myData.threeYearTotalReturn = performance.getThreeYearTotalReturn();
        myData.fiveYearTotalReturn = performance.getFiveYearTotalReturn();
        myData.tenYearTotalReturn = performance.getTenYearTotalReturn();

        this.setState(
        {
            data: this.state.data
        });
    },

    render: function()
    {
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
