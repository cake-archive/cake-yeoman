#addin nuget:?package=Cake.Yarn
#addin nuget:?package=Cake.Npm
#addin nuget:?package=Cake.Gulp

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(ctx =>
{
	// Executed BEFORE the first task.
	Information("Running tasks...");
});

Teardown(ctx =>
{
	// Executed AFTER the last task.
	Information("Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////////////////////////////

Task("Install")
.Does(() => {
	Yarn.Install();
});

Task("Static")
.Does(() => {
	Gulp.Local.Execute(s => s.WithArguments("static"));
});

Task("Run-Unit-Tests")
.IsDependentOn("Static")
.Does(() => {
	NpmRunScript("test");
});

Task("Prepublish")
.Does(() => {
	Gulp.Local.Execute(s => s.WithArguments("prepublish"));
});

Task("Pack")
.Does(() => {
	NpmPack();
});

Task("Default")
.IsDependentOn("Install")
.IsDependentOn("Run-Unit-Tests");

Task("Publish")
.IsDependentOn("Install")
.IsDependentOn("Run-Unit-Tests")
.IsDependentOn("Prepublish")
.Does(() => {
	NpmPublish();
});


RunTarget(target);
