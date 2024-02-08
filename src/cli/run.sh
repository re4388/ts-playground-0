#!/bin/bash

# Define an array
scripts=(
   "a1_xxxx"
   "show listening tcp"
   "check port"
)

# Loop through the array and print each item
for script in "${scripts[@]}"; do
  echo "$script"
done
