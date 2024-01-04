export default {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
  '*.{html,vue,vss,sass,less}': ['prettier --write'],
  'package.json': ['prettier --write'],
  '*.md': ['prettier --write'],
};
