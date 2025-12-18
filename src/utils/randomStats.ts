export const randomStats = () => ({
  attack: Math.floor(Math.random() * 100) + 1,
  defense: Math.floor(Math.random() * 100) + 1,
  speed: Math.floor(Math.random() * 100) + 1,
  special: Math.floor(Math.random() * 100) + 1,
  level: Math.floor(Math.random() * 100) + 1
});
