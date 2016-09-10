using Cake.Core;
using Cake.Frosting;

public class <%= settingsType %> : FrostingContext
{
    public <%= settingsType %>(ICakeContext context)
        : base(context)
    {
        // You could initialize the context here,
        // but it's recommended to use a FrostingLifetime
        // since the context will be created when running
        // a dry run of the script as well.
    }
}