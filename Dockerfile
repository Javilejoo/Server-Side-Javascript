#Get the lastest mysql image
FROM mysql:latest

#Set environment
ENV MYSQL_DATABASE=blog_db
ENV MYSQL_ROOT_PASSWORD=root_password
#User and password
ENV MYSQL_USER=blog_user
ENV MYSQL_PASSWORD=blog_password
#Copy database schema
COPY schema.sql ./docker-entrypoint-initdb.d/