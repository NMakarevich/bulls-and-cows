import { describe, expect, test, vi } from 'vitest';
import { createElement } from '../utils/createElement.ts';

describe('createElement', () => {
  test('Should return an element', () => {
    const element = createElement('div');
    expect(element).toBeInstanceOf(HTMLElement);
  });
  test('Should set class to an element', () => {
    const element = createElement('div', { classList: ['test'] });
    expect(element.className).toEqual('test');
  });
  test('Should set attribute to an element', () => {
    const element = createElement('div', { attributes: { 'data-name': 'test' } });
    expect(element.getAttribute('data-name')).toBe('test');
  });
  test('Should set reference to an element', () => {
    let ref = null;
    const element = createElement('div', { setRef: (el) => (ref = el) });
    expect(ref).toBeInstanceOf(HTMLElement);
    expect(element.outerHTML).toBe(ref!.outerHTML);
  });
  test('Should have children', () => {
    const element = createElement('div', { children: [createElement('p')] });
    const paragraph = element.querySelector('p');
    expect(paragraph).toBeInstanceOf(Element);
  });
  test('Should have event listeners', async () => {
    const spy = vi.spyOn(console, 'log');
    const element = createElement('div', {
      eventHandlers: [{ type: 'click', callback: () => console.log('click') }],
    });
    element.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('click');
  });
});
