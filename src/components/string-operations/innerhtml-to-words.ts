/**
 *
 * @param {HTMLElement} HMTLElement with text / html content
 * @return {Array}
 */
const split = (HMTLElement) => {
    function removeEmptyStrings(k) {
        return k !== '';
    }

    const rWordBoundary = /[\s\n\t]+/; // Includes space, newline, tab
    const output = [];

    for (let i = 0; i < HMTLElement.childNodes.length; ++i) { // Iterate through all nodes
        const node = HMTLElement.childNodes[i];

        if (node.nodeType === Node.TEXT_NODE) { // The child is a text node
            const words = node.nodeValue.split(rWordBoundary).filter(removeEmptyStrings);
            if (words.length) {
                output.push.apply(output, words);
            }
        } else if (node.nodeType === Node.COMMENT_NODE) {
            // What to do here? You can do what you want
        } else {
            output.push(node.outerHTML);
        }
    }
    return output;
};

export default split;