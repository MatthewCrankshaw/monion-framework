#!/bin/bash

# Check if the ssl directory exists, if not, create it
if [ ! -d "./res/ssl" ]; then
  mkdir ./res/ssl
  echo "SSL directory created"
else 
  echo "SSL directory already exists"
fi

# Generate the key.pem file
if [ ! -f "./res/ssl/key.pem" ]; then
  openssl genrsa -out ./res/ssl/key.pem 2048
  echo "key.pem file created"
else
  echo "key.pem file already exists"
fi

# Generate the cert.pem file
if [ ! -f "./res/ssl/cert.pem" ]; then
  openssl req -new -x509 -key ./res/ssl/key.pem -out ./res/ssl/cert.pem -days 365 -subj "/C=NZ/ST=Auckland/L=Auckland/O=Matthew Crankshaw/CN=localhost"
  echo "cert.pem file created"
else
  echo "cert.pem file already exists"
fi

# Check if the ecdsa directory exists, if not, create it
if [ ! -d "./res/ecdsa" ]; then
  mkdir ./res/ecdsa
  echo "ECDSA directory created"
else 
  echo "ECDSA directory already exists"
fi

# Generate the ecdsa private key
if [ ! -f "./res/ecdsa/private.pem" ]; then
  openssl ecparam -genkey -name secp384r1 -noout -out ./res/ecdsa/private.pem
  echo "private.pem file created"
else
  echo "private.pem file already exists"
fi

# Generate the ecdsa public key
if [ ! -f "./res/ecdsa/public.pem" ]; then
  openssl ec -in ./res/ecdsa/private.pem -pubout -out ./res/ecdsa/public.pem
  echo "public.pem file created"
else
  echo "public.pem file already exists"
fi