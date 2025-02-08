import { readdirSync } from 'fs';
import { join } from 'path';

const ingredientsDirectory = join(process.cwd(), 'static/images/ingredients');
const productsDirectory = join(process.cwd(), 'static/images/products');
const pizzaDir = join(process.cwd(), 'static/images/pizzas');

export function importAllImages() {
    const importImagesFromDirectory = (directory: string) => {
        return readdirSync(directory).reduce((acc, file) => {
            const fileName = file.split('.')[0];
            acc[fileName] = `${directory.replace(process.cwd(), '')}/${file}`;
            return acc;
        }, {} as Record<string, string>);
    };

    const ingredientsImages = importImagesFromDirectory(ingredientsDirectory);
    const productsImages = importImagesFromDirectory(productsDirectory);
    const pizzasImages = importImagesFromDirectory(pizzaDir);

    return { ...ingredientsImages, ...productsImages, ...pizzasImages };
}