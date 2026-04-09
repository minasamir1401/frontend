const fs = require('fs');
const path = require('path');

function fixJsxAttributes(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixJsxAttributes(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // existing standard generic ones
      content = content.replace(/preserveaspectratio/g, 'preserveAspectRatio');
      content = content.replace(/viewbox/g, 'viewBox');
      content = content.replace(/stroke-width/g, 'strokeWidth');
      content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
      content = content.replace(/stroke-linecap/g, 'strokeLinecap');
      content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
      content = content.replace(/fill-rule/g, 'fillRule');
      content = content.replace(/clip-rule/g, 'clipRule');
      content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
      content = content.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
      
      // generic svg components missing capitalizations
      content = content.replace(/lineargradient/ig, 'linearGradient');
      content = content.replace(/stop-color/g, 'stopColor');
      content = content.replace(/stop-opacity/g, 'stopOpacity');

      // html stringly-typed numeric attributes vs react standard ones
      content = content.replace(/rows=\"(\d+)\"/g, 'rows={$1}');
      content = content.replace(/cols=\"(\d+)\"/g, 'cols={$1}');
      content = content.replace(/tabindex=\"([-]?\d+)\"/g, 'tabIndex={$1}');
      content = content.replace(/colspan=\"(\d+)\"/g, 'colSpan={$1}');
      content = content.replace(/maxlength=\"(\d+)\"/g, 'maxLength={$1}');
      content = content.replace(/minlength=\"(\d+)\"/g, 'minLength={$1}');
      content = content.replace(/checked=\"\"/g, 'defaultChecked');
      content = content.replace(/checked=\"checked\"/g, 'defaultChecked');

      // standard react mappings that html-to-jsx might have missed from raw HTML 
      content = content.replace(/for=\"/g, 'htmlFor=\"');
      content = content.replace(/\bclass=\"/g, 'className=\"');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

fixJsxAttributes(path.join(__dirname, '..', 'src', 'app'));
console.log('Fixed SVG, numerics, and boolean JSX attributes.');
