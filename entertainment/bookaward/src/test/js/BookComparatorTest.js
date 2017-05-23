define(["Book", "BookComparator"], function(Book, BookComparator)
{
   "use strict";
   QUnit.module("BookComparator");

   QUnit.test("compare()", function(assert)
   {
      // Setup.
      var book0 = new Book("A", "Alpha");
      var book1 = new Book("B", "Bravo");
      var book2 = new Book("C", "Charlie");
      var book3 = new Book("A", "Alpha");

      // Run / Verify.
      assert.equal(BookComparator.compare(book0, book0), 0);
      assert.equal(BookComparator.compare(book0, book1), 1);
      assert.equal(BookComparator.compare(book0, book2), 1);
      assert.equal(BookComparator.compare(book0, book3), 0);

      assert.equal(BookComparator.compare(book1, book0), -1);
      assert.equal(BookComparator.compare(book1, book1), 0);
      assert.equal(BookComparator.compare(book1, book2), -1);
      assert.equal(BookComparator.compare(book1, book3), -1);

      assert.equal(BookComparator.compare(book2, book0), -1);
      assert.equal(BookComparator.compare(book2, book1), 1);
      assert.equal(BookComparator.compare(book2, book2), 0);
      assert.equal(BookComparator.compare(book2, book3), -1);

      assert.equal(BookComparator.compare(book3, book0), 0);
      assert.equal(BookComparator.compare(book3, book1), 1);
      assert.equal(BookComparator.compare(book3, book2), 1);
      assert.equal(BookComparator.compare(book3, book3), 0);
   });

   QUnit.test("equals()", function(assert)
   {
      // Setup.
      var book0 = new Book("A", "Alpha");
      var book1 = new Book("B", "Bravo");
      var book2 = new Book("C", "Charlie");
      var book3 = new Book("A", "Alpha");

      // Run / Verify.
      assert.equal(BookComparator.equals(book0, book0), true);
      assert.equal(BookComparator.equals(book0, book1), false);
      assert.equal(BookComparator.equals(book0, book2), false);
      assert.equal(BookComparator.equals(book0, book3), true);

      assert.equal(BookComparator.equals(book1, book0), false);
      assert.equal(BookComparator.equals(book1, book1), true);
      assert.equal(BookComparator.equals(book1, book2), false);
      assert.equal(BookComparator.equals(book1, book3), false);

      assert.equal(BookComparator.equals(book2, book0), false);
      assert.equal(BookComparator.equals(book2, book1), false);
      assert.equal(BookComparator.equals(book2, book2), true);
      assert.equal(BookComparator.equals(book2, book3), false);

      assert.equal(BookComparator.equals(book3, book0), true);
      assert.equal(BookComparator.equals(book3, book1), false);
      assert.equal(BookComparator.equals(book3, book2), false);
      assert.equal(BookComparator.equals(book3, book3), true);
   });
});
