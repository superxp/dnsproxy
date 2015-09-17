require 'socket'
u1 = UDPSocket.new
u1.bind("127.0.0.1", 53)
while true do
   mesg, addr = u1.recvfrom(1024)
   puts mesg
end 