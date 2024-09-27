{
  description = "Flake for development workflows.";

  inputs = {
    rainix.url = "github:rainprotocol/rainix";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, rainix }:
    flake-utils.lib.eachDefaultSystem (system:
      {
        packages = rec {
          rainframe-test = rainix.mkTask.${system} {
            name = "rainframe-test";
            body = ''
              set -euxo pipefail
              npm i
            '';
          };

        } // rainix.packages.${system};
        devShells = rainix.devShells.${system};
      }
    );
}