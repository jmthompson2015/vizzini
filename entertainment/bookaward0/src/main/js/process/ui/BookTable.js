define(["Library"], function(Library)
{
    "use strict";

    var BookColumns = [
        {
            key: "title",
            label: "Title",
            className: "textCell",
},
        {
            key: "author",
            label: "Author",
            className: "textCell",
},
        {
            key: "award",
            label: "Award",
            className: "textCell",
},
        {
            key: "year",
            label: "Year",
            className: "numberCell",
},
        {
            key: "category",
            label: "Category",
            className: "textCell",
},
        {
            key: "library",
            label: "Library",
            className: "textCell",
},
];

    var BookTable = React.createClass(
    {
        propTypes:
        {
            nominees: React.PropTypes.array.isRequired,
        },

        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),

        render: function()
        {
            var nominees = this.props.nominees;
            var rows = [];

            nominees.forEach(function(nominee, i)
            {
                rows.push(this.createRow(nominee, i));
            }.bind(this));

            var table = this.Table(
            {
                className: "dataTable",
                columns: BookColumns,
                sortable: true,
            }, rows);

            var rows2 = [];

            var rowCount = "Row Count: " + nominees.length;
            rows2.push(React.DOM.tr(
            {
                key: rows2.length
            }, React.DOM.td(
            {
                className: "rowCount"
            }, rowCount)));
            rows2.push(React.DOM.tr(
            {
                key: rows2.length
            }, React.DOM.td(
            {}, table)));

            return React.DOM.table(
            {}, React.DOM.tbody(
            {}, rows2));
        },

        createAuthorLinkCell: function(key, column, author)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("author", author);

            var searchString = author.vizziniReplaceAll(" ", "_");
            var url = "https://en.wikipedia.org/wiki/" + searchString;
            var link = this.createLink(url, author);

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: author,
            }, link);
        },

        createAwardLinkCell: function(key, column, award)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("award", award);

            var link = this.createLink(award.url, award.name);

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: award.name,
            }, link);
        },

        createCell: function(key, column, value, displayValue)
        {
            var myDisplayValue = (displayValue ? displayValue : value);

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: value,
            }, myDisplayValue);
        },

        createLibraryLinkCell: function(key, column, nominee)
        {
            var cells = [];
            var value = "";

            Library.values().forEach(function(libraryKey)
            {
                var library = Library.properties[libraryKey];
                var searchString = nominee.title() + " by " + nominee.author();
                switch (library.value)
                {
                    case Library.ALD:
                    case Library.DPL:
                        searchString = searchString.vizziniReplaceAll(" ", "%20");
                        break;
                    case Library.DCL:
                        searchString = searchString.vizziniReplaceAll(" ", "+");
                        break;
                }
                LOGGER.debug("searchString = _" + searchString + "_");
                var url = library.searchPrefix + searchString + library.searchSuffix;
                LOGGER.debug("url = _" + url + "_");
                var link = this.createLink(url, library.shortName);
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    title: library.name,
                }, link));
                value += library.shortName + " ";
            }, this);

            var row = React.DOM.tr(
            {}, cells);
            var linksTable = React.DOM.table(
            {
                className: "linksTable",
            }, React.DOM.tbody(
            {}, row));

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: value,
            }, linksTable);
        },

        createLink: function(href, label)
        {
            return React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, label);
        },

        createRow: function(nominee, key)
        {
            var cells = [];
            var i = 0;
            cells.push(this.createTitleLinkCell(cells.length, BookColumns[i++], nominee));
            cells.push(this.createAuthorLinkCell(cells.length, BookColumns[i++], nominee.author()));
            cells.push(this.createAwardLinkCell(cells.length, BookColumns[i++], nominee.award()));
            cells.push(this.createCell(cells.length, BookColumns[i++], nominee.year()));
            cells.push(this.createCell(cells.length, BookColumns[i++], nominee.category().name));
            cells.push(this.createLibraryLinkCell(cells.length, BookColumns[i++], nominee));

            return this.Tr(
            {
                key: key,
            }, cells);
        },

        createTitleLinkCell: function(key, column, nominee)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("nominee", nominee);

            // https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=Red+Sparrow
            var searchString = nominee.title().vizziniReplaceAll(" ", "+") +
                "+by+" + nominee.author().vizziniReplaceAll(" ", "+");
            var url = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=" + searchString;
            var link = this.createLink(url, nominee.title());

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: nominee.title(),
            }, link);
        },
    });

    return BookTable;
});
