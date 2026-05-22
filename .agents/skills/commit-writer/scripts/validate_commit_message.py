#!/usr/bin/env python3

import re
import sys


PATTERN = re.compile(r'^(feat|fix|refactor|docs|test|chore|perf|build|ci)(\([a-z0-9-]+\))?(!)?: [a-z].+$')


def validate(message: str) -> list[str]:
	errors: list[str] = []

	if not message:
		errors.append('Message is empty')
		return errors

	if '\n' in message:
		errors.append('Only the first line is supported by this validator')

	if len(message) > 72:
		errors.append(f'Message is longer than 72 chars ({len(message)})')

	if message.endswith('.'):
		errors.append('Message must not end with a period')

	if not PATTERN.match(message):
		errors.append('Message must match Conventional Commit format: type(scope): subject')

	return errors


def main() -> int:
	if len(sys.argv) != 2:
		print('Usage: validate_commit_message.py "type(scope): subject"')
		return 2

	message = sys.argv[1].strip()
	errors = validate(message)

	if errors:
		print('INVALID')
		for error in errors:
			print(f'- {error}')
		return 1

	print('VALID')
	return 0


if __name__ == '__main__':
	raise SystemExit(main())
