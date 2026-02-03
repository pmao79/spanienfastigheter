export const normalizePropertyDescription = (input: string): string => {
    if (!input) return '';

    let text = input;

    text = text.replace(/&amp;#(\d+);/g, '&#$1;');
    text = text.replace(/&amp;#x([0-9a-fA-F]+);/g, '&#x$1;');
    text = text.replace(/&#13;|&#10;/g, '\n');

    text = text
        .replace(/&#(\d+);/g, (_match, code) => {
            const num = Number(code);
            if (!Number.isFinite(num)) return '';
            try {
                return String.fromCodePoint(num);
            } catch {
                return '';
            }
        })
        .replace(/&#x([0-9a-fA-F]+);/g, (_match, code) => {
            const num = Number.parseInt(code, 16);
            if (!Number.isFinite(num)) return '';
            try {
                return String.fromCodePoint(num);
            } catch {
                return '';
            }
        });

    text = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

    text = text
        .replace(/<\s*br\s*\/?>/gi, '\n')
        .replace(/<\s*\/\s*p\s*>/gi, '\n\n')
        .replace(/<\s*p\s*>/gi, '')
        .replace(/<\s*\/\s*li\s*>/gi, '\n')
        .replace(/<\s*li\s*>/gi, '- ')
        .replace(/<\s*\/\s*ul\s*>/gi, '\n')
        .replace(/<\s*ul\s*>/gi, '')
        .replace(/<\s*\/\s*ol\s*>/gi, '\n')
        .replace(/<\s*ol\s*>/gi, '')
        .replace(/<[^>]+>/g, '');

    text = text.replace(/\r\n?/g, '\n');
    text = text.replace(/\u00a0/g, ' ');
    text = text.replace(/[ \t]+/g, ' ');
    text = text.replace(/\n[ \t]+/g, '\n');
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.trim();

    if (!text.includes('\n') && text.length > 300) {
        const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
        if (sentences.length >= 3) {
            const paragraphs: string[] = [];
            let buffer: string[] = [];
            let bufferLength = 0;

            for (const rawSentence of sentences) {
                const sentence = rawSentence.trim();
                if (!sentence) continue;
                buffer.push(sentence);
                bufferLength += sentence.length;

                if (buffer.length >= 2 || bufferLength > 320) {
                    paragraphs.push(buffer.join(' '));
                    buffer = [];
                    bufferLength = 0;
                }
            }

            if (buffer.length > 0) paragraphs.push(buffer.join(' '));
            text = paragraphs.join('\n\n');
        }
    }

    return text;
};
