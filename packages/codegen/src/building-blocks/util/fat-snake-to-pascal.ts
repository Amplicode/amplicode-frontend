import { capitalizeFirst } from "../../common/utils";

/**
 * Transforms FAT_SNAKE_CASE to PascalCase.
 *
 * @param str
 */
 export const fatSnakeToPascal = (str: string): string => {
	return str
    .split('_')
    .map(e => capitalizeFirst(e.toLowerCase()))
    .join('')
}; 