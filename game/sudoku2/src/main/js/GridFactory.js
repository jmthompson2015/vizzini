define(function()
{
    var GridFactory = {
        createDefaultSolution: function()
        {
            return "123456789" + // row A
                "456789123" + // row B
                "789123456" + // row C
                "234567891" + // row D
                "567891234" + // row E
                "891234567" + // row F
                "345678912" + // row G
                "678912345" + // row H
                "912345678"; // row I
        },

        createEmpty: function(NIn)
        {
            var N = (NIn !== undefined ? NIn : 9);
            var answer = "";

            for (var i = 0; i < (N * N); i++)
            {
                answer += ".";
            }

            return answer;
        },
    };

    return GridFactory;
});
