let plugins_old = null;
let plugins_new = null;
let root = document.documentElement;

document.getElementById("plugins_old").addEventListener("change", function (event) {
    plugins_old = event.target.files;

    root.style.setProperty("--display-old-bef", "none");
    root.style.setProperty("--display-old-aft", "block");

    if (plugins_old != null && plugins_new != null) {
        check();
    }
}, false);
document.getElementById("plugins_new").addEventListener("change", function (event) {
    plugins_new = event.target.files;

    root.style.setProperty("--display-new-bef", "none");
    root.style.setProperty("--display-new-aft", "block");

    if (plugins_old != null && plugins_new != null) {
        check();
    }
}, false);

function check() {
    if (plugins_new == null || plugins_old == null) {
        alert("Missing files!");
        return;
    }
    document.getElementById("results_container").style.display = "block";
    let missingFileNames = Array.from(plugins_old).map(file => file.name);
    missingFileNames = missingFileNames.filter(plugin => plugin.endsWith(".dll"));

    Array.from(plugins_new).map(file => file.name)
        .forEach(plugin => missingFileNames = missingFileNames.filter(oldPlugin => oldPlugin !== plugin));

    let newFileNames = Array.from(plugins_new).map(file => file.name);
    newFileNames = newFileNames.filter(plugin => plugin.endsWith(".dll"));

    Array.from(plugins_old).map(file => file.name)
        .forEach(plugin => newFileNames = newFileNames.filter(newPlugin => newPlugin !== plugin));

    document.getElementById("results_missing").innerHTML = "";
    document.getElementById("results_added").innerHTML = "";

    missingFileNames.forEach(missingPlugin => {
        let result = document.createElement("li");
        result.innerText = missingPlugin;
        result.style.color = "var(--clr-red)";
        document.getElementById("missing").append(result);
    });

    newFileNames.forEach(missingPlugin => {
        let result = document.createElement("li");
        result.innerText = missingPlugin;
        result.style.color = "var(--clr-green)";
        document.getElementById("added").append(result);
    });
}
