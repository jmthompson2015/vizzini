define([ "../../../../example/main/js/artificialant/Content" ], function(Content)
{
    "use strict";
    function SantaFeTrail()
    {
        var DIMENSION =
        {
            width: 32,
            height: 32,
        };

        var data = [];
        var i;

        for (i = 0; i < DIMENSION.width; i++)
        {
            data[i] = [];

            for (var j = 0; j < DIMENSION.height; j++)
            {
                data[i][j] = Content.EMPTY;
            }
        }

        // Place food.
        var coordinates = [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 4, 5 ],
                [ 5, 5 ], // 10
                [ 6, 5 ], [ 8, 5 ], [ 9, 5 ], [ 10, 5 ], [ 11, 5 ], [ 12, 5 ], [ 12, 6 ], [ 12, 7 ], [ 12, 8 ],
                [ 12, 9 ], // 20
                [ 12, 11 ], [ 12, 12 ], [ 12, 13 ], [ 12, 14 ], [ 12, 17 ], [ 12, 18 ], [ 12, 19 ], [ 12, 20 ],
                [ 12, 21 ], [ 12, 22 ], // 30
                [ 12, 23 ], [ 11, 24 ], [ 10, 24 ], [ 9, 24 ], [ 8, 24 ], [ 7, 24 ], [ 4, 24 ], [ 3, 24 ], [ 1, 25 ],
                [ 1, 26 ], // 40
                [ 1, 27 ], [ 1, 28 ], [ 2, 30 ], [ 3, 30 ], [ 4, 30 ], [ 5, 30 ], [ 7, 29 ], [ 7, 28 ], [ 8, 27 ],
                [ 9, 27 ], // 50
                [ 10, 27 ], [ 11, 27 ], [ 12, 27 ], [ 13, 27 ], [ 14, 27 ], [ 16, 26 ], [ 16, 25 ], [ 16, 24 ],
                [ 16, 21 ], [ 16, 20 ], // 60
                [ 16, 19 ], [ 16, 18 ], [ 17, 15 ], [ 20, 14 ], [ 20, 13 ], [ 20, 10 ], [ 20, 9 ], [ 20, 8 ],
                [ 20, 7 ], [ 21, 5 ], // 70
                [ 22, 5 ], [ 24, 4 ], [ 24, 3 ], [ 25, 2 ], [ 26, 2 ], [ 27, 2 ], [ 29, 3 ], [ 29, 4 ], [ 29, 6 ],
                [ 29, 9 ], // 80
                [ 29, 12 ], [ 28, 14 ], [ 27, 14 ], [ 26, 14 ], [ 23, 15 ], [ 24, 18 ], [ 27, 19 ], [ 26, 22 ],
                [ 23, 23 ], // 89
        ];

        for (i = 0; i < coordinates.length; i++)
        {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            data[x][y] = Content.FOOD;
        }

        this.foodConsumed = function()
        {
            return initialFoodCount - count(Content.FOOD);
        };

        this.foodCount = function()
        {
            return count(Content.FOOD);
        };

        this.get = function(x, y)
        {
            return data[x][y];
        };

        var initialFoodCount;

        this.initialFoodCount = function()
        {
            return initialFoodCount;
        };

        this.isFood = function(x, y)
        {
            return isType(x, y, Content.FOOD);
        };

        this.placeAnt = function(x, y)
        {
            if (isOnGrid(x, y))
            {
                data[x][y] = Content.FOOTPRINT;
            }
            else
            {
                throw "ArrayIndexOutOfBoundsException";
            }
        };

        function count(type)
        {
            var answer = 0;

            for (var i = 0; i < DIMENSION.width; i++)
            {
                for (var j = 0; j < DIMENSION.height; j++)
                {
                    if (isType(i, j, type))
                    {
                        answer++;
                    }
                }
            }

            return answer;
        }

        function isOnGrid(x, y)
        {
            return (0 <= x) && (x < DIMENSION.width) && (0 <= y) && (y < DIMENSION.height);
        }

        function isType(x, y, type)
        {
            var answer = false;

            if (isOnGrid(x, y))
            {
                answer = (data[x][y] === type);
            }

            return answer;
        }

        initialFoodCount = this.foodCount();
        this.placeAnt(0, 0);
    }

    return SantaFeTrail;
});
