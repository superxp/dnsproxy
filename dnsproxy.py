#!/usr/bin/env python
# -*- coding:UTF-8 -*-

from socket import *
from time import ctime

HOST = '127.0.0.1'
PORT = 53
BUFSIZE = 1024

ADDR = (HOST,PORT)

udpSerSock = socket(AF_INET, SOCK_DGRAM)
udpSerSock.bind(ADDR)

while True:
	print 'wating for message...'
	data, addr = udpSerSock.recvfrom(BUFSIZE)
	tdata = data[12:]
	i = 1  
	name = ''
	
    while True:
	
       d = ord(tdata[i])  
       if d == 0:  
          break;  
       if d < 32:  
          name = name + '.'  
       else:  
          name =  name + chr(d)  
       i = i + 1  
	
	print name
	
	udpSerSock.sendto('[%s] %s'%(ctime(),data),addr)
	print '...received from and retuned to:',addr

udpSerSock.close()
