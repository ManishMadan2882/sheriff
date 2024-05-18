const express = require("express");
const Docker = require("dockerode");
var docker = new Docker();

const app = express();

const port = 5201;

app.get("/pushToS3", (req, res) => {
  docker
    .createContainer({
      Image: "ubuntu",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ["/bin/bash", "-c", "tail -f /var/log/dmesg"],
      OpenStdin: false,
      StdinOnce: false,
    })
    .then(function (container) {
      auxContainer = container;
      return auxContainer.start();
    })
    .then(function (data) {
      return auxContainer.resize({
        h: process.stdout.rows,
        w: process.stdout.columns,
      });
    })
    .then(function (data) {
      return auxContainer.stop();
    })
    .then(function (data) {
      return auxContainer.remove();
    })
    .then(function (data) {
      console.log("container removed");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Build server running ...");
});
