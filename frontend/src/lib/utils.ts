import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina classes Tailwind CSS com segurança
 * Resolve conflitos de especificidade
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
