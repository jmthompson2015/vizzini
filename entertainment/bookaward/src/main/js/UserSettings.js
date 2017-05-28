define(["Assessment", "Award"],
   function(Assessment, Award)
   {
      var UserSettings = {};

      UserSettings.loadBookToAssessment = function()
      {
         var answer = {};

         var bookToAssessment = localStorage.getItem("bookToAssessment");

         if (bookToAssessment)
         {
            var myBookToAssessment = JSON.parse(bookToAssessment);

            if (myBookToAssessment)
            {
               Object.vizziniMerge(answer, myBookToAssessment);
            }
         }

         return answer;
      };

      UserSettings.resetBookToAssessment = function(bookToAssessment, books, bookToDclUrl, bookToNomination)
      {
         InputValidator.validateNotNull("bookToAssessment", bookToAssessment);
         InputValidator.validateNotNull("books", books);
         InputValidator.validateNotNull("bookToDclUrl", bookToDclUrl);
         InputValidator.validateNotNull("bookToNomination", bookToNomination);

         localStorage.removeItem("bookToAssessment");

         var answer = Object.assign(
         {}, bookToAssessment);

         books.forEach(function(book)
         {
            answer[book] = Assessment.NONE;

            var nominations = bookToNomination[book];

            if (nominations)
            {
               var clubNominations = nominations.filter(function(nomination)
               {
                  return nomination.award().value === Award.CRIME_AND_BEYOND;
               });

               if (clubNominations.length > 0)
               {
                  answer[book] = Assessment.BOOK_CLUB_PICK;
               }
               else if (bookToDclUrl[book] === undefined)
               {
                  answer[book] = Assessment.NOT_AVAILABLE;
               }
            }
         });

         return answer;
      };

      UserSettings.storeBookToAssessment = function(bookToAssessment)
      {
         InputValidator.validateNotNull("bookToAssessment", bookToAssessment);

         localStorage.setItem("bookToAssessment", JSON.stringify(bookToAssessment));
         LOGGER.debug("bookToAssessment stored to localStorage");
      };

      return UserSettings;
   });
