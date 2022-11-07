CONTAINER_NAME_PHP=php
CONTAINER_NAME_NODE=node
PHP_CMD=docker-compose exec $(CONTAINER_NAME_PHP)
NODE_CMD=docker-compose exec $(CONTAINER_NAME_NODE)

bash-php:
	docker-compose exec -it $(CONTAINER_NAME_PHP) bash

bash-node:
	docker-compose exec -it $(CONTAINER_NAME_NODE)  sh

start-dev:
	docker-compose up

test:
	$(PHP_CMD) rm var/app.db
	$(PHP_CMD) bin/console --env=test doctrine:database:create
	$(PHP_CMD) bin/console --env=test doctrine:database:drop  --force
	$(PHP_CMD) bin/console --env=test doctrine:schema:create
	#$(PHP_CMD) bin/console --env=test doctrine:migrations:migrate --no-interaction --allow-no-migration
	$(PHP_CMD) bin/console --env=test doctrine:fixtures:load --append
	$(PHP_CMD) bin/phpunit

database-dev:
	$(PHP_CMD) bin/console doctrine:database:drop --if-exists --force
	$(PHP_CMD) bin/console doctrine:database:create --if-not-exists
	$(PHP_CMD) bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
	$(PHP_CMD) bin/console doctrine:fixtures:load --append
