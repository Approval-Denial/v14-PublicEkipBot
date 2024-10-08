async function sendLongCodeBlocks(channel, lang, content) {
    const codeBlockPrefix = '```' + lang + '\n';
    const codeBlockSuffix = '\n```';

    if (content.length <= 1980 - (codeBlockPrefix.length + codeBlockSuffix.length)) {
        channel.send({ content: codeBlockPrefix + content + codeBlockSuffix });
    } else {
        const chunks = [];
        while (content.length) {
            const chunk = content.slice(0, 1980 - (codeBlockPrefix.length + codeBlockSuffix.length));
            content = content.slice(1980 - (codeBlockPrefix.length + codeBlockSuffix.length));
            chunks.push(chunk);
        }

        for (const chunk of chunks) {
            channel.send({ content: codeBlockPrefix + chunk + codeBlockSuffix });
        }
    }
}

module.exports = { sendLongCodeBlocks };
