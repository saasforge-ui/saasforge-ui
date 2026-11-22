# Security Policy

## Supported versions

SaaSForge UI is distributed as source you copy into your own project. Fixes land on the `main` branch; please make
sure you're comparing against the latest version of a component before reporting.

## Reporting a vulnerability

**Please don't report security issues in public issues, discussions or pull requests.**

Report them privately through GitHub's
[private vulnerability reporting](https://github.com/saasforge-ui/saasforge-ui/security/advisories/new). Include:

- the affected component(s) or file(s)
- a description of the issue and its impact
- steps to reproduce or a proof of concept, if possible

You can expect an initial response within a few days. Once the issue is confirmed, we'll work on a fix, credit you
in the advisory if you'd like, and publish the advisory when the fix is available.

## Scope

SaaSForge UI is a frontend component library with no backend. Relevant reports include things like XSS through
component props, unsafe handling of user-provided HTML or URLs, and vulnerable dependencies that affect the
published components. Issues in the demo site's hosting (GitHub Pages) are out of scope.
