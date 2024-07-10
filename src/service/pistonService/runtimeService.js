import axios from "axios";

function getVersionAndAlias(runtimes, language,index) {
    const runtime = runtimes.data[index].runtime
    const version = runtimes.data[index].version
    const alias = runtimes.data[index].aliases[0]

    return {version,alias}
}

export const runtimeService = async ({ language }) => {
    try {
        const runtimes = await axios.get('https://emkc.org/api/v2/piston/runtimes');
        const index = runtimes.data.findIndex(item => item.language === 'c');
        const { version, alias } = getVersionAndAlias(runtimes, language, index);
        if (version && alias) {
            return { version, alias };
        } else {
            throw new Error(`Runtime information for ${language} not found.`);
        }
    } catch (error) {
        console.error('Error in runtimeService:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};
