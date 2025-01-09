@echo off
echo Starting Docker container...
docker build -t iot/btapp:1.0 .  
docker save -o app.tar iot/btapp:1.0  
echo create  Docker image successfully!
pause