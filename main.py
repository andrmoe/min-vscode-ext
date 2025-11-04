import sys
import asttokens
from asttokens.util import Token
import json

def get_cursor_token(source: str, row: int, col: int) -> Token:
    atok = asttokens.ASTTokens(source, parse=True)
    node = atok.get_token(row+1, col)
    return node

def main(argv: list[str]) -> int:
    data = argv[1].replace('\\', '')
    print(data)
    edit_info = json.loads(data)
    file_path = edit_info["file"]
    cursor_row = edit_info["cursor"]["row"]
    cursor_col = edit_info["cursor"]["col"]
    with open(file_path, "r") as f:
        node = get_cursor_token(f.read(), cursor_row, cursor_col)
        print(node)
        line = node.line
        print(line[:cursor_col]+'^'+line[cursor_col:])
    with open(file_path, "r") as f:
        rows = list(f.readlines())
        startrow = edit_info["selection"]["startrow"]
        startcol = edit_info["selection"]["startcol"]
        endrow = edit_info["selection"]["endrow"]
        endcol = edit_info["selection"]["endcol"]
        selection = rows[startrow][startcol:]
        for row in range(startrow+1, endrow):
            selection+=rows[row]
        selection+=rows[endrow][:endcol]
        print(selection)
    return 0

if __name__ == "__main__":
    main(sys.argv)
