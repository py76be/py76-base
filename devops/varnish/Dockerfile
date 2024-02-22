# syntax=docker/dockerfile:1
FROM varnish:7.4

LABEL maintainer="Maurits van Rees <maurits@py76.be>" \
      org.label-schema.name="py76-base-varnish" \
      org.label-schema.description="Py76 Base Varnish image." \
      org.label-schema.vendor="Maurits van Rees"

COPY etc/varnish.vcl /etc/varnish/default.vcl
