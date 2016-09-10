using Cake.Frosting;

[Dependency(typeof(Build))]
public class Default : FrostingTask
{
    // If you don't inherit from FrostinTask<MySettings>
    // the standard ICakeContext will be provided.
}