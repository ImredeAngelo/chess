# Buildtools
Contains the necessary webpack configurations for standard templates

## Supported Build Configs:
- React 18 (Static/Workbox)

## Proxy
When building multiple containers, testing without a proxy is not supported out-of-the-box because of CORS policies.
<code>npm run proxy --workspace=buildtools --ports X, X, X</code>

Possible TODO: use a single config file with multiple entries to serve everything from same origin