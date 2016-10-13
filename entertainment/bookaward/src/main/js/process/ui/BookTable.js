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
            key: "nominations",
            label: "Nominations",
            className: "textCell",
},
        {
            key: "library",
            label: "Library Search",
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

        createAmazonSearchUrl: function(subject)
        {
            InputValidator.validateNotNull("subject", subject);

            var searchString = subject.vizziniReplaceAll(" ", "+");

            return "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=" + searchString;
        },

        createAuthorLinkCell: function(key, column, author)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("author", author);

            var url1 = this.createAmazonSearchUrl(author);
            var searchString = author.vizziniReplaceAll(" ", "_");
            var url2 = "https://en.wikipedia.org/wiki/" + searchString;
            var image1 = this.createImageLink(1, url1, "../resources/Amazon14.png", "Amazon");
            var image2 = this.createImageLink(2, url2, "../resources/Wikipedia14.png", "Wikipedia");

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: author,
            }, React.DOM.span(
            {}, author, image1, image2));
        },

        createImageLink: function(key, href, src, title)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("href", href);
            InputValidator.validateNotNull("src", src);
            InputValidator.validateNotNull("title", title);

            return React.DOM.a(
            {
                key: key,
                className: "imageLink",
                href: href,
                target: "_blank",
                title: title,
            }, React.DOM.img(
            {
                src: src,
                title: title,
            }));
        },

        createLibraryLinkCell: function(key, column, nominee)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("nominee", nominee);

            var cells = [];
            var value = "";

            Library.values().forEach(function(libraryKey)
            {
                var library = Library.properties[libraryKey];
                // var searchString = nominee.book.title() + " by " + nominee.book.author();
                var searchString = nominee.book.toString();
                switch (library.value)
                {
                    case Library.AL:
                    case Library.DPL:
                        searchString = searchString.vizziniReplaceAll(" ", "%20");
                        break;
                    case Library.DCL:
                        searchString = searchString.vizziniReplaceAll(" ", "+");
                        break;
                }

                LOGGER.debug("searchString = _" + searchString + "_");
                var url = library.searchPrefix + searchString + library.searchSuffix;
                var image = this.createImageLink(cells.length, url, library.image, library.name);
                cells.push(image);

                // if (cells.length < 2 * Library.values().length - 1)
                // {
                //     cells.push(" ");
                // }

                value += library.shortName + " ";
            }, this);

            var links = React.DOM.span(
            {}, cells);

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: value,
            }, links);
        },

        createLink: function(href, label)
        {
            InputValidator.validateNotNull("href", href);
            InputValidator.validateNotNull("label", label);

            return React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, label);
        },

        createNominationsCell: function(key, column, nominations)
        {
            InputValidator.validateNotNull("key", key);
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("nominations", nominations);

            var rows = [];
            var value = "";

            nominations.forEach(function(nomination)
            {
                var link = this.createLink(nomination.award().url, nomination.award().name);

                var cell = React.DOM.td(
                {}, nomination.year() + " ", link, " " + nomination.category().name);
                value += nomination.year() + " ";
                value += nomination.award().name + " ";
                value += nomination.category().name + " ";

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cell));
            }, this);

            var nominationsTable = React.DOM.table(
            {
                className: "nominationsTable",
            }, React.DOM.tbody(
            {}, rows));

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: value,
            }, nominationsTable);
        },

        createRow: function(nominee, key)
        {
            InputValidator.validateNotNull("nominee", nominee);
            InputValidator.validateNotNull("key", key);

            var cells = [];
            var i = 0;
            cells.push(this.createTitleLinkCell(cells.length, BookColumns[i++], nominee));
            cells.push(this.createAuthorLinkCell(cells.length, BookColumns[i++], nominee.book.author()));
            cells.push(this.createNominationsCell(cells.length, BookColumns[i++], nominee.nominations));
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

            var url = this.createAmazonSearchUrl(nominee.book.toString());
            var title = nominee.book.title();
            var image = this.createImageLink(1, url, "../resources/Amazon14.png", "Amazon");

            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
                value: nominee.book.title(),
            }, React.DOM.span(
            {
                className: "textImageLink",
            }, title, " ", image));
        },
    });

    return BookTable;
});
