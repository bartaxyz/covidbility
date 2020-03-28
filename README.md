# Covidbility
Learn your chance to become infected by SARS-COV-2.

## ToDo
- [ ] find good data source of daily updated of infected in country 
- [ ] find good data source of number of ICU in country
- [ ] find good data source of probabilities, research
- [ ] built strong matematical model

## Mission 
- Showing user % chance of getting infected based on number of people and time of spending with them

## Inputs
- Select yout country
- Add new person
  - Set date of meeting
  - Set how long they been les than 2 meters (longer - higher probability)
- (Optional) Select appr. number of people that person missed on the street for a few seconds (maybe not crucial)
- (Optional) Set age

## Outputs 📈
- Showing % chance 🦠 of become infected today, and days before and after
- Showing % chance 🤒 of showing symptoms in 5-12 days
- Showing % chance 🏥 of needing hospitalization / ICU
- Showing % chance ⚰️ of death BUT ALSO % chance that because triage **someone else had to die** (based on ICU capacity in country and age)

## Notes
- We will multiply current infected number by 10 based on recent published studies
  - "We estimate 86% of all infections were undocumented (95% CI: [82%–90%]) prior to 23 January 2020 travel restrictions." via https://science.sciencemag.org/content/early/2020/03/24/science.abb3221 16 March
- I would love to see graphs as Outputs, showing that meeting one person tommorow is actually worse that seing that person today. Of course the best is not seeing the person at all.

