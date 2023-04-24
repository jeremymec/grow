

export const createSecureFetcher = (userCode: string) => {

    return (input: RequestInfo | URL): Promise<Response> => {

        return fetch(input, {
            headers: {
                'authorization': `userCode ${userCode}`
            }
        })

    }
}