
MOCHA_OPTS= --check-leaks
REPORTER = dot
UI = exports

document:
	yuidoc

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER) \
		--ui $(UI) \
		$(MOCHA_OPTS)


.PHONY: test document
