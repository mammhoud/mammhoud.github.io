# Makefile for Jekyll GitHub Pages Workflow

# Variables
JEKYLL_ENV=production
JEKYLL_BASEURL=""
BUILD_DIR=_site
BUNDLE := bundle config set --local path "vendor/bundle" && bundle install

# Commands
.PHONY: install serve guard build check clean update all

install:
	$(BUNDLE)

help:
	@echo "Available commands:"
	@echo "  make build    - Build the Jekyll site for production"
	@echo "  make serve    - Serve the site locally with live reload"
	@echo "  make clean    - Clean the generated site files"
	@echo "  make deploy   - Push changes to GitHub and trigger deployment"

build:
	@echo "Building the site for production..."
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build --baseurl "$(JEKYLL_BASEURL)"

serve:
	@echo "Serving the site locally on http://localhost:4000 ..."
	bundle exec jekyll serve --livereload

check:
	bundle exec htmlproofer ./_site --disable-external

guard:
	bundle exec guard

clean:
	@echo "Cleaning the build directory..."
	rm -rf $(BUILD_DIR)

deploy:
	@echo "Pushing changes to GitHub Pages branch..."
	git add .
	git commit -m "Deploying updated site"
	git push origin github-page
	@echo "Deployment triggered. Check GitHub Actions for status."
	
update:
	bundle update

all: install build serve

