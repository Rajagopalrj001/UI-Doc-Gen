
import tokenize
import sys

comments = []
with open(sys.argv[1], "rb") as f:
    tokens = tokenize.tokenize(f.readline)
    for toknum, tokval, *_ in tokens:
        if toknum == tokenize.COMMENT:
            comments.append(tokval.strip("# ").strip())

for c in comments:
    print(c)
