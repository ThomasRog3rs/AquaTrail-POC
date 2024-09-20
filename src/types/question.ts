export type Question = {
    id: number,
    question: string,
    options: string[],
    type: string,
    hasBeenAnswered: boolean,
    theAnswer: string[] | undefined,
}