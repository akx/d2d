// For all practical purposes, this code was written by Claude, so there's that.

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

type PythonLiteral = string | number | boolean | null | PythonList | PythonDict | PythonTuple | PythonSet;

type PythonList = PythonLiteral[];
type PythonDict = { [key: string]: PythonLiteral };
type PythonTuple = PythonLiteral[];
type PythonSet = Set<PythonLiteral>;

class PythonReprParser {
  private readonly input: string;
  private pos: number;
  private readonly allowTrailingData: boolean;

  constructor(input: string, allowTrailingData: boolean = true) {
    this.input = input.trim();
    this.pos = 0;
    this.allowTrailingData = allowTrailingData;
  }

  parse(): PythonLiteral {
    this.skipWhitespace();
    const result = this.parseValue();

    if (!this.allowTrailingData) {
      this.skipWhitespace();
      if (this.pos !== this.input.length) {
        throw new ParseError("Unexpected tokens at end of input");
      }
    }

    return result;
  }

  private parseValue(): PythonLiteral {
    this.skipWhitespace();

    const char = this.input[this.pos];

    if (char === '"' || char === "'") return this.parseString();
    if (char === "-" || this.isDigit(char)) return this.parseNumber();
    if (char === "N" && this.input.slice(this.pos, this.pos + 4) === "None") return this.parseNone();
    if (char === "T" && this.input.slice(this.pos, this.pos + 4) === "True") return this.parseBoolean(true);
    if (char === "F" && this.input.slice(this.pos, this.pos + 5) === "False") return this.parseBoolean(false);
    if (char === "[") return this.parseList();
    if (char === "{") return this.parseDictOrSet();
    if (char === "(") return this.parseTuple();

    throw new ParseError(`Unexpected token: ${char}`);
  }

  private parseString(): string {
    const quote = this.input[this.pos];
    this.pos++;

    let result = "";
    let escaped = false;

    while (this.pos < this.input.length) {
      const char = this.input[this.pos];

      if (escaped) {
        switch (char) {
          case "n":
            result += "\n";
            break;
          case "r":
            result += "\r";
            break;
          case "t":
            result += "\t";
            break;
          case "\\":
            result += "\\";
            break;
          case '"':
            result += '"';
            break;
          case "'":
            result += "'";
            break;
          case "u": {
            const hex = this.input.slice(this.pos + 1, this.pos + 5);
            const code = parseInt(hex, 16);
            if (isNaN(code)) {
              throw new ParseError(`Invalid unicode escape: \\u${hex}`);
            }
            result += String.fromCharCode(code);
            this.pos += 4;
            break;
          }
          default:
            result += "\\" + char;
        }
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        this.pos++;
        return result;
      } else {
        result += char;
      }

      this.pos++;
    }

    throw new ParseError("Unterminated string");
  }

  private parseNumber(): number {
    const start = this.pos;

    // Handle sign
    if (this.input[this.pos] === "-") {
      this.pos++;
    }

    // Integer part
    while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
      this.pos++;
    }

    // Fractional part
    if (this.input[this.pos] === ".") {
      this.pos++;
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        this.pos++;
      }
    }

    // Scientific notation
    if (this.input[this.pos] === "e" || this.input[this.pos] === "E") {
      this.pos++;
      if (this.input[this.pos] === "+" || this.input[this.pos] === "-") {
        this.pos++;
      }
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        this.pos++;
      }
    }

    const numberStr = this.input.slice(start, this.pos);
    const number = Number(numberStr);

    if (isNaN(number)) {
      throw new ParseError(`Invalid number: ${numberStr}`);
    }

    return number;
  }

  private parseNone(): null {
    this.pos += 4;
    return null;
  }

  private parseBoolean(value: boolean): boolean {
    this.pos += value ? 4 : 5;
    return value;
  }

  private parseList(): PythonList {
    this.pos++; // Skip '['
    const list: PythonLiteral[] = [];

    while (this.pos < this.input.length && this.input[this.pos] !== "]") {
      this.skipWhitespace();

      if (list.length > 0) {
        this.expectChar(",");
        this.skipWhitespace();

        // Handle trailing comma
        if (this.input[this.pos] === "]") break;
      }

      list.push(this.parseValue());
    }

    this.expectChar("]");
    return list;
  }

  private parseDictOrSet(): PythonLiteral {
    this.pos++; // Skip '{'
    this.skipWhitespace();

    // Empty dict/set
    if (this.input[this.pos] === "}") {
      this.pos++;
      return {};
    }

    const first = this.parseValue();
    this.skipWhitespace();

    // Check if it's a set or dict
    if (this.input[this.pos] === ":") {
      // It's a dictionary
      return this.parseDictContinue(first);
    } else {
      // It's a set
      return this.parseSetContinue(first);
    }
  }

  private parseDictContinue(firstKey: PythonLiteral): PythonDict {
    const dict: PythonDict = {};

    // Parse first key-value pair
    this.expectChar(":");
    dict[String(firstKey)] = this.parseValue();

    while (this.pos < this.input.length && this.input[this.pos] !== "}") {
      this.skipWhitespace();
      this.expectChar(",");
      this.skipWhitespace();

      // Handle trailing comma
      if (this.input[this.pos] === "}") break;

      const key = this.parseValue();
      this.expectChar(":");
      dict[String(key)] = this.parseValue();
    }

    this.expectChar("}");
    return dict;
  }

  private parseSetContinue(firstElement: PythonLiteral): PythonSet {
    const set = new Set<PythonLiteral>();
    set.add(firstElement);

    while (this.pos < this.input.length && this.input[this.pos] !== "}") {
      this.skipWhitespace();
      this.expectChar(",");
      this.skipWhitespace();

      // Handle trailing comma
      if (this.input[this.pos] === "}") break;

      set.add(this.parseValue());
    }

    this.expectChar("}");
    return set;
  }

  private parseTuple(): PythonTuple {
    this.pos++; // Skip '('
    const tuple: PythonLiteral[] = [];

    while (this.pos < this.input.length && this.input[this.pos] !== ")") {
      this.skipWhitespace();

      if (tuple.length > 0) {
        this.expectChar(",");
        this.skipWhitespace();

        // Handle trailing comma
        if (this.input[this.pos] === ")") break;
      }

      tuple.push(this.parseValue());
    }

    this.expectChar(")");
    return tuple;
  }

  private skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  private isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private expectChar(expected: string) {
    if (this.input[this.pos] !== expected) {
      throw new ParseError(`Expected '${expected}', found '${this.input[this.pos]}'`);
    }
    this.pos++;
  }
}

export function pythonReprParse(input: string): PythonLiteral {
  const parser = new PythonReprParser(input);
  return parser.parse();
}
