#!/bin/bash

libwebp="https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.5.0-linux-x86-64.tar.gz"

# Download
if [ ! -f libwebp-1.5.0-linux-x86-64.tar.gz ]; then
	curl -L $libwebp -o libwebp-1.5.0-linux-x86-64.tar.gz
fi

# Extract
if [ ! -d libwebp-1.5.0-linux-x86-64 ]; then
	tar -xvf libwebp-1.5.0-linux-x86-64.tar.gz
fi

mkdir -p bin
cp libwebp-1.5.0-linux-x86-64/bin/cwebp ./bin