import axios from "axios";

function getVersionAndAlias(runtimes, language) {
    const runtime = runtimes.find(runtime => runtime.language === language);
    if (runtime) {
        const version = runtime.version;
        const alias = runtime.aliases.length > 0 ? runtime.aliases[0] : null;
        return { version, alias };
    }
    return null; // Or throw an error if necessary
}

export const runtimeService = async ({ language }) => {
    try {        
        const runtimes = await axios.get('https://emkc.org/api/v2/piston/runtimes');
        const { version, alias } = getVersionAndAlias(runtimes, language);
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
