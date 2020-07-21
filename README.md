# freemarket
Frontend and backend of freemarket webapplication

Application can be seen running [here](http://fullstackdemo.ddns.net/)


# Usage
To run the application you have to serve frontend "Public" folder, run backend, run media-server and run reverse-proxy.

The reverse-proxy runs in port 4000, media-server in port 8002, backend in 8000 and frontend is served from 8001


# frontend
To serve the frontend cd to "/frontend" and run npm install && npm run build, after which you can run npm run serve to start serving the frontend

# backend
To run the backend navigate to "/backend", where you can install all the dependencies and dev-dependencies from the Pipfile.
To make the app work in production mode you have to set a "SECRET_KEY" environment variable, it is advised to set this key through a ".env" file, which you should place in "/backend"
To run the app in development mode navigate to "/backend/backend" and run "python manage.py runserver" and to run the app in production mode "PRODUCTION=TRUE python manage.py runserver"

# media-server
Navigate to "/media-server" and run "npm install" to install all the dependencies", after which you can run "npm run start" to run the media-server

# reverse-proxy
Run "npm install" in "/reverse-proxy" to install all the dependencies, after which you can run "npm run start" to run the reverse-proxy
