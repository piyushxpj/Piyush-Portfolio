// The artwork is absolutely positioned inside the perforated paper. Measure
// only the natural content, never the stage whose height depends on this value.
export function observeHomeContentSize(shell, ResizeObserverClass = ResizeObserver) {
  const stage = shell.querySelector('.hero-v2__stage');
  const content = shell.querySelector('.hero-v2__content');
  const navigation = shell.querySelector('.hero-v2__navigation');
  const properties = ['--home-content-height', '--home-nav-height'];
  const previous = properties.map(name => [name, stage.style.getPropertyValue(name)]);
  const update = () => {
    [content, navigation].forEach((element, index) => {
      const value = `${element.offsetHeight}px`;
      if (stage.style.getPropertyValue(properties[index]) !== value) {
        stage.style.setProperty(properties[index], value);
      }
    });
  };
  update();
  const observer = new ResizeObserverClass(update);
  observer.observe(content);
  observer.observe(navigation);
  return () => {
    observer.disconnect();
    previous.forEach(([name, value]) => {
      if (value) stage.style.setProperty(name, value);
      else stage.style.removeProperty(name);
    });
  };
}
