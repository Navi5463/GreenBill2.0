
const DEFAULT_PERCENTAGES = [
  { name: 'AC', pct: 0.40 },
  { name: 'Fridge', pct: 0.20 },
  { name: 'Water Heater', pct: 0.10 },
  { name: 'Lights', pct: 0.10 },
  { name: 'Fans', pct: 0.05 },
  { name: 'Misc', pct: 0.15 },
];

function applyQuestionnaire(defaults, questionnaire) {
  if (!questionnaire) return defaults;
  const map = defaults.reduce((acc, d) => { acc[d.name] = d.pct; return acc; }, {});
  for (const key in questionnaire) {
    const name = key.replace(/_?pct$/i, '').trim();
    if (map.hasOwnProperty(name)) {
      const v = parseFloat(questionnaire[key]);
      if (!isNaN(v)) map[name] = v;
    }
  }
  const arr = Object.keys(map).map(k => ({ name: k, pct: map[k] }));
  let total = arr.reduce((s, a) => s + a.pct, 0);
  if (total <= 0) return defaults;
  return arr.map(a => ({ name: a.name, pct: a.pct / total }));
}

function buildEstimates(units, amount, pctList, baseConfidence=0.7, questionnaireProvided=false) {
  return pctList.map(item => {
    const unitsFor = +(units * item.pct);
    const amountFor = +(amount * item.pct);
    let confidence = baseConfidence;
    if (questionnaireProvided) confidence = Math.min(0.95, baseConfidence + 0.15);
    return {
      name: item.name,
      percentage: + (item.pct * 100).toFixed(2),
      units: +unitsFor.toFixed(2),
      amount: +amountFor.toFixed(2),
      confidence: Math.round(confidence * 100),
    };
  });
}

function overallConfidence(questionnaireProvided) {
  return questionnaireProvided ? 85 : 70;
}

function getSuggestions(applianceEstimates, rules=[]) {
  const defaultRules = [
    { name: 'AC', thresholdPct: 40, message: 'AC consumption high', suggestion: 'Reduce AC hours or use economy mode' },
    { name: 'Lights', thresholdPct: 20, message: 'Lights consumption high', suggestion: 'Switch to LED and turn off unused lights' },
    { name: 'Fridge', thresholdPct: 30, message: 'Fridge usage high', suggestion: 'Check door seals and thermostat' },
  ];
  const appliedRules = rules.length ? rules : defaultRules;
  const suggestions = [];
  for (const r of appliedRules) {
    const est = applianceEstimates.find(e => e.name.toLowerCase() === r.name.toLowerCase());
    if (!est) continue;
    if (est.percentage >= r.thresholdPct) {
      suggestions.push({
        appliance: est.name,
        message: r.message,
        suggestion: r.suggestion,
        currentPct: est.percentage,
      });
    }
  }
  return suggestions;
}

module.exports = {
  analyzeBill: function ({ units, amount, questionnaire, customPercentages, rules }) {
    if (typeof units !== 'number' || typeof amount !== 'number') {
      throw new Error('units and amount numbers required');
    }
    const defaultList = DEFAULT_PERCENTAGES.map(d => ({ name: d.name, pct: d.pct }));
    const basePcts = customPercentages || defaultList;
    const pctList = applyQuestionnaire(basePcts, questionnaire);
    const applianceEstimates = buildEstimates(units, amount, pctList, 0.7, !!questionnaire);
    const oConfidence = overallConfidence(!!questionnaire);
    const suggestions = getSuggestions(applianceEstimates, rules);

    return {
      applianceEstimates,
      overallConfidence: oConfidence,
      suggestions,
    };
  }
};
