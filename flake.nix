{
  description = "Flake for development workflows.";

  inputs = {
    rainix.url = "github:rainprotocol/rainix";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, rainix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = rainix.pkgs.${system};
      in rec {
        packages = rec {
          rainframe-test = rainix.mkTask.${system} {
            name = "rainframe-test";
            body = ''
              set -euxo pipefail
              npm i
            '';
          };

        } // rainix.packages.${system};

        devShells.default = pkgs.mkShell {
          packages = [
            packages.rainframe-test
          ];

          shellHook = rainix.devShells.${system}.default.shellHook;
          buildInputs = rainix.devShells.${system}.default.buildInputs;
          nativeBuildInputs = rainix.devShells.${system}.default.nativeBuildInputs;
        };
      }
    );
}