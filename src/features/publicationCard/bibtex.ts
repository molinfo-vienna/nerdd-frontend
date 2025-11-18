export default function bibtex(hljs) {
    const COMMENT_LINE = {
        className: "comment",
        begin: /%/,
        end: /$/,
    }

    const COMMENT_ENTRY = {
        className: "comment",
        begin: /@comment\b/i,
        end: /$/,
        relevance: 10,
    }

    const BRACED_STRING = {
        className: "string",
        begin: /\{/,
        end: /\}/,
        excludeBegin: true,
        excludeEnd: true,
        contains: ["self"],
    }

    const QUOTED_STRING = {
        className: "string",
        begin: /"/,
        end: /"/,
        relevance: 0,
    }

    const NUMBER = {
        className: "number",
        // bare numbers (years, etc.) and numeric macros
        begin: /\b\d+([eE][+-]?\d+)?\b/,
        relevance: 0,
    }

    const MACRO = {
        // bare identifiers used as string macros, e.g. `jan # " 1, " # 1990`
        className: "variable",
        begin: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
        relevance: 0,
    }

    const CONCAT = {
        className: "operator",
        begin: /#/,
        relevance: 0,
    }

    const FIELD_NAME = {
        // known field names before an equals sign
        className: "attr",
        begin: /\b[a-zA-Z_][a-zA-Z0-9_]*\b(?=\s*=)/,
    }

    const GENERIC_FIELD_NAME = {
        // any identifier before an equals sign
        className: "attr",
        begin: /\b[a-zA-Z_][a-zA-Z0-9_]*\b(?=\s*=)/,
        relevance: 0,
    }

    const ENTRY_TYPE = {
        className: "function",
        begin: /@[a-zA-Z_]+(?=\s*[{(])/,
    }

    const ENTRY_KEY = {
        // citation key: @article{<this_part>,
        className: "title",
        begin: /[^{\s,]+(?=\s*,)/,
        relevance: 0,
    }

    const BRACED_BLOCK = {
        // match the body of an entry: { key, field = value, ... }
        begin: /[{(]/,
        end: /[})]/,
        contains: [
            ENTRY_KEY,
            COMMENT_LINE,
            FIELD_NAME,
            GENERIC_FIELD_NAME,
            BRACED_STRING,
            QUOTED_STRING,
            NUMBER,
            MACRO,
            CONCAT,
        ],
        relevance: 0,
    }

    return {
        name: "BibTeX",
        aliases: ["bib"],
        case_insensitive: true,
        contains: [COMMENT_LINE, COMMENT_ENTRY, ENTRY_TYPE, BRACED_BLOCK],
    }
}
