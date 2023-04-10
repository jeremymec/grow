import { adjectives } from "../../res/adjectives";
import { nouns } from "../../res/nouns";


export const generateUserCode = () => {

    const first_adjective = adjectives[Math.floor(Math.random() * (adjectives.length - 1))];
    const second_adjective = adjectives[Math.floor(Math.random() * (adjectives.length - 1))];

    const noun = nouns[Math.floor(Math.random() * (nouns.length - 1))]

    return `${first_adjective} ${second_adjective} ${noun}`

}