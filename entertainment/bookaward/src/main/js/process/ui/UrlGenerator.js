define(["Library", "SciFiAward"], function(Library, SciFiAward)
{
   "use strict";
   var UrlGenerator = {

      createAmazonSearchUrl: function(subject)
      {
         InputValidator.validateNotNull("subject", subject);

         var searchString = subject.replace(/ /g, "+");

         return "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=" + searchString;
      },

      createAwardUrl: function(award, year)
      {
         InputValidator.validateNotNull("award", award);
         InputValidator.validateNotNull("year", year);

         var answer = award.url;

         if (SciFiAward.values().vizziniContains(award.value))
         {
            answer += year;
         }

         return answer;
      },

      createGoodreadsSearchUrl: function(subject)
      {
         InputValidator.validateNotNull("subject", subject);

         var searchString = subject.replace(/ /g, "+");

         return "https://www.goodreads.com/search?q=" + searchString;
      },

      createLibrarySearchUrl: function(library, subject)
      {
         InputValidator.validateNotNull("library", library);
         InputValidator.validateNotNull("subject", subject);

         var searchString = subject;

         searchString = searchString.replace(/\u00EE/g, "i");
         searchString = searchString.replace(/\u00F8/g, "o");
         searchString = searchString.replace(/\u2019/g, "");
         searchString = searchString.replace(/'/g, "");

         switch (library.value)
         {
            case Library.DCL:
               searchString = searchString.replace(/ /g, "+");
               break;
            default:
               searchString = searchString.replace(/ /g, "%20");
               break;
         }

         return library.searchPrefix + searchString + library.searchSuffix;
      },

      createWikipediaSearchUrl: function(subject)
      {
         InputValidator.validateNotNull("subject", subject);

         var searchString = subject.replace(/ /g, "_");

         return "https://en.wikipedia.org/wiki/" + searchString;
      },
   };

   return UrlGenerator;
});
