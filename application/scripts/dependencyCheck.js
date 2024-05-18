const { default: axios } = require("axios");
const fs = require("fs");

const checkDependenciesForVulnerabilities = async (packageJsonPath) => {
  console.log(packageJsonPath + "/package.json");
  fs.readFile(packageJsonPath + "/package.json", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading package.json:", err);
      return;
    }
    try {
      const packageJson = JSON.parse(data);
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };
      console.log(dependencies);
      const packageMap = new Map(Object.entries(dependencies));
      packageMap.forEach((value, key) => {
        packageMap.set(key, value.replace("^", ""));
      });
      console.log("---", packageMap);
      const cvePromises = Array.from(packageMap.entries()).map(
        async ([key, value]) => {
          try {
            const response = await axios.post("https://api.osv.dev/v1/query", {
              version: value,
              package: { name: key },
            });

            if (response.data?.vulns) {
              const aliases = response.data.vulns
                .map((data) => (data?.aliases?.length ? data.aliases[0] : null))
                .filter((alias) => alias !== null);

              if (aliases.length > 0) {
                return `${aliases.join(",")}:${key}`;
              }
            }

            return null;
          } catch (error) {
            console.error(`Error querying CVE for ${key}:`, error);
            return null;
          }
        }
      );

      let cveResults = await Promise.all(cvePromises);
      const filteredCve = cveResults.filter((data) => data !== undefined);

      let mapp = new Map();

      filteredCve.forEach((data) => {
        if (data) {
          const data2 = data.split(":");
          if (data2[1]) {
            mapp.set(data2[1], data2[0]);
          }
        }
      });
      const outputPath = (__dirname, "output.txt");
      console.log("^^^", mapp);
      let outputString = "";
      mapp.forEach((value, key) => {
        outputString += `${key}:${value}\n`;
      });

      fs.writeFileSync(outputPath, outputString, "utf8", (err) => {
        if (err) {
          console.error("Error writing to output.txt:", err);
        } else {
          console.log("Data has been written to output.txt");
        }
      });
    } catch (parseError) {
      console.error("Error parsing package.json:", parseError);
    }
  });
};

module.exports = checkDependenciesForVulnerabilities;
