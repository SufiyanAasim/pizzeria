.PHONY: install dev build start lint test seed clean docker-build docker-up docker-down

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

test:
	npm run test

seed:
	npm run db:seed

clean:
	rm -rf .next out node_modules

docker-build:
	docker build -t pizzeria -f docker/Dockerfile .

docker-up:
	docker compose -f docker/docker-compose.yml up --build

docker-down:
	docker compose -f docker/docker-compose.yml down
