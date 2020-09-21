import glob
import os
result = []
PATH = "/Users/nafi/Develop/GitHub/tjcp/Lectures/Windows10"
for x in os.walk(PATH):
    for y in glob.glob(os.path.join(x[0], '*.pdf')):
        result.append(y)

#gs -o page-1-of-input-PDF.png -sDEVICE=pngalpha -dLastPage=1 input.pdf

for i in result:
    # if "/PPP/" in i:
    #     print(i)
    f = i.split(".pdf")[0]
    if " " in i or "PS_" in i:
        os.system("mv " + i.replace(" ", "\ ") + " " + i.replace(" ", "_").replace("PS_", ""))
        # f = f.replace(" ", "_")
    print(f)
    os.system("gs -o " + f + ".png" + " -sDEVICE=pngalpha -dLastPage=1 " + i)
    
