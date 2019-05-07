const updatedState = (prevObject, updatedObject) => {
    return {
        ...prevObject,
        ...updatedObject
    };
};

export default updatedState;
