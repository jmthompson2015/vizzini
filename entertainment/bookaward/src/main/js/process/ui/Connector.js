define(function()
{
    "use strict";
    var Connector = {};

    Connector.BookTable = {
        mapStateToProps: function(state, ownProps)
        {
            var nominees = [];

            state.books.forEach(function(book)
            {
                // LOGGER.info("book = " + book);
                // LOGGER.info("nominations = " + state.bookToNomination[book]);
                nominees.push(
                {
                    book: book,
                    nominations: state.bookToNomination[book],
                });
            });

            return (
            {
                nominees: nominees,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});
