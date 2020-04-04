# Covidbility
### <a href="https://bartaxyz.github.io/covidbility/">Learn your chance</a> to get infected by novel coronavirus.

- Show % chance of becoming infected today, and days before.
- Show % chance of needing hospitalization / ICU
- Show % chance of death 

## Contributing

Before doing anything with the repository code, make sure you have dependencies up to date

```bash
npm install
```

There are two main modes to run development in.

### Serve Website

Build scripts once and then serve the website. Files under `./src` are not gonna be build upon change. To watch for changes, serve the website in development mode (below).

```bash
npm run serve
```

### Serve Website In Development Mode

Build scripts in watch mode. Files under `./src` are watched for changes and build automatically. When a change occurs in any file, the website will refresh with newly built scripts.

```bash
npm run develop
```
