SHELL := bash

# =====================================
# for docker image
# =====================================

.PHONY: run-image
run-image:
	docker-compose up -d postgres core

# =====================================
# deploy to fly
# =====================================

.PHONY: deploy-fly
deploy-fly:
	flyctl deploy -c ./infrastructure/fly/fly.toml --dockerfile ./infrastructure/fly/Dockerfile