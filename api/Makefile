SHELL := bash

# =====================================
# for docker image
# =====================================

.PHONY: run-image
run-image:
	docker-compose up -d postgres core


.PHONY: deploy-fly
deploy-fly:
	flyctl deploy -c ./infrastructure/fly/fly.toml --dockerfile ./infrastructure/fly/Dockerfile