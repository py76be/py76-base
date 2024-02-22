"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


PACKAGE_NAME = "py76_base"

_ = MessageFactory("py76_base")

logger = logging.getLogger("py76_base")
