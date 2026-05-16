'use client';

import type { MutableRefObject, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type ReplicaOrigin = {
  x: number;
  y: number;
};

type NodeChild = {
  element: HTMLElement;
  origin: ReplicaOrigin;
  blur: number;
  scale: number;
  delay: number;
  hexId: string;
  orderIndex: number;
  isHeading: boolean;
  isCard: boolean;
  isTag: boolean;
  isListItem: boolean;
  listIndex: number;
};

type UseNodeChildrenResult = {
  itemsRef: MutableRefObject<NodeChild[]>;
  ready: boolean;
};

type UseNodeChildrenOptions = {
  enabled: boolean;
};

const ORIGINS: ReplicaOrigin[] = [
  { x: -14, y: 0 },
  { x: 14, y: 0 },
  { x: -8, y: -10 },
  { x: 8, y: -10 },
  { x: 0, y: -14 },
];

const randomInRange = (min: number, max: number) => min + Math.random() * (max - min);

const createHexId = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

const toElementArray = (nodeList: NodeListOf<Element>) => Array.from(nodeList).filter((node): node is HTMLElement => node instanceof HTMLElement);

const filterElements = (elements: HTMLElement[]) =>
  elements.filter((element) => {
    if (element.closest('[data-no-drift]')) {
      return false;
    }
    if (element.tagName.toLowerCase() === 'svg') {
      return false;
    }
    return true;
  });

const uniqueElements = (elements: HTMLElement[]) => {
  const seen = new Set<HTMLElement>();
  const ordered: HTMLElement[] = [];
  elements.forEach((element) => {
    if (!seen.has(element)) {
      seen.add(element);
      ordered.push(element);
    }
  });
  return ordered;
};

export function useNodeChildren(
  contentRef: RefObject<HTMLElement>,
  options: UseNodeChildrenOptions
): UseNodeChildrenResult {
  const { enabled } = options;
  const itemsRef = useRef<NodeChild[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || !contentRef.current) {
      itemsRef.current = [];
      setReady(false);
      return;
    }

    const container = contentRef.current;

    const headings = filterElements(toElementArray(container.querySelectorAll('h1, h2, h3')));
    const eyebrows = filterElements(
      toElementArray(container.querySelectorAll('p.font-mono, span.font-mono'))
    );
    const paragraphs = filterElements(
      toElementArray(container.querySelectorAll('p')).filter((element) => !element.classList.contains('font-mono'))
    );
    const listItems = filterElements(toElementArray(container.querySelectorAll('li')));
    const cards = filterElements(toElementArray(container.querySelectorAll('[data-card]')));
    const tags = filterElements(toElementArray(container.querySelectorAll('[data-tag]')));

    const orderedElements = uniqueElements([
      ...headings,
      ...eyebrows,
      ...paragraphs,
      ...listItems,
      ...cards,
      ...tags,
    ]);

    let listIndex = 0;

    itemsRef.current = orderedElements.map((element, index) => {
      const baseOrigin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
      const isTag = element.hasAttribute('data-tag');
      const originScale = isTag ? 0.5 : 1;
      const origin = {
        x: baseOrigin.x * originScale,
        y: baseOrigin.y * originScale,
      };
      const blur = randomInRange(2, 5);
      const scale = randomInRange(0.94, 0.98);
      const delay = 300 + index * 55;
      const hexId = createHexId();
      const isHeading = ['h1', 'h2', 'h3'].includes(element.tagName.toLowerCase());
      const isCard = element.hasAttribute('data-card');
      const isListItem = element.tagName.toLowerCase() === 'li';

      const item: NodeChild = {
        element,
        origin,
        blur,
        scale,
        delay,
        hexId,
        orderIndex: index,
        isHeading,
        isCard,
        isTag,
        isListItem,
        listIndex: isListItem ? listIndex++ : 0,
      };

      element.style.setProperty('--drift-x', `${origin.x}px`);
      element.style.setProperty('--drift-y', `${origin.y}px`);
      element.style.setProperty('--drift-scale', `${scale}`);
      element.style.setProperty('--drift-duration', `${randomInRange(3, 5).toFixed(2)}s`);
      element.style.willChange = 'transform, opacity, filter';

      return item;
    });

    setReady(true);
  }, [contentRef, enabled]);

  return { itemsRef, ready };
}

export type { NodeChild };
