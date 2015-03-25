Array.prototype.contains = function(obj)
{
    var isArray = Array.isArray(obj);
    var i = this.length;

    while (i--)
    {
        if (isArray && Array.isArray(this[i]) && this[i].equals(obj))
        {
            return true;
        }
        else if (this[i] === obj || (this[i].equals && this[i].equals(obj))
                || (obj.equals && obj.equals(this[i]))) { return true; }
    }

    return false;
}

Array.prototype.randomElement = function()
{
    return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.shuffle = function()
{
    this.sort(function()
    {
        return Math.random() - 0.5;
    });
}
