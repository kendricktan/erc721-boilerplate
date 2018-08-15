with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "qut-capstone-env";

  # Boilderplate for builable env
  env = buildEnv { name = name; paths = buildInputs; };
  builder = builtins.toFile "builder.sh" ''
    source $stdenv/setup; ln -s $env $out
  '';

  buildInputs = [
    python27
    nodejs-9_x

    # (python27.buildEnv.override {
    #   extraLibs = with python36Packages; [
    #   ];
    # })
  ];
}
