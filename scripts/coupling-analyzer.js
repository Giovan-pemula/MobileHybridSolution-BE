const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Run Madge to output dependency graph JSON
  const output = execSync('npx madge --json src/ --exclude "^(\\.\\./)*generated"', { encoding: 'utf-8' });
  const graph = JSON.parse(output);

  const ce = {}; // Efferent Coupling
  const ca = {}; // Afferent Coupling

  // Initialize keys
  for (const file of Object.keys(graph)) {
    ce[file] = graph[file].length;
    if (ca[file] === undefined) {
      ca[file] = 0;
    }
  }

  // Calculate Afferent Coupling (Ca)
  for (const file of Object.keys(graph)) {
    for (const dep of graph[file]) {
      const resolvedDep = dep.endsWith('.ts') ? dep : `${dep}.ts`;
      const matchingKey = Object.keys(graph).find(
        (key) => key === dep || key === resolvedDep || key.replace(/\.ts$/, '') === dep
      );

      if (matchingKey) {
        ca[matchingKey] = (ca[matchingKey] || 0) + 1;
      } else {
        ca[dep] = (ca[dep] || 0) + 1;
      }
    }
  }

  // Ensure artifacts directory exists
  const artifactsDir = path.join(__dirname, '..', 'artifacts');
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir);
  }

  // Prepare console table data
  const sortedFiles = Object.keys(graph).sort();
  const consoleRows = [];

  // Format the output report
  let md = '# Coupling Metrics Analysis (ISO/IEC 25010 - Maintainability)\n\n';
  md += 'Coupling analysis evaluates the degree of interdependence between modules in the codebase:\n';
  md += '- **Afferent Coupling ($C_a$)**: Incoming dependencies. Number of other modules depending on this module.\n';
  md += '- **Efferent Coupling ($C_e$)**: Outgoing dependencies. Number of modules this module depends on.\n';
  md += '- **Instability ($I = \\frac{C_e}{C_a + C_e}$)**: Range [0 (completely stable) to 1 (completely unstable)].\n\n';
  
  md += '| Module Path | Afferent Coupling ($C_a$) | Efferent Coupling ($C_e$) | Instability ($I$) | Category |\n';
  md += '| :--- | :---: | :---: | :---: | :--- |\n';

  for (const file of sortedFiles) {
    const c_a = ca[file] || 0;
    const c_e = ce[file] || 0;
    const sum = c_a + c_e;
    const instability = sum === 0 ? 0 : parseFloat((c_e / sum).toFixed(2));
    
    let category = 'Stable';
    if (instability > 0.7) {
      category = 'Unstable (Flexible)';
    } else if (instability >= 0.3) {
      category = 'Balanced';
    }

    md += `| \`${file}\` | ${c_a} | ${c_e} | ${instability} | ${category} |\n`;

    consoleRows.push({
      'Module Path': file,
      'Afferent (Ca)': c_a,
      'Efferent (Ce)': c_e,
      'Instability (I)': instability,
      'Stability Category': category
    });
  }

  const outputPath = path.join(artifactsDir, 'coupling_report.md');
  fs.writeFileSync(outputPath, md, 'utf-8');

  console.log(`\n================================ COUPLING METRICS ANALYSIS ================================`);
  console.table(consoleRows);
  console.log(`===========================================================================================`);
  console.log(`✔ Coupling analysis completed successfully!`);
  console.log(`Report saved to: ${outputPath}\n`);

} catch (error) {
  console.error('Error running coupling analysis:', error.message);
  process.exit(1);
}
