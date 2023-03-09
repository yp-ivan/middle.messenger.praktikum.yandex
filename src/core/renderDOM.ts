import Block from './Block';

const renderDOM = (block: Block, selector = '#app') => {
  const root = document.querySelector(selector) as HTMLDivElement;
  root.innerHTML = '';
  root.appendChild(block.getContent());
};

export default renderDOM;
