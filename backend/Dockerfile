# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.0.9
FROM plone/server-builder:${PLONE_VERSION} as builder

WORKDIR /app

# Add local code
COPY . .

# Install local requirements and pre-compile mo files
RUN <<EOT
    set -e
    bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    sed -i 's/-e src\/py76_base\[test\]/src\/py76_base/g' mx.ini
    bin/mxdev -c mx.ini
    bin/pip install -r requirements-mxdev.txt
    bin/python /compile_mo.py
    rm -Rf src/
EOT

FROM plone/server-prod-config:${PLONE_VERSION}

LABEL maintainer="Maurits van Rees <maurits@py76.be>" \
      org.label-schema.name="py76-base-backend" \
      org.label-schema.description="Py76 Base backend image." \
      org.label-schema.vendor="Maurits van Rees"

# Copy /app from builder
COPY --from=builder /app /app

RUN <<EOT
    set -e
    ln -s /data /app/var
EOT
