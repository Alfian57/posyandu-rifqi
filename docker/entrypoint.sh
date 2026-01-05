#!/bin/sh

# Check if VITE_API_URL is set
if [ -z "$VITE_API_URL" ]; then
    echo "Warning: VITE_API_URL is not set. Using original placeholder."
else
    echo "Replacing API URL placeholder with $VITE_API_URL"
    # Find all JS files in the assets directory
    find /usr/share/nginx/html/assets -type f -name "*.js" -exec sed -i "s|__VITE_API_URL_PLACEHOLDER__|$VITE_API_URL|g" {} +
fi

# Execute the CMD passed to docker run
exec "$@"
