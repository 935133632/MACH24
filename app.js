const classCopy = document.querySelector('#class-copy');
const classTabs = document.querySelectorAll('.class-tab');

const classContent = {
  low: { stat: '&lt; 2<span>%</span>', title: 'Low-VAF clonal hematopoiesis', body: 'Variants detected below the conventional 2% VAF threshold. MACH25 is designed to make this low-signal biology measurable at scale.' },
  chip: { stat: '≥ 2<span>%</span>', title: 'Conventional CHIP', body: 'Variants at or above the conventional 2% VAF threshold. This group provides a useful reference point for interpreting the lower-signal spectrum.' }
};

classTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.class;
    classTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const content = classContent[selected];
    classCopy.innerHTML = `<div class="class-stat">${content.stat}</div><h3>${content.title}</h3><p>${content.body}</p>`;
  });
});

const dataCatalog = {
  demographics: {
    label: 'Demographics', code: 'DEM',
    variables: [
      { name:'age_at_draw', label:'Age at blood draw', kind:'Continuous · years', definition:'Age in years on the date of the baseline blood draw used for cohort entry.', available:'24,309', completeness:'100.0%', headline:'Median 64.1 years · IQR 57.0–70.6', title:'Age distribution', unit:'Participants per 5-year band', chart:'bars', note:'Age is summarized at baseline. The public view uses five-year bins and does not expose participant-level dates.', data:[['18–22',53,'53 · 0.2%'],['23–27',82,'82 · 0.3%'],['28–32',124,'124 · 0.5%'],['33–37',201,'201 · 0.8%'],['38–42',322,'322 · 1.3%'],['43–47',408,'408 · 1.7%'],['48–52',2028,'2,028 · 8.3%'],['53–57',3649,'3,649 · 15.0%'],['58–62',4333,'4,333 · 17.8%'],['63–67',4735,'4,735 · 19.5%'],['68–72',3921,'3,921 · 16.1%'],['73–77',2628,'2,628 · 10.8%'],['78–82',1218,'1,218 · 5.0%'],['83+',607,'607 · 2.5%']] },
      { name:'sex', label:'Recorded sex', kind:'Categorical', definition:'Recorded sex field available in the baseline clinical extract.', available:'24,309', completeness:'100.0%', headline:'Male 50.4% · Female 49.6%', title:'Recorded sex', unit:'Participants', chart:'bars', note:'This summary reflects the source variable as recorded and should not be interpreted as a measure of gender identity.', data:[['Male',12257,'12,257 · 50.4%'],['Female',12052,'12,052 · 49.6%']] },
      { name:'race_group', label:'Race group', kind:'Categorical', definition:'Harmonized race group from the baseline clinical record.', available:'24,309', completeness:'97.7% known', headline:'White 80.4% · Black 8.0% · Asian 3.1%', title:'Race distribution', unit:'Participants', chart:'bars', note:'Unknown values remain explicit. Categories reflect the harmonized source field and do not imply genetic ancestry.', data:[['White',19552,'19,552 · 80.4%'],['Black',1943,'1,943 · 8.0%'],['Asian',752,'752 · 3.1%'],['Other',1510,'1,510 · 6.2%'],['Unknown',552,'552 · 2.3%']] },
      { name:'smoking_history', label:'Smoking history', kind:'Categorical', definition:'Baseline smoking history grouped as never, ever or unknown.', available:'24,309', completeness:'74.0% known', headline:'Never 40.3% · Ever 33.7% · Unknown 26.0%', title:'Smoking history', unit:'Participants', chart:'bars', note:'The “ever” category combines available former and current smoking records. Unknown is retained as a separate category.', data:[['Never',9792,'9,792 · 40.3%'],['Ever',8199,'8,199 · 33.7%'],['Unknown',6318,'6,318 · 26.0%']] }
    ]
  },
  clinical: {
    label:'Clinical', code:'CLN',
    variables:[
      { name:'primary_cancer_site', label:'Primary cancer site', kind:'Categorical', definition:'Grouped solid-tumor site associated with cohort eligibility at baseline.', available:'24,309', completeness:'99.95% classified', headline:'12 reported site groups', title:'Cancer-site composition', unit:'Participants', chart:'bars', note:'Sites are grouped for aggregate reporting. “Other” pools less frequent sites; 11 participants were not classified in the published site table.', data:[['Breast',4242,'4,242 · 17.5%'],['Other',4030,'4,030 · 16.6%'],['Prostate',3716,'3,716 · 15.3%'],['Lung',2855,'2,855 · 11.7%'],['Colorectal',1842,'1,842 · 7.6%'],['Gynecologic',1741,'1,741 · 7.2%'],['Kidney',1436,'1,436 · 5.9%'],['Unknown',1372,'1,372 · 5.6%'],['Head & neck',906,'906 · 3.7%'],['Bladder',876,'876 · 3.6%'],['Thyroid',810,'810 · 3.3%'],['Pancreas',472,'472 · 1.9%']] },
      { name:'ch_group', label:'Clonal hematopoiesis group', kind:'Derived categorical', definition:'Mutually exclusive baseline classification using retained variants and the conventional 2% VAF boundary.', available:'24,309', completeness:'100.0%', headline:'Any retained CH mutation 40.6%', title:'Baseline CH classification', unit:'Participants', chart:'bars', note:'Low-VAF CH only means all retained variants are below 2% VAF. Conventional CHIP includes any retained variant at or above 2% VAF.', data:[['No detected CH',14443,'14,443 · 59.4%'],['Low-VAF CH only',6193,'6,193 · 25.5%'],['Conventional CHIP',3673,'3,673 · 15.1%']] }
    ]
  },
  genomics: {
    label:'Genomics', code:'GEN',
    variables:[
      { name:'variant_gene', label:'Mutated gene', kind:'Categorical · 23 panel genes', definition:'Gene symbol assigned to each retained clonal hematopoiesis variant in the capture panel.', available:'15,189 variants', completeness:'100.0%', headline:'DNMT3A and TET2 dominate the landscape', title:'Retained variants by gene', unit:'Variant count', chart:'bars', note:'The capture panel contains 23 genes: the published 22-gene panel plus CHEK2. Retained variants were observed in 21 genes in this release. Counts are variant level and can exceed the number of carriers.', data:[['DNMT3A',6552,'6,552'],['TET2',3281,'3,281'],['PPM1D',1748,'1,748'],['CHEK2',863,'863'],['TP53',806,'806'],['ASXL1',735,'735'],['CBL',209,'209'],['SF3B1',197,'197'],['JAK2',142,'142'],['GNB1',140,'140'],['GNAS',135,'135'],['SRSF2',94,'94']] },
      { name:'variant_allele_frequency', label:'Variant allele frequency', kind:'Continuous · proportion', definition:'Alternate-read fraction for each retained variant, summarized separately below and above the 2% threshold.', available:'15,189 variants', completeness:'100.0%', headline:'Low-VAF median 0.78% · CHIP median 4.37%', title:'Variant classes', unit:'Variants', chart:'bars', note:'VAF is a sequencing measure, not a direct clone-size measurement. Low-VAF detection does not replace orthogonal validation.', data:[['Low VAF <2%',10793,'10,793 · 71.1%'],['VAF ≥2%',4396,'4,396 · 28.9%']] },
      { name:'retained_variant_status', label:'Retained CH mutation status', kind:'Derived binary', definition:'Participant-level indicator for at least one variant retained by the primary analysis filters.', available:'24,309', completeness:'100.0%', headline:'9,866 participants with ≥1 retained variant', title:'Participant-level status', unit:'Participants', chart:'bars', note:'Variant retention follows the primary filtering scenario, including alternate-read, recurrence-flag and panel-of-normals rules.', data:[['Retained CH mutation',9866,'9,866 · 40.6%'],['No retained mutation',14443,'14,443 · 59.4%']] }
    ]
  },
  sequencing: {
    label:'Sequencing', code:'SEQ',
    variables:[
      { name:'sequencing_depth', label:'Sequencing depth', kind:'Continuous · reads', definition:'Total read depth at evaluated variant positions, summarized by analytic variant class.', available:'Analytic variant records', completeness:'Reported by class', headline:'Low VAF median depth 2,972×', title:'Median sequencing depth', unit:'Median reads', chart:'bars', note:'Depth supports interpretation of low frequency calls but does not constitute formal assay validation.', data:[['Low VAF <2%',2972,'2,972× · IQR 2,466–3,515'],['No retained CH',2684,'2,684× · IQR 2,204–3,072'],['CHIP ≥2%',2667,'2,667× · IQR 2,083–3,201']] }
    ]
  },
  outcomes: {
    label:'Outcomes', code:'OUT',
    variables:[
      { name:'observed_followup_years', label:'Observed follow up time', kind:'Continuous · years', definition:'Elapsed time from baseline blood draw to recorded death or last valid contact.', available:'24,308', completeness:'99.996%', headline:'Median 5.71 years', title:'Observed follow up range', unit:'Years', chart:'range', range:{min:0.05,max:15.58,median:5.71}, note:'Time zero is the baseline blood draw. One participant lacked a valid endpoint in the outcome profile.' },
      { name:'vital_status', label:'Vital status', kind:'Time-to-event status', definition:'Observed death after blood draw versus censored status for overall-survival analysis.', available:'24,309', completeness:'Analysis status 100.0%', headline:'8,327 observed deaths', title:'Overall-survival status', unit:'Participants', chart:'bars', note:'The survival preview administratively censors the single participant with a missing endpoint; status is not a crude cross-sectional mortality measure.', data:[['Censored',15982,'15,982 · 65.7%'],['Death observed',8327,'8,327 · 34.3%']] },
      { name:'last_contact_available', label:'Valid follow up endpoint', kind:'Binary availability', definition:'Indicator that a participant has a valid death date or last contact date after baseline.', available:'24,309', completeness:'99.996%', headline:'24,308 valid endpoints', title:'Follow up endpoint availability', unit:'Participants', chart:'bars', note:'Dates after the data review cutoff were treated as invalid future or sentinel values for outcome profiling.', data:[['Valid endpoint',24308,'24,308 · 100.0%'],['Missing endpoint',1,'1 · <0.1%']] },
      { name:'registry_confirmed_hm', label:'Registry confirmed hematologic malignancy', kind:'Candidate incident outcome', definition:'Post draw hematologic malignancy identified in the cancer registry and retained as a candidate longitudinal endpoint.', available:'24,309', completeness:'Registry linked', headline:'135 registry confirmed participants', title:'Registry confirmed candidate outcome', unit:'Participants', chart:'bars', note:'This is a candidate outcome, not a fully adjudicated incident endpoint. Disease coding, morphology, event timing and competing risk rules still require specification.', data:[['Registry confirmed',135,'135 · 0.6%'],['No registry confirmed event',24174,'24,174 · 99.4%']] }
    ]
  }
};

const categoryTabs = document.querySelector('#category-tabs');
const variableMenu = document.querySelector('#variable-menu');
const activeCategoryCode = document.querySelector('#active-category-code');
const variableCount = document.querySelector('#variable-count');
const categoryKeys = Object.keys(dataCatalog);
let currentCategory = 'demographics';
let currentVariable = 0;

variableCount.textContent = `${categoryKeys.reduce((sum, key) => sum + dataCatalog[key].variables.length, 0)} variables`;

function renderCategoryTabs() {
  categoryTabs.innerHTML = categoryKeys.map((key, index) => {
    const category = dataCatalog[key];
    const active = key === currentCategory;
    return `<button class="category-tab${active ? ' is-active' : ''}" type="button" role="tab" aria-selected="${active}" data-category="${key}"><span class="category-index">0${index + 1}</span><span>${category.label}</span><span class="category-total">${category.variables.length}</span></button>`;
  }).join('');
  categoryTabs.querySelectorAll('.category-tab').forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.category)));
}

function renderVariableMenu() {
  const category = dataCatalog[currentCategory];
  activeCategoryCode.textContent = category.code;
  variableMenu.innerHTML = category.variables.map((variable, index) => `<button class="variable-button${index === currentVariable ? ' is-active' : ''}" type="button" data-variable-index="${index}">${variable.label}</button>`).join('');
  variableMenu.querySelectorAll('.variable-button').forEach((button) => button.addEventListener('click', () => selectVariable(Number(button.dataset.variableIndex))));
}

function renderBars(variable) {
  const max = Math.max(...variable.data.map((item) => item[1]));
  const percentages = variable.data.map((item) => {
    const match = item[2].match(/([0-9]+(?:\.[0-9]+)?)%/);
    return match ? Number(match[1]) : null;
  });
  const usesPercentage = percentages.every((value) => value !== null);
  const rows = variable.data.map((item, index) => {
    const width = usesPercentage ? percentages[index] : (item[1] / max) * 100;
    const scaleText = usesPercentage ? `${percentages[index]}%` : `${Math.round(width)}%`;
    return `<div class="bar-row"><span class="bar-label">${item[0]}</span><span class="bar-track" role="progressbar" aria-label="${item[0]}: ${item[2]}" aria-valuenow="${width.toFixed(1)}" aria-valuemin="0" aria-valuemax="100"><span class="bar-fill bar-tone-${index % 4}" style="width:${Math.max(width, .4)}%"><i>${width >= 18 ? scaleText : ''}</i></span></span><span class="bar-value">${item[2]}</span></div>`;
  }).join('');
  return `<div class="chart-headline">${variable.headline}</div><div class="bar-scale"><span>0</span><span>${usesPercentage ? '100% of cohort' : 'Largest category = 100%'}</span></div>${rows}`;
}

function renderRange(variable) {
  const position = ((variable.range.median - variable.range.min) / (variable.range.max - variable.range.min)) * 100;
  return `<div class="range-chart"><div class="range-scale"><span class="range-marker" style="left:${position}%"><span class="range-marker-label">Median ${variable.range.median} y</span></span><span class="range-end start">${variable.range.min} y</span><span class="range-end end">${variable.range.max} y</span></div></div>`;
}

function renderVariableDetail() {
  const category = dataCatalog[currentCategory];
  const variable = category.variables[currentVariable];
  document.querySelector('#variable-breadcrumb').textContent = `${category.label} / ${variable.kind}`;
  document.querySelector('#variable-label').textContent = variable.label;
  document.querySelector('#variable-name').textContent = `${category.code} · ${variable.kind.toUpperCase()} VARIABLE`;
  document.querySelector('#variable-definition').textContent = variable.definition;
  document.querySelector('#variable-meta').innerHTML = [
    ['Data type', variable.kind],
    ['Available N', variable.available],
    ['Completeness', variable.completeness]
  ].map((item) => `<div class="meta-item"><div class="meta-label">${item[0]}</div><div class="meta-value">${item[1]}</div></div>`).join('');
  document.querySelector('#summary-title').textContent = variable.title;
  document.querySelector('#summary-unit').textContent = variable.unit;
  const chart = document.querySelector('#summary-chart');
  chart.innerHTML = variable.chart === 'range' ? renderRange(variable) : renderBars(variable);
  chart.setAttribute('aria-label', `${variable.label}: ${variable.headline}`);
  document.querySelector('#variable-note').textContent = variable.note;
}

function selectCategory(key) {
  if (!dataCatalog[key]) return;
  currentCategory = key;
  currentVariable = 0;
  renderCategoryTabs();
  renderVariableMenu();
  renderVariableDetail();
}

function selectVariable(index) {
  currentVariable = index;
  renderVariableMenu();
  renderVariableDetail();
}

renderCategoryTabs();
renderVariableMenu();
renderVariableDetail();

const navDataTrigger = document.querySelector('.nav-data-trigger');
const navSubmenu = document.querySelector('.nav-submenu');
navDataTrigger.addEventListener('click', () => {
  const open = navDataTrigger.getAttribute('aria-expanded') === 'true';
  navDataTrigger.setAttribute('aria-expanded', String(!open));
  navSubmenu.classList.toggle('is-open', !open);
});
document.querySelectorAll('[data-nav-category]').forEach((link) => link.addEventListener('click', () => {
  selectCategory(link.dataset.navCategory);
  navDataTrigger.setAttribute('aria-expanded', 'false');
  navSubmenu.classList.remove('is-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.metric, .flow-row, .signal-card, .resource-card').forEach((element) => observer.observe(element));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
