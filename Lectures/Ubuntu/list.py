import glob
import os
result = []
PATH = "/Users/nafi/Develop/GitHub/tjcp/Lectures/Ubuntu"

for x in os.walk(PATH):
    files = glob.glob(os.path.join(x[0], '*.pdf'))
    files.sort(key=os.path.getmtime, reverse=True)
    for y in files:
        result.append(y.split("/")[-2] + "/" + y.split("/")[-1])

fout = open("dir.txt", "w")

for i in result:
    fout.write(i + "\n")