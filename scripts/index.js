'use strict';

const moveBackgroundLayers = () => {
  const layerNodes = ['div-before', 'div-after', 'main-before', 'main-after'],
  movementDurations = ['3.5s', '3s', '2.5s', '2s'],
  element = document.documentElement.style;

  setTimeout(() => {
    layerNodes.map(layer => {
      element.setProperty(`--initial-${layer}-radius`, `calc(var(--${layer}-radius) + 5deg)`);
      element.setProperty(`--rotate-${layer}`, `rotate-layers ${movementDurations[layerNodes.indexOf(layer)]} ease-out infinite alternate-reverse`);
    });
  }, 1750);
}; // Keep the background layer moving.

const rotateBackgroundLayers = (initialRadius = [], finalRadius = []) => {  
  const layerNodes = ['div-before', 'div-after', 'main-before', 'main-after'],
  movementDurations = ['1.75s', '1.5s', '1.25s', '1s'],
  element = document.documentElement.style;

  layerNodes.map(layer => {
    element.setProperty(`--initial-${layer}-radius`, initialRadius[layerNodes.indexOf(layer)]);
    element.setProperty(`--${layer}-radius`, finalRadius[layerNodes.indexOf(layer)]);
    element.setProperty(`--rotate-${layer}`, `invert-layers ${movementDurations[layerNodes.indexOf(layer)]} ease-out`);
  });

  moveBackgroundLayers();
}; // Rotate the background layer.

const hideElement = element => {
  const style = element.style;
  style.opacity = 0;
  style.animation = 'fading-out 1.75s ease-out';
  setTimeout(() => style.display = 'none', 1750);
}; // Hide an element.

const showElement = element => {
  const style = element.style;
  style.display = 'flex';
  style.opacity = 1;
  style.animation = 'popping-out 1.75s ease-out';
}; // Show an element.

const generateFinalRadius = (radius = [], rotation = 0) => radius.map(radius => `${Number(radius.match(/\d+/)) + rotation}deg`); // Generate the final radius.

const clickButton = () => {
  const home = document.querySelector('#main>DIV:first-child'),
  biography = document.getElementById('tribute-info'),
  frontFace = document.querySelector('#tribute-link>SPAN>SPAN:first-child');

  let initialRadius, finalRadius;

  if (frontFace.textContent === 'BIOGRAPHY') {
    frontFace.textContent = 'HOME';
    initialRadius = ['165deg', '150deg', '135deg', '120deg'];
    finalRadius = generateFinalRadius(initialRadius, 75);
    document.documentElement.style.setProperty('--timeline-line', '75%');
    document.querySelectorAll('#tribute-info>LI>A').forEach(time => time.style.animation = 'falling 1.75s ease-out');
    hideElement(home);
    showElement(biography);
  } else {
    frontFace.textContent = 'BIOGRAPHY';
    initialRadius = ['240deg', '225deg', '210deg', '195deg'];
    finalRadius = generateFinalRadius(initialRadius, 105);
    showElement(home);
    hideElement(biography);
  }
  
  document.getElementById('tribute-link').blur();
  rotateBackgroundLayers(initialRadius, finalRadius);
}; // Change the UI when the user clicks the anchor tag.

const main = () => {
  moveBackgroundLayers();
  document.getElementById('tribute-link').addEventListener('click', clickButton);
};

document.addEventListener('DOMContentLoaded', main);