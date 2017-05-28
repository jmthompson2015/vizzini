define(function()
{
   "use strict";
   var Action = {};

   Action.ADD_BOOK = "addBook";
   Action.ADD_NOMINATION = "addNomination";
   Action.SET_ASSESSMENT = "setAssessment";
   Action.SET_ASSESSMENTS = "setAssessments";

   Action.addBook = function(book)
   {
      InputValidator.validateNotNull("book", book);

      return (
      {
         type: Action.ADD_BOOK,
         book: book,
      });
   };

   Action.addNomination = function(book, nomination)
   {
      InputValidator.validateNotNull("book", book);
      InputValidator.validateNotNull("nomination", nomination);

      return (
      {
         type: Action.ADD_NOMINATION,
         book: book,
         nomination: nomination,
      });
   };

   Action.setAssessment = function(book, assessment)
   {
      InputValidator.validateNotNull("book", book);
      InputValidator.validateNotNull("assessment", assessment);

      return (
      {
         type: Action.SET_ASSESSMENT,
         book: book,
         assessment: assessment,
      });
   };

   Action.setAssessments = function(bookToAssessment)
   {
      InputValidator.validateNotNull("bookToAssessment", bookToAssessment);

      return (
      {
         type: Action.SET_ASSESSMENTS,
         bookToAssessment: bookToAssessment,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(Action);
   }

   return Action;
});
