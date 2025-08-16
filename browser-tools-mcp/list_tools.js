const fs = require('fs');

const content = fs.readFileSync('mcp-server.ts', 'utf8');
const lines = content.split('\n');

console.log('🔧 MCP Browser Tools - Available Tools');
console.log('=====================================\n');

let toolCount = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('server.tool(')) {
    toolCount++;
    // Extract tool name and description
    let toolInfo = line.trim();
    
    // Handle multi-line tool definitions
    let j = i;
    while (j < lines.length && !lines[j].includes('async') && !lines[j].includes('{')) {
      j++;
      if (j < lines.length) {
        toolInfo += ' ' + lines[j].trim();
      }
    }
    
    // Parse tool name and description
    const match = toolInfo.match(/server\.tool\(\s*"([^"]+)"\s*,\s*"([^"]+)"/);
    if (match) {
      const [, name, description] = match;
      console.log(`${toolCount}. ${name}`);
      console.log(`   Description: ${description}\n`);
    } else {
      // Handle cases without description or different format
      const nameMatch = toolInfo.match(/server\.tool\(\s*"([^"]+)"/);
      if (nameMatch) {
        console.log(`${toolCount}. ${nameMatch[1]}`);
        console.log(`   Description: [No description provided]\n`);
      }
    }
  }
}

console.log(`Total tools available: ${toolCount}`);
