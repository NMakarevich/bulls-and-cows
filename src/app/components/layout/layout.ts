import header from '../header/header.ts';

export default function layout() {
  const headerElement = header();

  const render = () => {
    document.body.append(headerElement);
  };

  return { render } as const;
}
