SHELL := /bin/bash
.PHONY: serve
serve:
	mkdocs serve
.PHONY: build
build:
	mkdocs build
.PHONY: deploy
deploy:
	git fetch
	mkdocs gh-deploy --config-file mkdocs.yml --remote-branch gh-pages
.PHONY: update-build-version
update-build-version:
	git submodule update --remote --merge
	git add .
	read -p "Enter commit message: " message; \
	git commit -m "$$message"
.PHONY: publish
publish: deploy update-build-version
	git pull
	git push
