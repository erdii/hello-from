VERSION := $(shell jq -r '.version' package.json)
NAME := $(shell jq -r '.name' package.json)
REGISTRY := $(shell jq -r '.registry' deploy.json)
REPO := $(shell jq -r '.repo' deploy.json)
BUILD_PATH := .build

.PHONY: all
all: | docker push-docker

.PHONY: docker
docker:
	docker build . \
		-t $(NAME):latest \
		-t $(NAME):$(VERSION) \
		-t $(REGISTRY)/$(REPO):latest \
		-t $(REGISTRY)/$(REPO):$(VERSION)

.PHONY: push-docker
push-docker:
	docker push $(REGISTRY)/$(REPO):$(VERSION)
	docker push $(REGISTRY)/$(REPO):latest
