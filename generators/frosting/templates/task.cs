using Cake.Core;
using Cake.Frosting;

[TaskName("<%= taskName %>")]
public class Build : FrostingTask<<%= settingsType %>>
{
    public override bool ShouldRun(<%= settingsType %> context)
    {
        // Don't run this task on OSX.
        return context.Environment.Platform.Family != PlatformFamily.OSX;
    }

    public override void Run(<%= settingsType %> context)
    {
        
    }
}