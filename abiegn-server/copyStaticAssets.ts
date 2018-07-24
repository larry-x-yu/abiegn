import * as shell from "shelljs";

// Use default ssl key and certificate unless overriden by production settings
shell.cp("-R", "ssl", "dist/ssl");
