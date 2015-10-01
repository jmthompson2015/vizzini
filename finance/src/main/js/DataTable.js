var DataTable = React.createClass(
{
    columns: [
    {
        key: "symbol",
        label: "Symbol"
    },
    {
        key: "52WeekPricePercent",
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
        return React.createElement(Reactable.Td,
        {
            key: key,
            column: column,
            className: "numberCell"
        }, value);
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
            cells.push(this.createNumberCell("1", "52WeekPricePercent",
                    myData.percentValue));
            cells.push(this.createNumberCell("2", "freeCashFlow",
                    myData.freeCashFlow));
            cells.push(this
                    .createNumberCell("3", "forwardPE", myData.forwardPE));
            cells.push(this.createNumberCell("4", "dividendYield",
                    myData.dividendYield));
        }
        else
        {
            cells.push(this.createEmptyCell("1", "52WeekPricePercent"));
            cells.push(this.createEmptyCell("2", "freeCashFlow"));
            cells.push(this.createEmptyCell("3", "forwardPE"));
            cells.push(this.createEmptyCell("4", "dividendYield"));
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

    receiveData: function(keyStats)
    {
        InputValidator.validateNotNull("keyStats", keyStats);

        var symbol = keyStats.getSymbol();
        var data = this.state.data;

        data[symbol] =
        {
            symbol: symbol,
            percentValue: keyStats.get52WeekPricePercent(),
            freeCashFlow: keyStats.getFreeCashFlow().number,
            forwardPE: keyStats.getForwardPE().number,
            dividendYield: keyStats.getDividendYield().number
        }

        this.setState(
        {
            data: data
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
