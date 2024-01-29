#!/bin/sh

# Navigate to the secrets directory
cd /run/secrets

# For each file in the directory
for file in *; do
  # Read the file content
  content=$(cat "$file")

  # Append the file content to the .env file, followed by a newline character
  echo "$content" >> ../.env
done