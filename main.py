import sys


def main(argv: list[bytearray]) -> int:
    file_path = argv[1]
    row = int(argv[2])
    col = int(argv[3])
    with open(file_path, "r") as f:
        rows = list(f.readlines())
        rows.append("")
        print(rows[row][:col]+'^'+rows[row][col:])
    return 0

if __name__ == "__main__":
    main(sys.argv)
