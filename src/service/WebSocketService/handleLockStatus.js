export const handleLockStatus = (socket, setProblemStatementDisabled, setWorkshopAreaDisabled, setWorkingMaterialDisabled) => {
    socket.on("disableProblemStatement", () => {
        setProblemStatementDisabled(true);
    });

    socket.on("enableProblemStatement", () => {
        setProblemStatementDisabled(false);
        console.log("hello");
    });

    socket.on("disableWorkshopArea", () => {
        setWorkshopAreaDisabled(true);
    });

    socket.on("enableWorkshopArea", () => {
        setWorkshopAreaDisabled(false);
    });

    socket.on("disableWorkingMaterial", () => {
        setWorkingMaterialDisabled(true);
    });

    socket.on("enableWorkingMaterial", () => {
        setWorkingMaterialDisabled(false);
    });
}