// Resolve against the package, so invoking this script from elsewhere is safe.
const { rmSync } = require('fs');
const { resolve } = require('path');
rmSync(resolve(__dirname, '../dist'), { recursive: true, force: true });
