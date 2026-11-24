const sceneLoaders = {
  bunny: async () => (await import('./bunny/BunnyScene.js')).createBunnyScene,
  cat: async () => (await import('./cat/CatScene.js')).createCatScene,
  tom: async () => (await import('./tom/TomScene.js')).createTomScene,
  smart: async () => (await import('./smart/SmartScene.js')).createSmartScene,
  cards: async () => (await import('./cards/CardStageScene.js')).createCardStageScene,
};

export async function createScene(id, container, options) {
  const load = sceneLoaders[id];
  if (!load) throw new Error(`Unknown scene: ${id}`);
  const factory = await load();
  return factory(container, options);
}
