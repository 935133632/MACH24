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
      { name:'age_at_draw', label:'Age at blood draw', kind:'Continuous · years', definition:'Age in years on the date of the baseline blood draw used for cohort entry.', available:'24,125', completeness:'100.0%', headline:'Median 64.1 years · IQR 57.0–70.6', title:'Age distribution', unit:'Participants per 5-year band', chart:'bars', note:'Age is summarized at baseline. The public view uses five-year bins and does not expose participant-level dates.', data:[['18–22',39,'39 · 0.2%'],['23–27',82,'82 · 0.3%'],['28–32',123,'123 · 0.5%'],['33–37',202,'202 · 0.8%'],['38–42',321,'321 · 1.3%'],['43–47',408,'408 · 1.7%'],['48–52',2019,'2,019 · 8.4%'],['53–57',3605,'3,605 · 14.9%'],['58–62',4314,'4,314 · 17.9%'],['63–67',4712,'4,712 · 19.5%'],['68–72',3875,'3,875 · 16.1%'],['73–77',2601,'2,601 · 10.8%'],['78–82',1213,'1,213 · 5.0%'],['83+',611,'611 · 2.5%']] },
      { name:'sex', label:'Recorded sex', kind:'Categorical', definition:'Recorded sex field available in the baseline clinical extract.', available:'24,125', completeness:'100.0%', headline:'Male 50.4% · Female 49.6%', title:'Recorded sex', unit:'Participants', chart:'bars', note:'This summary reflects the source variable as recorded and should not be interpreted as a measure of gender identity.', data:[['Male',12149,'12,149 · 50.4%'],['Female',11976,'11,976 · 49.6%']] },
      { name:'race_group', label:'Race group', kind:'Categorical', definition:'Harmonized race group from the baseline clinical record.', available:'24,125', completeness:'98.0% known', headline:'White 80.4% · Black 8.1% · Asian 3.1%', title:'Race distribution', unit:'Participants', chart:'bars', note:'Unknown values remain explicit. Categories reflect the harmonized source field and do not imply genetic ancestry.', data:[['White',19385,'19,385 · 80.4%'],['Black',1945,'1,945 · 8.1%'],['Asian',746,'746 · 3.1%'],['Other',1572,'1,572 · 6.5%'],['Unknown',477,'477 · 2.0%']] },
      { name:'smoking_history', label:'Smoking history', kind:'Categorical', definition:'Baseline smoking history grouped as never, ever or unknown.', available:'24,125', completeness:'79.2% known', headline:'Never 40.0% · Ever 33.9% · Unknown 26.0%', title:'Smoking history', unit:'Participants', chart:'bars', note:'The “ever” category combines former and current smoking records. Unknown is retained as a separate category.', data:[['Never',9649,'9,649 · 40.0%'],['Ever',8199,'8,199 · 34.0%'],['Unknown',6277,'6,277 · 26.0%']] }
    ]
  },
  clinical: {
    label:'Clinical', code:'CLN',
    variables:[
      { name:'primary_cancer_site', label:'Primary cancer site', kind:'Categorical', definition:'Grouped solid-tumor site associated with cohort eligibility at baseline.', available:'24,125', completeness:'99.95% classified', headline:'Updated site groups', title:'Cancer-site composition', unit:'Participants', chart:'bars', note:'Sites are grouped for aggregate reporting. The updated public view uses the refreshed clinical extract.', data:[['Breast',4242,'4,242 · 17.6%'],['Other',4030,'4,030 · 16.7%'],['Prostate',3716,'3,716 · 15.4%'],['Lung',2855,'2,855 · 11.8%'],['Colorectal',1842,'1,842 · 7.6%'],['Gynecologic',1741,'1,741 · 7.2%'],['Kidney',1436,'1,436 · 5.9%'],['Unknown',1372,'1,372 · 5.7%'],['Head & neck',906,'906 · 3.8%'],['Bladder',876,'876 · 3.6%'],['Thyroid',810,'810 · 3.4%'],['Pancreas',472,'472 · 2.0%']] },
      { name:'ch_group', label:'Clonal hematopoiesis group', kind:'Derived categorical', definition:'Mutually exclusive baseline classification using retained variants and the conventional 2% VAF boundary.', available:'24,125', completeness:'100.0%', headline:'Any retained CH mutation 43.5%', title:'Baseline CH classification', unit:'Participants', chart:'bars', note:'Low-VAF CH only means all retained variants are below 2% VAF. Conventional CHIP includes any retained variant at or above 2% VAF.', data:[['No detected CH',13636,'13,636 · 56.5%'],['Low-VAF CH only',6730,'6,730 · 27.9%'],['Conventional CHIP',3759,'3,759 · 15.6%']] }
    ]
  },
  genomics: {
    label:'Genomics', code:'GEN',
    variables:[
      { name:'variant_gene', label:'Mutated gene', kind:'Categorical · 23 panel genes', definition:'Gene symbol assigned to each retained clonal hematopoiesis variant in the capture panel.', available:'16,657 variants', completeness:'100.0%', headline:'DNMT3A and TET2 dominate the landscape', title:'Retained variants by gene', unit:'Variant count', chart:'bars', note:'The capture panel contains 23 genes. Updated retained variants were observed in 21 genes in this release. Counts are variant level and can exceed the number of carriers.', data:[['DNMT3A',6940,'6,940'],['TET2',3576,'3,576'],['PPM1D',1856,'1,856'],['CHEK2',1322,'1,322'],['TP53',869,'869'],['ASXL1',774,'774'],['CBL',232,'232'],['SF3B1',217,'217'],['GNAS',153,'153'],['JAK2',148,'148'],['GNB1',145,'145'],['BRCC3',109,'109']] },
      { name:'variant_allele_frequency', label:'Variant allele frequency', kind:'Continuous · proportion', definition:'Alternate-read fraction for each retained variant, summarized separately below and above the 2% threshold.', available:'16,657 variants', completeness:'100.0%', headline:'Low-VAF median 0.73% · CHIP median 4.39%', title:'Variant classes', unit:'Variants', chart:'bars', note:'VAF is a sequencing measure, not a direct clone-size measurement. Low-VAF detection does not replace orthogonal validation.', data:[['Low VAF <2%',12143,'12,143 · 72.9%'],['VAF ≥2%',4514,'4,514 · 27.1%']] },
      { name:'retained_variant_status', label:'Retained CH mutation status', kind:'Derived binary', definition:'Participant-level indicator for at least one variant retained by the primary analysis filters.', available:'24,125', completeness:'100.0%', headline:'10,489 participants with ≥1 retained variant', title:'Participant-level status', unit:'Participants', chart:'bars', note:'Variant retention follows the updated retained CH mutation file.', data:[['Retained CH mutation',10489,'10,489 · 43.5%'],['No retained mutation',13636,'13,636 · 56.5%']] }
    ]
  },
  sequencing: {
    label:'Sequencing', code:'SEQ',
    variables:[
      { name:'sequencing_depth', label:'Sequencing depth', kind:'Continuous · reads', definition:'Total read depth at evaluated variant positions, summarized by analytic variant class.', available:'Analytic variant records', completeness:'Reported by class', headline:'Low VAF median depth 2,943×', title:'Median sequencing depth', unit:'Median reads', chart:'bars', note:'Depth supports interpretation of low frequency calls but does not constitute formal assay validation.', data:[['Low VAF <2%',2943,'2,943× · updated summary'],['No retained CH',2684,'2,684× · updated summary'],['CHIP ≥2%',2659.5,'2,660× · updated summary']] }
    ]
  },
  outcomes: {
    label:'Outcomes', code:'OUT',
    variables:[
      { name:'observed_followup_years', label:'Observed follow up time', kind:'Continuous · years', definition:'Elapsed time from baseline blood draw to recorded death or last valid contact.', available:'24,124', completeness:'99.996%', headline:'Median 5.71 years', title:'Observed follow up range', unit:'Years', chart:'range', range:{min:0.05,max:18.54,median:5.71}, note:'Time zero is the baseline blood draw. One participant lacked a valid endpoint in the updated outcome profile.' },
      { name:'vital_status', label:'Vital status', kind:'Time-to-event status', definition:'Observed death after blood draw versus censored status for overall-survival analysis.', available:'24,125', completeness:'Analysis status 100.0%', headline:'8,281 observed deaths', title:'Overall-survival status', unit:'Participants', chart:'bars', note:'The survival preview uses the updated clinical extract; status is not a crude cross-sectional mortality measure.', data:[['Censored',15844,'15,844 · 65.6%'],['Death observed',8281,'8,281 · 34.3%']] },
      { name:'last_contact_available', label:'Valid follow up endpoint', kind:'Binary availability', definition:'Indicator that a participant has a valid death date or last contact date after baseline.', available:'24,125', completeness:'99.996%', headline:'24,124 valid endpoints', title:'Follow up endpoint availability', unit:'Participants', chart:'bars', note:'Dates after the data review cutoff were treated as invalid future or sentinel values for outcome profiling.', data:[['Valid endpoint',24124,'24,124 · 100.0%'],['Missing endpoint',1,'1 · <0.1%']] },
      { name:'registry_confirmed_hm', label:'Registry confirmed hematologic malignancy', kind:'Candidate incident outcome', definition:'Post draw hematologic malignancy identified in the cancer registry and retained as a candidate longitudinal endpoint.', available:'24,125', completeness:'Registry linked', headline:'135 registry confirmed participants', title:'Registry confirmed candidate outcome', unit:'Participants', chart:'bars', note:'This is a candidate outcome, not a fully adjudicated incident endpoint. Disease coding, morphology, event timing and competing risk rules still require specification.', data:[['Registry confirmed',135,'135 · 0.6%'],['No registry confirmed event',23990,'23,990 · 99.4%']] }
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
