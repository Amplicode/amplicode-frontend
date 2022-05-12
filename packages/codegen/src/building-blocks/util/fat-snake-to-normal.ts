/**
 * Transforms FAT_SNAKE_CASE to Normal text.
 *
 * @param str
 */
export const fatSnakeToNormal = (str: string): string => {
	return str.charAt(0) + str.slice(1)
    .replace(/_/g, ' ')
    .toLowerCase()
}; 