#!/bin/bash

# Ask the user for input
echo "What's sassy?"
read component

# Check if the component exists
if [ ! -f "docs/extra_sass/${component}.scss" ]; then
    echo "Warning: Component ${component} is not found at docs/extra_sass/"
else
    # Use the user's input in the sass command
    sass docs/extra_sass/${component}.scss docs/style/bootstrap/${component}.css
    echo "Compiled SASS for component: ${component}.scss"
fi
