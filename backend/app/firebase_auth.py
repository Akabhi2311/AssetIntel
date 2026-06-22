import firebase_admin

from firebase_admin import (
    credentials,
    auth
)

cred = credentials.Certificate(
    "firebase-adminsdk.json"
)

firebase_admin.initialize_app(cred)


def verify_token(token):

    decoded_token = (
        auth.verify_id_token(token)
    )

    return decoded_token