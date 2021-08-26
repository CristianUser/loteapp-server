start:
	make start-services && make start-server

start-server:
	npm i && npm run start:dev

start-services:
	docker compose up -d mongo

stop-services:
	docker compose stop mongo

remove-containers:
	@echo "Removing all stopped containers..."
	docker compose rm mongo

burn:
	@echo "Stopping and removing all containers..."
	make stop-services && make remove-containers

clear-data:
	rm -rf ./mongo/data

default: start
