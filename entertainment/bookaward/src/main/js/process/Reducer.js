define(["InitialState", "process/Action"], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined')
        {
            return new InitialState();
        }

        switch (action.type)
        {
            case Action.ADD_BOOK:
                LOGGER.info("Reducer book = " + action.book);
                var newBooks = [];
                newBooks.vizziniAddAll(state.books);
                newBooks.push(action.book);
                var newBookToNomination = Object.assign(
                {}, state.bookToNomination);
                newBookToNomination[action.book] = [];
                return Object.assign(
                {}, state,
                {
                    books: newBooks,
                    bookToNomination: newBookToNomination,
                });
            case Action.ADD_NOMINATION:
                LOGGER.info("Reducer book = " + action.book);
                LOGGER.info("Reducer nomination = " + action.nomination);
                var newBookToNomination = Object.assign(
                {}, state.bookToNomination);
                if (newBookToNomination[action.book] === undefined)
                {
                    // newBookToNomination[action.book] = [];
                    throw "Missing bookToNomination array for book: " + action.book;
                }
                newBookToNomination[action.book].push(action.nomination);
                return Object.assign(
                {}, state,
                {
                    bookToNomination: newBookToNomination,
                });
            default:
                LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                return state;
        }
    };

    if (Object.freeze)
    {
        Object.freeze(Reducer);
    }

    return Reducer;
});
