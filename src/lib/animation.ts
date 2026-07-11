/**
 * Shared animation presets for Framer Motion.
 * Every section uses these — never hand-rolled duration tweens.
 *
 * Philosophy: spring physics, blur dissolve on entrance.
 * Things materialize. They don't slide in like a slideshow.
 */

export const EASE_OUT = [0.16, 1, 0.32, 1] as [number, number, number, number];
export const EASE_IN  = [0.4, 0, 1, 1]     as [number, number, number, number];

/** Primary spring — high damping, low stiffness. Feels physical, never bouncy. */
export const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 22,
  mass: 1,
};

/** Fast spring — button hovers, pill indicators, small toggles. */
export const FAST_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
};

/** Layout spring — nav pill, repositioning, layoutId animations. */
export const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

/**
 * Section entrance.
 * Usage: <motion.div {...sectionEntrance()} />
 *   or   initial="hidden" whileInView="show" variants={SECTION_VARIANTS}
 */
export const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING, duration: 0.85 },
  },
} as const;

/**
 * Card/item stagger container.
 * Wrap a grid of items in this; each child uses ITEM_VARIANTS.
 */
export const STAGGER_CONTAINER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
} as const;

/**
 * Individual staggered item.
 * Pairs with STAGGER_CONTAINER.
 */
export const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING, duration: 0.7 },
  },
} as const;

/**
 * Viewport settings for whileInView.
 * `once: true` so animations don't re-trigger on scroll-up.
 */
export const VIEWPORT = { once: true, amount: 0.15 } as const;
export const VIEWPORT_CENTER = { once: true, amount: 0.25 } as const;
