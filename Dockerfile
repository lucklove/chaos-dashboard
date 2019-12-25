 
FROM alpine

COPY server/server /server
COPY build /web

ENTRYPOINT [ "/server" ]