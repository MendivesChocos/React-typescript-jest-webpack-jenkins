.DEFAULT_GOAL := help

APP_NAME       = spa-advertisement-project
OWNER          = aptitus
WORKDIR        = /app

ENVIRONMENT   ?= dev
GIT_BRANCH    ?= dev
AWS_REGION    ?= eu-west-1
INFRA_BUCKET  ?= infraestructura.$(ENVIRONMENT)
DEPLOY_BUCKET ?= $(ENVIRONMENT).cds.aptitus.g3c.pe
DOCKER_IMAGE   = 929226109038.dkr.ecr.$(AWS_REGION).amazonaws.com/orbis-$(ENVIRONMENT)-node:latest
HTML_URL       = $(DEPLOY_BUCKET)/src/module/Enterprise/view/enterprise/enterprise/index.phtml
SERVERS       ?= v1s30w28

sync-credentials:
	aws s3 sync s3://$(INFRA_BUCKET)/config/container/orbis/base/ssh/ config/ssh/

sync-config:
	aws s3 sync s3://$(INFRA_BUCKET)/config/frontend/$(OWNER)/$(GIT_BRANCH)/app-aptitus/$(APP_NAME) ./src/

install:
	docker run -i --rm -v $(PWD)/config/ssh:/root/.ssh/ -v $(PWD):/app -w $(WORKDIR) $(DOCKER_IMAGE) yarn install -p
	@sudo chown -R $(USER):$(USER) $(PWD)/node_modules/

build:
	docker run -i --rm -v $(PWD):/app -w $(WORKDIR) $(DOCKER_IMAGE) yarn build
	@sudo chown -R $(USER):$(USER) $(PWD)/dist/

test:
	docker run -t --rm -e JEST_JUNIT_OUTPUT=$(JEST_JUNIT_OUTPUT) -v $(PWD):/app/ -w $(WORKDIR) $(DOCKER_IMAGE) yarn test --ci --testResultsProcessor='jest-junit'

sync-cds:
	aws s3 rm s3://$(DEPLOY_BUCKET)/$(APP_NAME)/ --recursive
	aws s3 sync --acl public-read --cache-control max-age=3600,public ./dist s3://$(DEPLOY_BUCKET)/$(APP_NAME)/

copy-html:
	/usr/bin/scp $(WORKSPACE)/dist/index.html root@$(SERVERS):/app/$(OWNER)/$(HTML_URL)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
