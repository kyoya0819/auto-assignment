/**
 * Create a new array by extracting a specific number of arrays.
 *
 * @param array
 * @param num
 */
const extractArray = (array: string[], num: number): string[] => {
    const newArray: string[] = [];

    while (newArray.length < num && 0 < array.length) {
        const rand = Math.floor(Math.random() * array.length);
        newArray.push(array[rand]);
        array.splice(rand, 1);
    }

    return newArray;
};
export default extractArray;