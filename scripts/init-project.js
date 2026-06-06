#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

const entries = [
  ["templates/project/AGENTS.md", "AGENTS.md"],
  ["templates/project/DOMAIN-LANGUAGE.md", "DOMAIN-LANGUAGE.md"],
  ["templates/project/DOMAIN-LANGUAGE-MAP.md", "DOMAIN-LANGUAGE-MAP.md"],
  ["templates/docs/product.md", "docs/product.md"],
  ["templates/docs/technical.md", "docs/technical.md"],
  ["templates/docs/state.md", "docs/state.md"],
  ["templates/docs/adr/README.md", "docs/adr/README.md"],
  ["templates/docs/adr/0000-template.md", "docs/adr/0000-template.md"],
  [
    "templates/github/ISSUE_TEMPLATE/agent-slice.md",
    ".github/ISSUE_TEMPLATE/agent-slice.md",
  ],
  [
    "templates/github/pull_request_template.md",
    ".github/pull_request_template.md",
  ],
  ["skills", "skills"],
];

function printUsage() {
  console.log(`Usage:
  node scripts/init-project.js <target-project> [--dry-run] [--force]

Options:
  --dry-run   Show what would be copied, skipped, or overwritten.
  --force     Overwrite existing destination files.
  --help      Show this help text.

Examples:
  node scripts/init-project.js ../my-new-project --dry-run
  node scripts/init-project.js ../my-new-project
  node scripts/init-project.js ../my-new-project --force
`);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    dryRun: false,
    force: false,
    target: null,
  };

  for (const arg of args) {
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else if (!options.target) {
      options.target = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  if (!options.target) {
    printUsage();
    process.exit(1);
  }

  return options;
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function isDirectory(filePath) {
  return exists(filePath) && fs.statSync(filePath).isDirectory();
}

function listFiles(sourceRoot) {
  const stat = fs.statSync(sourceRoot);

  if (!stat.isDirectory()) {
    return [sourceRoot];
  }

  const files = [];
  const stack = [sourceRoot];

  while (stack.length > 0) {
    const current = stack.pop();
    const children = fs.readdirSync(current, { withFileTypes: true });

    for (const child of children) {
      const childPath = path.join(current, child.name);
      if (child.isDirectory()) {
        stack.push(childPath);
      } else if (child.isFile()) {
        files.push(childPath);
      }
    }
  }

  return files.sort();
}

function copyFile(source, destination, options) {
  const destinationExists = exists(destination);

  if (destinationExists && !options.force) {
    return { action: "skip", source, destination };
  }

  if (options.dryRun) {
    return {
      action: destinationExists ? "overwrite" : "copy",
      source,
      destination,
    };
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);

  return {
    action: destinationExists ? "overwrite" : "copy",
    source,
    destination,
  };
}

function formatRelative(filePath, root) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function main() {
  const options = parseArgs(process.argv);
  const targetRoot = path.resolve(options.target);

  if (!isDirectory(targetRoot)) {
    throw new Error(`Target project does not exist or is not a directory: ${targetRoot}`);
  }

  const results = [];

  for (const [sourceRelative, destinationRelative] of entries) {
    const source = path.join(repoRoot, sourceRelative);
    const destination = path.join(targetRoot, destinationRelative);

    if (!exists(source)) {
      throw new Error(`Source template does not exist: ${sourceRelative}`);
    }

    const sourceFiles = listFiles(source);
    const sourceIsDirectory = fs.statSync(source).isDirectory();

    for (const sourceFile of sourceFiles) {
      const relativeWithinSource = sourceIsDirectory
        ? path.relative(source, sourceFile)
        : "";
      const destinationFile = sourceIsDirectory
        ? path.join(destination, relativeWithinSource)
        : destination;

      results.push(copyFile(sourceFile, destinationFile, options));
    }
  }

  const counts = results.reduce(
    (acc, result) => {
      acc[result.action] += 1;
      return acc;
    },
    { copy: 0, overwrite: 0, skip: 0 }
  );

  const mode = options.dryRun ? "Dry run" : "Init";
  console.log(`${mode} for ${targetRoot}`);
  console.log("");

  for (const result of results) {
    const destination = formatRelative(result.destination, targetRoot);
    const label = result.action.toUpperCase().padEnd(9);
    console.log(`${label} ${destination}`);
  }

  console.log("");
  console.log(
    `Summary: ${counts.copy} to copy, ${counts.overwrite} to overwrite, ${counts.skip} skipped.`
  );

  if (options.dryRun) {
    console.log("No files were changed.");
  }
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

