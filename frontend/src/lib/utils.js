import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes intelligently.
 * @param {...(string | object | Array<string | object>)} inputs - Class names or objects to combine.
 * @returns {string} - A single string of merged class names.
 * @example
 * cn('px-2', 'py-3', { 'bg-blue-500': true, 'text-white': false }, ['hover:bg-blue-600'])
 * // Returns: 'px-2 py-3 bg-blue-500 hover:bg-blue-600'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}