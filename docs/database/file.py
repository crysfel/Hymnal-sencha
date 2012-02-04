import fileinput
import re

num = re.compile('^(<p>)? [0-9]{2,3}');
digit = re.compile('[0-9]+');
content = None
title=None
querys = []

for line in fileinput.input(['himnario.html']) :
	m = num.match(line)
	if m:
		if content is not None:
			id = digit.findall(title)
			if id :	
				querys.append("INSERT INTO himnos (himno_k,name,content,music) VALUES ("+id[0]+", '"+title.replace('<p>','')+"', '"+''.join(content).replace('<p>','').replace('</p>','')+"', '');")
			#print '=========================='
		title = line
		content = []
	else:	
		if content is not None:
			content.append(line)


FILE = open('himnario.sql','w')
FILE.writelines(''.join(querys))
FILE.close()

print 'Done!'
