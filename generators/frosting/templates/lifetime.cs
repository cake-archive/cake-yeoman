using Cake.Frosting;

public class <%= lifetimeType %> : FrostingLifetime<<%= settingsType%>>
{
    public override void Setup(<%= settingsType %> context)
    {
    }
}