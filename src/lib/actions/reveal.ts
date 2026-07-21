// Reveals an element with a fade (and optional rise from below) the first time
// it scrolls into view. Usage in a .svelte file:
//
//   <div use:reveal>...</div>                      plain fade-in
//   <div use:reveal={{ y: 24 }}>...</div>           fade + rise from below
//   <div use:reveal={{ y: 24, delay: 150 }}>...</div>   staggered fade + rise
//
// Fires once per element (unobserves itself after revealing) and does nothing
// if the visitor has requested reduced motion.

export interface RevealOptions {
	/** Pixels to rise from below. 0 (default) = plain fade-in, no movement. */
	y?: number;
	/** Transition duration in ms. */
	duration?: number;
	/** Delay before the transition starts, in ms — handy for staggering a group. */
	delay?: number;
	/** IntersectionObserver threshold — how much of the element must be visible. */
	threshold?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	let { y = 0, duration = 700, delay = 0, threshold = 0.15 } = options;

	const prefersReducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	function show() {
		node.style.opacity = '1';
		node.style.transform = 'none';
	}

	if (prefersReducedMotion) {
		show();
		return {};
	}

	node.style.opacity = '0';
	node.style.transform = y ? `translateY(${y}px)` : 'none';
	node.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
	node.style.willChange = 'opacity, transform';

	let observer: IntersectionObserver | null = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					show();
					observer?.unobserve(node);
					observer?.disconnect();
					observer = null;
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -10% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer?.disconnect();
			observer = null;
		}
	};
}