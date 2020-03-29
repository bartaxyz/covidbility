# Covidbility
Learn your chance to become infected by SARS-COV-2.

## ToDo
- [x] Find good data source of daily updated of infected in-country 
- [ ] Find good data source of Intense Care Units
- [x] Find good data source of probabilities, research
- [ ] Built a mathematical model
- [x] Design

## Mission 
- Showing user % chance of getting infected based on number of people and time of spending with them

## Inputs
- Country
- Number of people
- (Optional) Age

## Outputs 📈
- Showing % chance 🦠 of becoming infected today, and days before and after
- Showing % chance 🤒 of showing symptoms in 5-12 days
- Showing % chance 🏥 of needing hospitalization / ICU
- Showing % chance ⚰️ of death BUT ALSO % chance that because triage **someone else had to die** (based on ICU capacity and age)

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

## Sources
- "We estimate 86% of all infections were undocumented (95% CI: [82%–90%]) prior to 23 January 2020 travel restrictions." link: https://science.sciencemag.org/content/early/2020/03/24/science.abb3221
- https://www.vox.com/2020/3/23/21190033/coronavirus-covid-19-deaths-by-age
- https://www.cdc.gov/mmwr/volumes/69/wr/mm6912e2.htm?s_cid=mm6912e2_w

