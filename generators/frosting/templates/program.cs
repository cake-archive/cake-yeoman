using Cake.Frosting;
    
public class Program
{
    public static int Main(string[] args)
    {
        // Create the host.
        var host = new CakeHostBuilder()
            .WithArguments(args)
            .ConfigureServices(services =>
            {
                <% if (useSettings) { %>
                // Use a custom settings class.
                services.UseContext<<%= settingsType %>>();
                <% } %>

                <% if (useLifetime) { %>
                // Use a custom lifetime to initialize the context.
                services.UseLifetime<<%= lifetimeType %>>();
                <% } %>
            })
            .Build();

        // Run the host.
        return host.Run();
    }
}