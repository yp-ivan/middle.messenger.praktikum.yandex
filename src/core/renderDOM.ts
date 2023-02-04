import Block from './Block';

export default function renderDOM(block: Block, selector = '#app') {
  const root = document.querySelector(selector) as HTMLDivElement;
  root.innerHTML = '';
  root.appendChild(block.getContent());
}
